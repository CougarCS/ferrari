// This is a manifest file that'll be compiled into application.js.
//
// Any JavaScript file within this directory can be referenced here using a relative path.
//
// You're free to add application-wide JavaScript to this file, but it's generally better 
// to create separate JavaScript files as needed.
//
//= require jquery.min
//= require bootstrap
//= require_tree views
//= require_self

if (typeof jQuery !== 'undefined') {
	(function($) {
		$('#spinner').ajaxStart(function() {
			$(this).fadeIn();
		}).ajaxStop(function() {
			$(this).fadeOut();
		});
	})(jQuery);
}

var activeButton = undefined;

$(document).ready(function() {
	$('.button').each(function() {
		var button = $(this);
		button.extend({
			id: function() {
				return button.text();
			},
			activate: function() {
				if (activeButton != button) {
					button.addClass('selected');
					if (activeButton !== undefined) {
						activeButton.deactivate();
					}
					activeButton = button;
				}
			},
			deactivate: function() {
				button.removeClass('selected');
			}
		});
		button.on('click', function() {
			button.activate();
		});
	});
});