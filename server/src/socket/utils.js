'use strict';

/* -------- Dependency ---------- */
const R = require('ramda');


/**
 * Hides the cards and hand of opponents in the `table`.
 *
 * Utility function for the `updateHiddenTable` socket event.
 *
 * @param {*} table    Table object.
 * @param {*} playerID Socket ID of the current player.
 *
 * @returns
 */
const hideTable = (table, playerID) => {
  // Deep copy of the table
  const tableCopy = R.clone(table);

  // Hide every opponents cards and hand
  tableCopy.players.forEach(player => {
    if (player.ID !== playerID) {
      player.holeCards = ['back', 'back'];
      player.hand = '';
    }
  });

  return tableCopy;
};


/**
 * Emit an `update_table` event and sends a table with hidden opponnent cards.
 *
 * @param {*} table Table object.
 * @param {*} io    Socket.Io instance.
 */
const updateHiddenTable = (table, io) => {
  table.players.forEach(player => {
    io.to(`${player.ID}`).emit('update_table', hideTable(table, player.ID));
  });
};


module.exports = updateHiddenTable;