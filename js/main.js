/*-----------------------------------------------------------------------------------
/*
/* Main JS
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


	/*----------------------------------------------------- */
	/* Modals
	------------------------------------------------------- */
	$('.modal-toggles ul').on('click', 'a', function (e) {

		var html = $('html'),
			main = $('main, footer'),
			footer = $('footer'),
			curMod = $(this).attr('href'),
			modal = $(curMod),
			modClose = modal.find('#modal-close');

		main.fadeOut(500, function () {
			$('html,body').scrollTop(0);
			modal.addClass('is-visible');
		});

		e.preventDefault();

		// for old ie
		if (html.hasClass('oldie')) {

			$(document).on('click', "#modal-close", function (evt) {
				$('html,body').scrollTop(0);
				modal.removeClass('is-visible');
				setTimeout(function () {
					main.fadeIn(500);
				}, 500);

				evt.preventDefault();
			});

		}
		// other browsers
		else {

			modClose.on('click', function (evt) {
				$('html,body').scrollTop(0);
				modal.removeClass('is-visible');
				setTimeout(function () {
					main.fadeIn(500);
				}, 500);

				evt.preventDefault();
			});

		}

	});

	/*---------------------------------------------------- */
	/* Owl Carousel
	------------------------------------------------------ */
	$("#owl-slider").owlCarousel({
		navigation: false,
		pagination: false,
		items: 4,
		navigationText: false,
		autoPlay: 2000,
		stopOnHover: true,
		loop: true
	});


	/*----------------------------------------------------*/
	/* FitText Settings
	------------------------------------------------------ */
	setTimeout(function () {

		$('main h1, #mod-about h1').fitText(1.1, { minFontSize: '28px', maxFontSize: '38px' });

	}, 100);


	/*---------------------------------------------------- */
	/* form post request
	 ------------------------------------------------------ */
	$("#form").submit(function (e) {

		e.preventDefault();

		var actionUrl = "https://bridge-mail-list-server.herokuapp.com/subscribe";
		// test build comment

		$('#subscribe-message').html('Subscribing...');

		$.ajax({
			url: actionUrl,
			type: 'post',
			contentType: 'application/x-www-form-urlencoded',
			data: $(this).serialize(),
			success: function (data, textStatus, jQxhr) {
				$('#subscribe-message').html('<i class="fa fa-check"></i>' + `Cheers on taking the first step! You'll hear from us soon.`);
				$('#subscribe-message').css('display', 'block');
			},
			error: function (jqXhr, textStatus, errorThrown) {
				$('#subscribe-message').html('<i class="fa fa-warning"></i>' + errorThrown.message);
				$('#subscribe-message').css('display', 'block');
				console.log(errorThrown.message);
			}
		})
	})

	$("#unsub-form").submit(function (e) {

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
				$('#unsubscribe-message').css('display', 'block');
				$('.hide-on-unsub').css('display', 'none');
				$('.show-on-unsub').css('display', 'inherit');

			},
			error: function (jqXhr, textStatus, errorThrown) {
				$('#unsubscribe-message').html('<i class="fa fa-warning"></i>' + errorThrown.message);
				$('#unsubscribe-message').css('display', 'block');
				console.log(errorThrown.message);
			}
		})
	})

})(jQuery);