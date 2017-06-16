$(function() {
	
    $("head").append("<link rel='stylesheet' type='text/css' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css' />");
	
	//anchor links
	
	$(".navbar-nav").on("click","a", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({scrollTop: top}, 1500);
	});
	
	$('nav li a').click(function () {
		$('nav li').removeClass('active');
		$(this).parent().addClass('active');
		return true;
	});
	
	//Scroll Top
	
	$('#scrollUp').mouseover(function(){
		$( this ).animate({opacity: 0.65},100);
	}).mouseout( function(){
		$( this ).animate({opacity: 1},100);
	}).click(function(e){
		e.preventDefault();
		$('body,html').animate({ scrollTop: 1 }, 1000);
	});
	
	$(window).scroll(function(){
		if ( $(document).scrollTop() > 0 ) {
			$('#scrollUp').fadeIn('fast');
		} else {
			$('#scrollUp').fadeOut('fast');
		}
	});
	
	//modal
	
	$('.order,.order-form').click( function(event){
		event.preventDefault();
		$('#overlay').fadeIn(400, function(){
			$('#modal-form').css('display', 'block');
			$('#modal-form').animate({opacity: 1, top: '20%'}, 200);
		});
	});
	
	$('.form-close').click( function(){
		$('#modal-form').animate({opacity: 0, top: '45%'}, 200,
			function(){
				$(this).css('display', 'none');
				$('#overlay').fadeOut(400);
				$('.form-of-training, .practices, .course').find(".name, .price, .price .rub").removeClass("active");
			}
		);
	});

    
    $('.fade').slick({
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });

    $('.responsive').slick({
        dots: true,
        arrows: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                    arrows: false,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    //mobile-menu

    $.fn.extend({

        // Define the threeBarToggle function by extending the jQuery object
        threeBarToggle: function(options){

            // Set the default options
            var defaults = {
                color: '#9b3f34',
                width: 37,
                height: 25,
                speed: 400,
                animate: true
            };
            var options = $.extend(defaults, options);

            return this.each(function(){

                $(this).empty().css({'width': options.width, 'height': options.height, 'background': 'transparent'});
                $(this).addClass('tb-menu-toggle');
                $(this).prepend('<i></i><i></i><i></i>').on('click', function(event) {
                    event.preventDefault();
                    $(this).toggleClass('tb-active-toggle');
                    if (options.animate) { $(this).toggleClass('tb-animate-toggle'); }
                    $('.tb-mobile-menu').slideToggle(options.speed);
                });
                $(this).children().css('background', options.color);
            });
        },

        // Define the accordionMenu() function that adds the sliding functionality
        accordionMenu: function(options){

            // Set the default options
            var defaults = {
                speed: 400
            };
            var options =  $.extend(defaults, options);

            return this.each(function(){

                $(this).addClass('tb-mobile-menu');
                var menuItems = $(this).children('li');
                menuItems.find('.sub-menu').parent().addClass('tb-parent');
                $('.tb-parent ul').hide();
                $('.tb-parent > a').on('click', function(event) {
                    event.stopPropagation();
                    event.preventDefault();
                    $(this).siblings().slideToggle(options.speed);
                });

            });
        }
    });

// Convert any element into a three bar toggle
// Optional arguments are 'speed' (number in ms, 'slow' or 'fast') and 'animation' (true or false) to disable the animation on the toggle
    $('#menu-toggle').threeBarToggle({color: '#9b3f34', width: 37, height: 25});

// Make any nested ul-based menu mobile
// Optional arguments are 'speed' and 'accordion' (true or false) to disable the behavior of closing other sub
    $('#menu').accordionMenu();

    $("#menu li a").click(function() {
        $("a").removeClass('active');
        $(this).addClass('active');
    });





    //Аякс отправка форм
    //Документация: http://api.jquery.com/jquery.ajax/
	$("#feadback-form").submit(function() {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function() {
			$('#feadback-form')[0].reset(
				setTimeout(function () {}, 1000)
			);
			
			$('#popUpMessage').removeClass('hiddenDiv');
			setTimeout(function () {
				$('#popUpMessage').addClass('hiddenDiv');
			}, 2000);
		});
		return false;
	});
});
