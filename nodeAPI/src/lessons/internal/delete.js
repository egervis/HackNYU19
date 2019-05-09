"use strict";

/**
 * Delete lessons from the database.
 * Also deletes pictures and associations between the two.
 * @param {postgres.Pool} pool 
 * @param {string[]} lessonids
 */
export const deleteLessons = async (pool, lessonids) => {
    for (let i = 0; i < lessonids.length; i++) {
        let query = {
            text: 'DELETE FROM lessons WHERE lessonid = $1',
            values: [lessonids[i]]
        };
        await pool.query(query);

        query = {
            text: 'SELECT pictureid FROM lessonpictures WHERE lessonid = $1',
            values: [lessonids[i]]
        }
        const response = await pool.query();

        // Delete pictures associated with the lesson
        const pictureids = response.rows.map(entry => entry.pictureid);
        for (let j = 0; j < pictureids.length; j++) {
            query = {
                text: 'DELETE FROM pictures WHERE pictureid = $1',
                values: [pictureids[i]]
            }
            await pool.query(query);
        }

        // Delete picture ids and lesson ids in picturelessons table
        query = {
            text: 'DELETE FROM lessonpictures WHERE lessonid = $1',
            values: [lessonids[i]]
        }
        await pool.query(query);
    }
};