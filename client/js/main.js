/*jslint node: true */
'use strict';

var $ = require('jQuery');
var _ = require('underscore');

var board = new Array(9);
var currentMark = 'x';
var welcome = 'Choose any square to begin';
var count = 0;

var changeMark = function() {
  currentMark = (currentMark == 'x' ? 'o' : 'x');
  $('.board').toggleClass('o');
};

var handleSuccess = function(res) {
  if (res !== 'no-win') {
    res.forEach(function(cell, index, array){
      $('#' + cell).addClass('win');
    });

    $('.board').addClass('win');

    var mark = $('#' + res[0]).attr('data-mark');
    updateMessage('Woot! ' + mark.toUpperCase() + ' Wins!');

    showReset();
  }
};

var showReset = function() {
  $('.reset').delay(1500).addClass('visible');
};

var hideReset = function() {
  $('.reset').removeClass('visible');
};

var handleError = function(res) {
  updateMessage('Oops, there was an error. Please try again.');
};

var updateMessage = function(message) {
  $('.message').html(message);
};

$(document).ready(function() {

  updateMessage(welcome);

  $('.cell').click(function(e) {
    e.preventDefault();

    var target, cell;
    target = $(e.currentTarget);
    cell = target.attr('id');

    board[cell] = currentMark;
    updateMessage('');
    count++;
    target.attr('data-mark', currentMark);

    if (_.compact(board).length > 4) {
      var data = JSON.stringify({board: board});

      $.ajax({
        url: '/status',
        method: 'POST',
        contentType: 'application/json',
        data: data,
        success: handleSuccess,
        error: handleError
      });
    }

    if (count >= 9) {
      updateMessage('Tie. Borrrring. Try again.');
      showReset();
    }

    changeMark();
  });

  $('.reset').click(function(e){
    e.preventDefault();

    $('.cell').removeAttr('data-mark').removeClass('win');
    $('.board').removeClass('o win');

    board = new Array(9);
    currentMark = 'x';
    count = 0;
    hideReset();
    updateMessage(welcome);
  });

});
