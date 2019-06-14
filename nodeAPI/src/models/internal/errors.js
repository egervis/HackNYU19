'use strict';

/**
 * Used to construct errors to be thrown internally.
 */
export class Error {
  /**
   * Creates a new throwable error.
   * @param {number} status the status code to send back.
   * @param {string} stack the message to send back.
   */
  constructor(status, stack) {
    this.status = status;
    this.stack = stack;
  }
}
