"use strict";

/**
 * Gets a list of picture ids given a user.
 * @param {postgres.Pool} pool 
 * @param {string} lessonid
 * @returns {Promise<string[]>} array of class ids
 */
export const getLessonPictures = async (pool, lessonid) => {
    const query = {
        text: 'SELECT * FROM lessonpictures WHERE lessonid = $1',
        values: [lessonid]
    };
    const result = await pool.query(query);
    return result.rows.map(entry => entry.lessonid);
};