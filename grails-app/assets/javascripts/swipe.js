//= require jquery.min

var readerFeedback;

var string = '';

var reading = false;
var count = 0;

$(document).ready(function() {

	bindReaderFeedback();

	bindSwipeListener();
});

var bindReaderFeedback = function() {
	readerFeedback = $('#feedback');
	readerFeedback.extend({
		currentClass: undefined,
		setClass: function(className) {
			readerFeedback.addClass(className);
			if (readerFeedback.currentClass !== undefined) {
				readerFeedback.removeClass(readerFeedback.currentClass);
			}
			readerFeedback.currentClass = className;
		}
	});
};

var bindSwipeListener = function() {
	$('body').on('keypress', function(e) {
		var it = String.fromCharCode(e.charCode);
		if (it == '%') {
			startTyping();
			count++;
		}
		if (reading) {
			string += it;
			if ((count += (it == '?' ? 1 : 0)) % 3 == 0) {
				submitID();
				stopTyping();
				string = '';
			}
		}
	});
};

var startTyping = function() {
	readerFeedback.setClass('typing');
	reading = true;
};

var stopTyping = function() {
	reading = false;
	readerFeedback.setClass('typing');
};

var submitID = function() {
	$.ajax({
		url: url,
		data: {swipe: string},
		cache: false,
		contentType: 'application/json',
		beforeSend: function() {
			readerFeedback.setClass('awaitingResponse');
		},
		success: function(data) {
			readerFeedback.setClass('ok');
		},
		error: function(xhr) {
			readerFeedback.setClass('badRead');
		}
	});
};