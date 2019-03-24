"use strict";

/**
 * Delete events from the database.
 * Also deletes events and user associations.
 * @param {postgres.Pool} pool 
 * @param {string[]} eventids
 */
export const deleteEvents = async (pool, eventids) => {
    for (let i = 0; i < eventids.length; i++) {
        let query = {
            text: 'DELETE FROM events WHERE eventid = $1',
            values: [eventids[i]]
        };
        await pool.query(query);

        query = {
            text: 'DELETE FROM usersevents WHERE eventid = $1',
            values: [eventids[i]]
        }
        await pool.query();
    }
};