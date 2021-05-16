/*-----------------------------------------------------------------------------------
/*
/* Unsubscribe JS
/*
-----------------------------------------------------------------------------------*/

(function ($) {

	/*---------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */
	$(window).on('load', function () {

		// will first fade out the loading animation 
		$("#loader").fadeOut("slow", function () {

			// will fade out the whole DIV that covers the website.
			$("#preloader").delay(300).fadeOut("slow");

		});

	})

	/*----------------------------------------------------*/
	/*  Placeholder Plugin Settings
	------------------------------------------------------ */
	$('input').placeholder()


	/*----------------------------------------------------*/
	/* FitText Settings
	------------------------------------------------------ */
	setTimeout(function () {

		$('main h1, #mod-about h1').fitText(1.1, { minFontSize: '28px', maxFontSize: '38px' });

	}, 100);

	$("#unsubscribe-form").submit(function (e) {

		e.preventDefault();

		var actionUrl = "https://bridge-mail-list-server.herokuapp.com/unsubscribe";

		$('#unsubscribe-message').html('Unsubscribing...');

		$.ajax({
			url: actionUrl,
			type: 'post',
			contentType: 'application/x-www-form-urlencoded',
			data: $(this).serialize(),
			success: function (data, textStatus, jQxhr) {
				$('#unsubscribe-message').html('<i class="fa fa-check"></i>' + `You won't receive any further communications from Project Bridge`);
				$('.hide-on-unsub').css('display', 'none');
				$('.show-on-unsub').css('display', 'inherit');
			},
			error: function (jqXhr, textStatus, errorThrown) {
				$('#unsubscribe-message').html('<i class="fa fa-warning"></i>' + JSON.parse(jqXhr.responseText).message);
				$('#unsubscribe-message').css('display', 'block');
				console.log(JSON.parse(jqXhr.responseText).message);
			}
		})
	})

})(jQuery);