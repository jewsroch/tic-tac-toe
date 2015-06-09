/*jslint node: true */
'use strict';

var _ = require('underscore');

var wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkStatus(board) {
	var win = _.filter(wins, function(cells) {
		return cells.every(function(cell, index, cells) {
			return board[cell] === board[cells[0]] && board[cell] !== null;
		});
	});

	if (win.length > 0) {
		return _.flatten(win);
	} else {
		return false;
	}
}

module.exports = {checkStatus: checkStatus};
