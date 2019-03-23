"use strict";

/**
 * Gets a list of class ids given a user.
 * @param {postgres.Pool} pool 
 * @param {string} userID
 * @returns {Promise<string[]>} array of class ids
 */
export const getUserClasses = async (pool, userID) => {
    const query = {
        text: 'SELECT * FROM usersclasses WHERE userid = $1',
        values: [userID]
    };
    const result = await pool.query(query);
    return result.rows.map(entry => entry.classid);
};

/**
 * Gets a list of event ids given a user.
 * @param {postgres.Pool} pool 
 * @param {string} userID 
 * @returns {Promise<string[]>} array of event ids
 */
export const getUserEvents = async (pool, userID) => {
    const query = {
        text: 'SELECT * FROM usersevents WHERE userid = $1',
        values: [userID]
    };
    const result = await pool.query(query);
    return result.rows.map(entry => entry.eventid);
};