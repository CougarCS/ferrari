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
			if (readerFeedback.currentClass !== undefined) {
				readerFeedback.removeClass(readerFeedback.currentClass);
			}
			readerFeedback.addClass(className);
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
	console.log('typing');
};

var stopTyping = function() {
	reading = false;
	readerFeedback.removeClass('typing');
};

var defaultSubmitID = function() {
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
	var psid = string.substring(1, string.indexOf('?;'));
	if (/\d+/.test(psid)) {
		$('#peoplesoftId').val(psid);
		$('#addForm').submit();
	}
	else {
		readerFeedback.setClass('badRead');
	}
};

var lookupSubmitID = function() {
	var psid = string.substring(1, string.indexOf('?;'));
	if (/\d+/.test(psid)) {
		$('#peoplesoftId').val(psid);
		$('#lookupForm').submit();
	}
	else {
		readerFeedback.setClass('badRead');
	}
};

var bindAddButtonListener = function() {
	$('#addButton').on('click', function() {
		$('#formContent').load(addFormUrl, function() {
			$('#addForm').ajaxForm({
				url: addSubmitUrl,
				type: 'post',
				success: function(data) {
					$('#addForm').find(':input').each(function() {
						if (this.type == 'checkbox') {
							this.checked = false;
						}
						else {
							$(this).val('');
						}
					});
					if (data.success) {
						readerFeedback.setClass('ok');
						setTimeout(function() {
							readerFeedback.removeClass('ok');
						}, 3000);
					}
					else {
						readerFeedback.setClass('badCard');
						setTimeout(function() {
							readerFeedback.removeClass('badCard');
						}, 3000);
					}
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
					$('#editForm #peoplesoftId').val($('#lookupForm #peoplesoftId').val());
					$('#emailAddress').val(data.emailAddress);
					$('#name').val(data.name);
					$('#paid').prop('checked', data.paid);
					$('#isAdmin').prop('checked', data.isAdmin);
					$('#classification').val(data.classification);
					$('#shirtSize').val(data.shirtSize);
					$('#pizzaType').val(data.pizzaType);

					readerFeedback.setClass('ok');
				},
				error: function(xhr) {
					if (xhr.status == 403) {
						readerFeedback.setClass('badCard');
					}
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

var submitID = defaultSubmitID;