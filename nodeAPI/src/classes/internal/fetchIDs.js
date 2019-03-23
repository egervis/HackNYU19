"use strict";

/**
 * Gets a list of lesson ids given a class id.
 * @param {postgres.Pool} pool 
 * @param {string} userID
 * @returns {Promise<string[]>} array of class ids
 */
export const getClassLessons = async (pool, classID) => {
    const query = {
        text: 'SELECT * FROM classlessons WHERE classid = $1',
        values: [classID]
    };
    const result = await pool.query(query);
    return result.rows.map(entry => entry.lessonid);
};

/**
 * Gets a list of student ids given a class id.
 * @param {postgres.Pool} pool 
 * @param {string} userID
 * @returns {Promise<string[]>} array of class ids
 */
export const getClassStudents = async (pool, classID) => {
    const query = {
        text: 'SELECT * FROM classstudents WHERE classid = $1',
        values: [classID]
    };
    const result = await pool.query(query);
    return result.rows.map(entry => entry.studentid);
};