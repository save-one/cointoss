// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require bootstrap-sprockets
//= require jquery
//= require turbolinks
//= require_tree .

$(document).ready(function() {
	// add element_form
	$(document).on('click', '.add', function() {
		var clicked = $(this);
		$.ajax({
			url: "/elements/add",
			type: "GET",
			data: {target_id: $(this).next('span').text()}
			// success: function(data) {
			// 	alert("success");
			// },
			// error: function(data) {
			// 	alert("sorry... this is an error...");
			// }
		}).done(function(data) {
			var clicked_pp = clicked.parent().parent();
			clicked_pp.clone(true).insertAfter(clicked.parent().parent());
			clicked_pp.next('tr').children('form').attr('action', "/elements/" + data).attr('id', "edit_element_" + data);
			clicked_pp.next('tr').find("input[type='submit']").addClass("new_made").val(data);
			clicked_pp.next('tr').find('input').attr('form', "edit_element_" + data);
		}).fail(function(data) {
			alert("sorry... this is an error...");
		});

		// $(document).ajaxStop(function() {
		// 	console.log(result + response);
		// 	if (result === "success") {
		// 		$(this).parent().parent().clone(true).insertAfter($(this).parent().parent());
		// 		$(this).parent().parent().next('tr').children("form").attr('action', "/elements/" + response).attr('id', "edit_element_" + response);
		// 		console.log("last");
		// 	} else {
		// 		alert("sorry... this is an error...");
		// 	}
		// });

	});

	// for new made element_form & HTTP POST => PUT
	$(document).on('click', '.new_made', function() {
		var clicked = $(this);
		$.ajax({
			url: "/elements/" + clicked.val(),
			type: PUT,
			data: {item: clicked.parent().parent().find(".item_input").val(),
						content: clicked.parent().parent().find(".content_input").val()},
		}).done(function(data) {
			console.log('success');
		}).fail(function() {
			alert("sorry... this is an error...");
		});
	});

	// first => disalbed
	$('input[type="submit"]').prop('disabled', true);

	// change => abled
	$(document).on('change', 'input', function() {
		var submit = $(this).parents('tr, div').find('input[type="submit"]');
		submit.prop('disabled', false).click();
	});

	// delete element_form
	$(document).on('click', '.del', function() {
		var form = $(this).parents('tr'),
				element_id = $(this).next('span').text();
		if(form.parent().children().length > 1) {
			alert("本当に削除しますか？\nAre you sure you want to delete this?");
			// need practice
			form.animate({width: 'toggle', opacity: 'toggle'}, {duration: 'slow', easing: 'linear'});

			// .remove() is so fast think design ui
			// form.fadeOut('slow').remove();
			$.ajax({
				url: "/elements/" + element_id,
				type: 'DELETE'
				// data: {element_id: element_id}
			});
		} else if (form.parent().children().length == 1) {
			alert("これ以上削除できません。\nYou can not delete any more.");
		} else {
			alert("sorry... this is an error...");
		}
	});

});
