//= require jquery.min
//= require jquery.form.js

var readerFeedback;

var string = '';

var reading = false;
var count = 0;

$(document).ready(function() {

	bindReaderFeedback();
	bindSwipeListener();
	bindAddButtonListener();
	bindLookupButtonListener();
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
				stopTyping();
				submitID();
			}
		}
	});
};

var startTyping = function() {
	readerFeedback.setClass('typing');
	reading = true;
	string = '';
};

var stopTyping = function() {
	reading = false;
	readerFeedback.setClass('typing');
};

var submitID = defaultSubmitID;

var defaultSubmitID = function() {
	$.ajax({
		url: url,
		data: {swipe: string, actionType: activeButton.id()},
		cache: false,
		contentType: 'application/json',
		beforeSend: function() {
			readerFeedback.setClass('awaitingResponse');
		},
		success: function(data) {
			readerFeedback.setClass('ok');
		},
		error: function(xhr) {
			if (xhr.status == 400) {
				readerFeedback.setClass('badRead');
			}
			if (xhr.status == 403) {
				readerFeedback.setClass('badCard');
			}
		}
	});
};

var addSubmitID = function() {
	$('#peoplesoftId').val(string.substring(1, string.indexOf('?;')));
	$('#addForm').submit();
};

var lookupSubmitID = function() {
	$('#peoplesoftId').val(string.substring(1, string.indexOf('?;')));
	$('#lookupForm').submit();
};

var bindAddButtonListener = function() {
	$('#addButton').on('click', function() {
		$('#formContent').load(addFormUrl, function() {
			$('#addForm').ajaxForm({
				url: addSubmitUrl,
				type: 'post',
				success: function(data) {
					console.log(data);
				}});
		});
		submitID = addSubmitID;
	});
};

var bindLookupButtonListener = function() {
	$('#lookupButton').on('click', function() {
		$('#formContent').load(lookupFormUrl, function() {
			$('#lookupForm').ajaxForm({
				url: lookupSubmitUrl,
				type: 'post',
				success: function(data) {
					console.log(data);
					$('#editForm #peoplesoftId').val($('#lookupForm #peoplesoftId').val());
					$('#emailAddress').val(data.emailAddress);
					$('#name').val(data.name);
					$('#paid').prop('checked', data.paid);
					$('#isAdmin').prop('checked', data.isAdmin);
				}
			});

			$('#editForm').ajaxForm({
				url: editSubmitUrl,
				type: 'post'
			});
		});
		submitID = lookupSubmitID;
	});
};