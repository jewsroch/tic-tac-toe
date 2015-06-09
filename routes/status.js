/*jslint node: true */
'use strict';

var express = require('express');
var router = express.Router();
var game = require('../models/game');

router.post('/', function(req, res, next) {
	var board = req.body.board;
	var status = false;

	status = status || game.checkStatus(board);

	if (status === false) {
		res.send('no-win');
	} else {
		res.send(status);
	}
});

module.exports = router;
