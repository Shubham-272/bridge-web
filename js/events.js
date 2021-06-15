/*-----------------------------------------------------------------------------------
/*
/* Events JS
/*
-----------------------------------------------------------------------------------*/

(function ($) {

    /*---------------------------------------------------- */
    /* Preloader
    ------------------------------------------------------ */
    $(window).on('load', async function () {

        await generateEventCards();

        // will first fade out the loading animation 
        $("#loader").fadeOut("slow", function () {

            // will fade out the whole DIV that covers the website.
            $("#preloader").delay(300).fadeOut("slow");

        });

    })

    /*---------------------------------------------------- */
    /* Analytics
    ------------------------------------------------------ */

    if (window.location.host === "projectbridge.app" || window.location.host === "www.projectbridge.app") {
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());

        gtag('config', 'G-QEHF37GQD3');
    }


    /*----------------------------------------------------*/
    /* FitText Settings
    ------------------------------------------------------ */
    setTimeout(function () {

        $('main h1').fitText(1.1, { minFontSize: '28px', maxFontSize: '38px' });

    }, 100);

    /*----------------------------------------------------*/
    /* Event Cards API
    ------------------------------------------------------ */
    async function generateEventCards() {
        const actionUrl = 'https://bridge-mail-list-server.herokuapp.com/events';
        $.ajax({
            url: actionUrl,
            type: 'get',
            success: function (data, textStatus, jQxhr) {
                const eventsContainerDiv = document.querySelector(".events-container");
                var areEventsAvailable = false;
                if (data.events.length > 0) {
                    data.events.forEach(eventData => {
                        if (eventData.isAvailable && !eventData.isPast) {
                            areEventsAvailable = true;

                            var cardDiv = document.createElement('div');
                            cardDiv.className = 'card';
                            cardDiv.classList.add('twelve', 'columns', 'mob-whole');

                            var nameP = document.createElement('p');
                            nameP.className = 'card__name';
                            nameP.appendChild(document.createTextNode(eventData.name));
                            cardDiv.appendChild(nameP);

                            var detailsDiv = document.createElement('div');
                            detailsDiv.className = 'grid-container';
                            var dateTimeDiv = document.createElement('div');
                            dateTimeDiv.appendChild(document.createTextNode(eventData.dateTime));
                            var registrationsDiv = document.createElement('div');
                            registrationsDiv.appendChild(document.createTextNode(eventData.registrationsCount + " Registrations"));
                            detailsDiv.appendChild(dateTimeDiv);
                            detailsDiv.appendChild(registrationsDiv);
                            cardDiv.appendChild(detailsDiv);

                            if (eventData.isOpen) {
                                var registrationsLink = document.createElement('a');
                                var registerButton = document.createElement('button');
                                registerButton.className = 'reg-button';
                                registerButton.appendChild(document.createTextNode("Register"));
                                registrationsLink.appendChild(registerButton);
                                registrationsLink.href = eventData.registrationLink;
                                registrationsLink.title = "Register for session on " + eventData.name;
                                registrationsLink.target = '_blank';
                                cardDiv.appendChild(registrationsLink);
                            } else {
                                var registrationsClosedP = document.createElement('p');
                                registrationsClosedP.appendChild(document.createTextNode("Registrations closed!"));
                                registrationsClosedP.className = 'reg-closed';
                                cardDiv.appendChild(registrationsClosedP);
                            }

                            eventsContainerDiv.appendChild(cardDiv);
                        }
                    })
                    if (!areEventsAvailable) {
                        var noEventsP = document.createElement('p');
                        noEventsP.className = 'no-events';
                        noEventsP.appendChild(document.createTextNode('No events available!'));
                        eventsContainerDiv.appendChild(noEventsP);
                    }
                } else {
                    var noEventsP = document.createElement('p');
                    noEventsP.className = 'no-events';
                    noEventsP.appendChild(document.createTextNode('No events available!'));
                    eventsContainerDiv.appendChild(noEventsP);
                }
            },
            error: function (jqXhr, textStatus, errorThrown) {
                const eventsContainerDiv = document.querySelector(".events-container");
                var noEventsP = document.createElement('p');
                noEventsP.className = 'no-events';
                noEventsP.appendChild(document.createTextNode('No events available!'));
                eventsContainerDiv.appendChild(noEventsP);
                console.error(JSON.parse(jqXhr.responseText).message);
            }
        })
    }

})(jQuery);