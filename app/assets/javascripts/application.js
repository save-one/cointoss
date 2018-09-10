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
		}).done(function(data) {
			var clicked_tr = clicked.closest('tr');
			clicked_tr.clone(true).css('display', 'none').insertAfter(clicked_tr).show('slow');
			// id
			clicked_tr.next('tr').children('form').attr('action', "/elements/new_made/" + data).attr('id', "edit_element_" + data);
			// form
			clicked_tr.next('tr').find('input').attr('form', "edit_element_" + data);
			// submit => button for ajax .new_made and click
			clicked_tr.next('tr').find("input[type='submit']").attr('type', 'button').addClass("new_made").val(data).prop("disabled", false).click();
		}).fail(function(data) {
			alert("sorry... this is an error...");
		// }).always(function() {
		// 	$(this).closest('tr').next('tr').find("input[type='button']").click();
		// 	console.log($(this).closest('tr').next('tr').find("input[type='button']"));
		});

	});

	// for new made element_form & HTTP POST => PUT
	$(document).on('click', '.new_made', function() {
		var clicked = $(this);
		console.log(clicked.closest('tr').find(".item_input").val());
		console.log(clicked.closest('tr').find(".content_input").val());
		$.ajax({
			url: "/elements/new_made/" + clicked.val(),
			type: "PATCH",
			data: {item: clicked.closest('tr').find(".item_input").val(),
						content: clicked.closest('tr').find(".content_input").val()},
		}).done(function(data) {
			console.log('success');
		}).fail(function() {
			alert("sorry... this is an error...");
		});
	});

	// first => disalbed
	$('input[type="submit"]').prop('disabled', true);

	// raise changeEvent when cursol stay
	var set;
	function setTimeForChange(input) {
		console.log("set");
		set = setTimeout(function() {
						console.log("timeout");
						$(input).change();
					}, 10000);
	}
	// keyup for set setTimeForChange()
	$(document).on('keyup', 'input, textarea, select', function() {
		clearTimeout(set);
		setTimeForChange(this);
	});

	// change disabled => abled, setTimeout => clear
	$(document).on('change', 'input, textarea, select', function() {
		clearTimeout(set);
		console.log("clear");
		var submit = $(this).closest('tr, div').find('input[type="submit"], .new_made');
		submit.prop('disabled', false).click();
		console.log("ok");

	});

	// delete element_form
	$(document).on('click', '.del', function() {
		var form = $(this).closest('tr'),
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

	//cancel enterkey /n
	$('.cancelEnter').on('keydown', function(e) {
		if(e.which == 13) {
			return false;
		}
	}).on('blur', function() {
		// for copy paste
		var $textarea = $(this),
				text = $textarea.val(),
				new_text = text.replace(/\n/g, "");
		if (new_text != text) {
			$textarea.val(new_text);
		}
	});

	// textarea height resize
	function textAreaResize(textarea) {
		var height = $(textarea).css('height'),
				scroll_height = textarea.scrollHeight;
		if (height != scroll_height) {
			$(textarea).css('height', scroll_height);
		}
	}
	$('textarea').on('keyup', function() {
		textAreaResize(this);
	});
	$('textarea').each(function() {
		textAreaResize(this);
	});

	//
	// let sortable = Sortable.create(element_tbody, {
	// 	group: "element_tbody",
	// 	handle: ".element_tr",
	// 	animate: 100
	// });
	function sortableHelper(e, ui) { //ui => tr of target
		ui.children().each(function() {
			$(this).width($(this).width());
		});
		return ui;
	}
	$('#element_table tbody').sortable({
		revert: true,
		helper: sortableHelper,
		placeholder: "sortable_placeholder",
		item: "#element_table tbody tr",
		opacity: 0.8,
		cursor: "move",// ?
		axis: "y"
		// sort: function() {
		// 	var width = $(this).css('height');
		// 	console.log(height);
		// 	$('.sortable_placeholder').css('height', height);
		// }
	});
	// $('#element_table tbody').sortable("option", "placeholder", "sortable_placeholder");
	$('#element_table tbody').disableSelection();

});

