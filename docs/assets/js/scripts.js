/*===================================

Author       : TEMPLATEMANJA.

Template Name: Son Nguyen - CV / Resume

Version      : 1.1

===================================*/



/*===================================*

PAGE JS

*===================================*/



(function($) {

	'use strict';



	/*===================================*

	01. LOADING JS

	/*===================================*/

	// $(window).on('load', function() {
  //
	// 	setTimeout(function () {
  //
	// 		$("#preloader").delay(600).fadeOut(600).addClass('loaded');
  //
	// 	}, 700);
  //
	// });



	/*===================================*

	02. SMOOTH SCROLLING JS

	*===================================*/

	// Select all links with hashes

	var topheaderHeight = $(".top-header").innerHeight();

	var mainheaderHeight = $(".header_wrap").innerHeight();

	var headerHeight = mainheaderHeight - topheaderHeight;

    $('a.page-scroll[href*="#"]:not([href="#"])').on('click', function() {

		$('a.page-scroll.active').removeClass('active');

		$(this).closest('.page-scroll').addClass('active');

        // On-page links

        if ( location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname ) {

          // Figure out element to scroll to

          var target = $(this.hash),

              speed= $(this).data("speed") || 800;

              target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');



          // Does a scroll target exist?

          if (target.length) {

            // Only prevent default if animation is actually gonna happen

            event.preventDefault();

            $('html, body').animate({

              scrollTop: target.offset().top - headerHeight

            }, speed);

          }

        }

    });

	$(window).on('scroll', function(){

		var lastId,

			// All list items

			menuItems = $(".header_wrap").find("a.page-scroll"),

			topMenuHeight = $(".header_wrap").innerHeight() + 20,

			// Anchors corresponding to menu items

			scrollItems = menuItems.map(function(){

			  var items = $($(this).attr("href"));

			  if (items.length) { return items; }

			});

		var fromTop = $(this).scrollTop()+topMenuHeight;



	   // Get id of current scroll item

		var cur = scrollItems.map(function(){

		 if ($(this).offset().top < fromTop)

		   return this;

	   });

	   // Get the id of the current element

	   cur = cur[cur.length-1];

	   var id = cur && cur.length ? cur[0].id : "";



	   if (lastId !== id) {

		   lastId = id;

		   // Set/remove active class

		   menuItems.closest('.page-scroll').removeClass("active").end().filter("[href='#"+id+"']").closest('.page-scroll').addClass("active");

	   }



	});



	/*===================================*

	03. MENU JS

	*===================================*/

	//Main navigation scroll spy for shadow

	$(window).on('scroll', function() {

		var scroll = $(window).scrollTop();



	    if (scroll >= 80) {

	        $('header').addClass('nav-fixed');

	    } else {

	        $('header').removeClass('nav-fixed');

	    }



	});



	//Show Hide dropdown-menu Main navigation

	$( document ).on('ready', function () {

		$( '.dropdown-menu a.dropdown-toggler' ).on( 'click', function () {

			if ( !$( this ).next().hasClass( 'show' ) ) {

				$( this ).parents( '.dropdown-menu' ).first().find( '.show' ).removeClass( "show" );

			}

			var $subMenu = $( this ).next( ".dropdown-menu" );

			$subMenu.toggleClass( 'show' );



			$( this ).parent( "li" ).toggleClass( 'show' );



			$( this ).parents( 'li.nav-item.dropdown.show' ).on( 'hidden.bs.dropdown', function () {

				$( '.dropdown-menu .show' ).removeClass( "show" );

			} );



			return false;

		});

	});



	//Hide Navbar Dropdown After Click On Links

	var navBar = $(".header_wrap");

	var navbarLinks = navBar.find(".navbar-collapse ul li a.page-scroll");



    $.each( navbarLinks, function() {



      var navbarLink = $(this);



        navbarLink.on('click', function () {

          navBar.find(".navbar-collapse").collapse('hide');

		  $("header").removeClass("active");

        });



    });



	//Main navigation Active Class Add Remove

	$('.navbar-toggler').on('click', function() {

		$("header").toggleClass("active");

	});



	/*===================================*

	04. BACKGROUND ANIMATION JS

	*===================================*/

	var $particles_js = $('#banner_bg_effect');

	if ($particles_js.length > 0) {

		particlesJS('banner_bg_effect',

			// Update your personal code.

			{

				"particles": {

					"number": {

						"value": 80,

						"density": {

							"enable": true,

							"value_area": 800

						}

					},

					"color": {

						"value": "#ffffff"

					},

					"shape": {

						"type": "circle",

						"stroke": {

							"width": 0,

							"color": "#ffffff"

						},

						"polygon": {

							"nb_sides": 5

						},

						"image": {

							"src": "img/github.svg",

							"width": 100,

							"height": 100

						}

					},

					"opacity": {

						"value": 0.4,

						"random": false,

						"anim": {

							"enable": false,

							"speed": 2,

							"opacity_min": 0.5,

							"sync": false

						}

					},

					"size": {

						"value": 3,

						"random": true,

						"anim": {

							"enable": false,

							"speed": 20,

							"size_min": 0.2,

							"sync": false

						}

					},

					"line_linked": {

						"enable": true,

						"distance": 150,

						"color": "#ffffff",

						"opacity": 0.20,

						"width": 1

					},

					"move": {

						"enable": true,

						"speed": 3,

						"direction": "none",

						"random": false,

						"straight": false,

						"out_mode": "out",

						"bounce": false,

						"attract": {

							"enable": false,

							"rotateX": 600,

							"rotateY": 1200

						}

					}

				},

				"interactivity": {

					"detect_on": "canvas",

					"events": {

						"onhover": {

							"enable": true,

							"mode": "repulse"

						},

						"onclick": {

							"enable": true,

							"mode": "push"

						},

						"resize": true

					},

					"modes": {

						"grab": {

							"distance": 400,

							"line_linked": {

								"opacity": 1

							}

						},

						"bubble": {

							"distance": 400,

							"size": 20,

							"duration": 2,

							"opacity": 1,

							"speed": 3

						},

						"repulse": {

							"distance": 200,

							"duration": 0.4

						},

						"push": {

							"particles_nb": 4

						},

						"remove": {

							"particles_nb": 2

						}

					}

				},

				"retina_detect": true

			}



		);

	}



	/*===================================*

	05. SLIDER JS

	*===================================*/

		var owl = $('.owl-thumbs-slider');

		owl.owlCarousel({

			loop: false,

			items: 4,

			dots: false,

			margin: 10,

			nav: true,

			thumbs: true,

			navText: ['<i class="ion-ios-arrow-back"></i>', '<i class="ion-ios-arrow-forward"></i>'],

		});



		$( window ).on( "load", function() {

			$('.carousel_slider').each( function() {

				var $carousel = $(this);

				$carousel.owlCarousel({

					dots : $carousel.data("dots"),

					loop : $carousel.data("loop"),

					items: $carousel.data("items"),

					margin: $carousel.data("margin"),

					rtl: $carousel.data("rtl"),

					mouseDrag: $carousel.data("mouse-drag"),

					touchDrag: $carousel.data("touch-drag"),

					autoHeight: $carousel.data("autoheight"),

					center: $carousel.data("center"),

					nav: $carousel.data("nav"),

					rewind: $carousel.data("rewind"),

					navText: ['<i class="ion-ios-arrow-back"></i>', '<i class="ion-ios-arrow-forward"></i>'],

					autoplay : $carousel.data("autoplay"),

					animateIn : $carousel.data("animate-in"),

					animateOut: $carousel.data("animate-out"),

					autoplayTimeout : $carousel.data("autoplay-timeout"),

					smartSpeed: $carousel.data("smart-speed"),

					responsive: $carousel.data("responsive")

				});



			});

		});



	/*===================================*

	06. PORTFOLIO JS

	*===================================*/

	$( window ).on( "load", function() {

		var $grid_selectors  = $(".grid_container");

		var filter_selectors = ".grid_filter > li > a";

		$(document).ready(function() {

			if( $grid_selectors.length > 0 ) {

				$grid_selectors.imagesLoaded(function(){

					if ($grid_selectors.hasClass("masonry")){

						$grid_selectors.isotope({

							itemSelector: '.grid_item',

							percentPosition: true,

							layoutMode: "masonry",

							masonry: {

								columnWidth: '.grid-sizer'

							},

						});

					}

					else {

						$grid_selectors.isotope({

							itemSelector: '.grid_item',

							percentPosition: true,

							layoutMode: "fitRows",

						});

					}

				});

			}

		});



		//isotope filter

		$(document).on( "click", filter_selectors, function() {

			$(filter_selectors).removeClass("current");

			$(this).addClass("current");

			var dfselector = $(this).data('filter');

			if ($grid_selectors.hasClass("masonry")){

				$grid_selectors.isotope({

					itemSelector: '.grid_item',

					layoutMode: "masonry",

					masonry: {

						columnWidth: '.grid_item'

					},

					filter: dfselector

				});

			}

			else {

				$grid_selectors.isotope({

					itemSelector: '.grid_item',

					layoutMode: "fitRows",

					filter: dfselector

				});

			}

			return false;

		});



		$(window).on("resize", function () {

			setTimeout(function () {

				$grid_selectors.find('.grid_item').removeClass('animation').removeClass('animated'); // avoid problem to filter after window resize

				$grid_selectors.isotope('layout');

			}, 300);

		});

	});



	$('.grid_item .image_popup').on('click', function () {

		$(this).find('.link_container').magnificPopup('open');

	});

	$('.link_container').each(function () {

		$(this).magnificPopup({

			delegate: '.image_popup',

			type: 'image',

			gallery: {

				enabled: true

			}

		});

	});



	/*===================================*

	07. CONTACT FORM JS

	*===================================*/

	$("#submitButton").on("click", function(event) {
	    event.preventDefault();
	    var mydata = $("form").serialize();
	    $.ajax({
	        type: "POST",
	        dataType: "json",
	        url: "contact.php",
	        data: mydata,
	        success: function(data) {
	            if (data.type === "error") {
	                $("#alert-msg").removeClass("alert, alert-success");
	                $("#alert-msg").addClass("alert, alert-danger");
	            } else {
	                $("#alert-msg").addClass("alert, alert-success");
	                $("#alert-msg").removeClass("alert, alert-danger");
	                $("#first-name").val("Enter Name");
	                $("#email").val("Enter Email");
					$("#phone").val("Enter Phone Number");
	                $("#subject").val("Enter Subject");
	                $("#description").val("Enter Message");

	            }
	            $("#alert-msg").html(data.msg);
	            $("#alert-msg").show();
	        },
	        error: function(xhr, textStatus) {
	            alert(textStatus);
	        }
	    });
	});



	/*===================================*

	08. SCROLLUP JS

	*===================================*/

	$(window).on('scroll', function() {

		if ($(this).scrollTop() > 150) {

			$('.scrollup').fadeIn();

		} else {

			$('.scrollup').fadeOut();

		}

	});



	$(".scrollup").on('click', function (e) {

		e.preventDefault();

		$('html, body').animate({

			scrollTop: 0

		}, 600);

		return false;

	});





	/*===================================*

	09. POPUP JS

	*===================================*/

	$('.content-popup').magnificPopup({

		type: 'inline',

		preloader: true,

		mainClass: 'mfp-zoom',

	});





	$('.image_gallery').each(function() { // the containers for all your galleries

		$(this).magnificPopup({

			delegate: 'a', // the selector for gallery item

			type: 'image',

			gallery: {

				enabled:true

			},

			zoom: {

				enabled: true,

				duration: 300, // don't foget to change the duration also in CSS

				opener: function(element) {

					return element.find('img');

				}

			}

		});

	});



	$(document).on('ready', function() {

		$('.popup-ajax').magnificPopup({

			type: 'ajax',

		});

	});





	$('.portfolio_item .image_popup').on('click', function () {

		$(this).find('.link_container').magnificPopup('open');

	});

	$('.link_container').each(function () {

		$(this).magnificPopup({

			delegate: '.image_popup',

			type: 'image',

			gallery: {

				enabled: true

			}

		});

	});



	/*==============================================================

    10. VIDEO JS

    ==============================================================*/

	$(document).on('ready', function() {

		$('.video_popup, .iframe_popup').magnificPopup({

			type: 'iframe',

			mainClass: 'mfp-fade',

			removalDelay: 160,

			preloader: false,

			fixedContentPos: false

		});

	});



	/*===================================*

	11. ANIMATION JS

	*===================================*/

	$(function() {



		function ckScrollInit(items, trigger) {

			items.each(function() {

				var ckElement = $(this),

					AnimationClass = ckElement.attr('data-animation'),

					AnimationDelay = ckElement.attr('data-animation-delay');



				ckElement.css({

					'-webkit-animation-delay': AnimationDelay,

					'-moz-animation-delay': AnimationDelay,

					'animation-delay': AnimationDelay,

					opacity: 0

				});



				var ckTrigger = (trigger) ? trigger : ckElement;



				ckTrigger.waypoint(function() {

					ckElement.addClass("animated").css("opacity", "1");

					ckElement.addClass('animated').addClass(AnimationClass);

				}, {

					triggerOnce: true,

					offset: '90%',

				});

			});

		}



		ckScrollInit($('.animation'));

		ckScrollInit($('.staggered-animation'), $('.staggered-animation-wrap'));



	});



	/*===================================*

	12. BACKGROUND IMAGE JS

	*===================================*/

	/*data image src*/

	$(".background_bg").each(function() {

		var attr = $(this).attr('data-img-src');

		if (typeof attr !== typeof undefined && attr !== false) {

			$(this).css('background-image', 'url(' + attr + ')');

		}

	});





	/*===================================*

	13. COUNTER JS

	*===================================*/

	var timer = $('.counter');

	if(timer.length) {

		timer.appear(function () {

		  timer.countTo();

	  });

	}



	/*===================================*

	14. PROGRESS BAR JS

	*===================================*/

	$('.progress-bar').each(function(){

		var width = $(this).attr('aria-valuenow');

		$(this).appear(function() {

			$(this).css('width', width + '%');

			$(this).children('.count_pr').css('left', width + '%');

			$(this).find('.count').countTo({

				from: 0,

                to: width,

				time: 3000,

				refreshInterval: 50,

			});

		});

	});



	/*===================================*

	15. Cart Page Payment option

	*===================================*/

	var $chart = $('.circular_bar_chart');

	$chart.appear(function() {

		$chart.easyPieChart({

			trackWidth: $chart.data('track-width'),

			lineWidth: $chart.data('line-width'),

			delay: 5000,

			barColor: $chart.data('bar-color'),

			scaleColor: false,

			scaleLength: 0,

			lineCap: 'round',

			trackColor: $chart.data('track-color'),

			size: $chart.data('size'),

			animate: {

				duration: 3000,

				enabled: true

			},

			//lineCap: 'butt',

			onStep: function(from, to, percent) {$(this.el).find('.percent').text(Math.round(percent));}

		});

	});



/*===================================*/
  $(document).ready(function() {

		// $('.profile_image').height($('.profile_info').height());

	});

})(jQuery);
