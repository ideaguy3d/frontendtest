"use strict";

jQuery(document).ready(function (){

    jQuery.waitForImages.hasImgProperties = ['background', 'backgroundImage'];
    jQuery('body').waitForImages(function(){
        jQuery(".page-mask").delay(1200).fadeOut('slow');
        jQuery('body').css('overflowY', 'auto');
    });

    /*-----------------------Animated content--------------------------*/
    var wow = new WOW({
        animateClass: 'animated',
        offset: 100
    });

    wow.init();

    //Sticky Navigation
    var $navigation = jQuery("#navigation");
    $navigation.sticky({topSpacing: 100});

    //NakedWines Nav&Menu
    var nwMenu = jQuery('#nakedwines-menu');
    var menuOpen = false;
    jQuery('#nakedwines-menu-btn').click(function(){
        menuOpen = true;
        nwMenu.animate({right:0}, 250, function(){
            nwMenu.animate({height: "100%"}, 'slow');
        });
    });

    jQuery('section').click(function(){
        //console.log("in section click, menuOpen="+menuOpen);
        if(menuOpen === true){
            nwMenu.animate({height:"40%"}, 'slow', function(){
                nwMenu.animate({right: "-100%"}, 250);
                menuOpen = false;
            })
        }
    });

    //NakedWines wrapped isotope wine details slide
    var $wines_isotope = jQuery('#wines_isotope');
    var wines_open = false
    jQuery('#z12wines').click(function(){
        $wines_isotope.animate({left:'0'}, 'slow');
        wines_open = true;
        return false;
    });

    var $wine_back = jQuery('a.naked-wines-logo.pull-left');
    $wine_back.click(function(){
        $wines_isotope.animate({left:'-100%'}, 'slow');
        wines_open = false;
    });

    var lastScrollTop = 0;
    jQuery(window, '#wines_isotope').scroll(function(){
        var st = $(this).scrollTop();
        var freezePos = jQuery('#section4').scrollTop();
        if(wines_open) {
            if (st > lastScrollTop){
                // downscroll code
                jQuery('#wine-wrap').animate({bottom: '-=50px'}, 'fast');
                jQuery(this).animate({
                    scrollTop: freezePos}, 'fast');
            } else {
                // upscroll code
                jQuery('#wine-wrap').animate({bottom: '+=50px'}, 'fast');
                jQuery(this).animate({scrollTop: freezePos}, 'fast');
            }
            lastScrollTop = st;
        }
    });

    //when clicking an <a> animate to section
    var navigationHeight = $navigation.outerHeight();
    jQuery('.align-center a, .caption-inside a, .top-logo a, .video-section a')
        .click(function(){
        jQuery('html, body').animate({
            scrollTop: jQuery($.attr(this, 'href')).offset().top - navigationHeight + 44
        }, 800, 'easeInQuad');

        /* Fix jumping of navigation. */
        setTimeout(function(){
            jQuery(window).trigger('scroll');
        }, 900);
        return false;
    });

    // FullScreen Slider
    jQuery(function(){
        jQuery('#fullscreen-slider').maximage({
            cycleOptions: {
                fx: 'fade',
                speed: 1000, // Has to match the speed for CSS transitions in jQuery.maximage.css (lines 30 - 33)
                timeout: 0,
                prev: '#slider_left',
                next: '#slider_right',
                pause: 1,
                before: function(last, current){
                    var slideContent = jQuery('.slide-content');
                    slideContent.fadeOut().animate({top: '500px'}, {
                        queue: false,
                        easing: 'easeOutQuad',
                        duration: 750
                    });
                    slideContent.fadeOut().animate({top: '-500px'});
                },
                after: function(last, current){
                    jQuery('.slide-content').fadeIn().animate({top: '0'}, {
                        queue: false,
                        easing: 'easeOutQuad',
                        duration: 650
                    });
                }


            },
            onFirstImageLoaded: function(){
                //jQuery('#cycle-loader').delay(1000).hide();
                jQuery('#fullscreen-slider').delay(1000).fadeIn('slow');
                jQuery('.slide-content').fadeIn().animate({top: '0'});
                jQuery('.slide-content a').bind('click', function(event){
                    var $anchor = jQuery(this);
                    jQuery('html, body').stop().animate({
                        scrollTop: jQuery($anchor.attr('href')).offset().top - 44
                    }, 1500, 'easeInOutExpo');
                    event.preventDefault();
                });
            }
        });

        // Helper function to Fill and Center the HTML5 Video
        jQuery('video, object').maximage('maxcover');
    });

    /*------------------------Parallax section----------------------------*/
    // Calculating page width
    var pageWidth = jQuery(window).width();

    // Parallax
    jQuery(window).bind('load', function(){
        if(pageWidth > 980){
            parallaxInit();
        }
    });

    function parallaxInit(){
        jQuery('.landing-left').parallax("30%", 0.1);
        jQuery('.testimonial-wrap').parallax("10%",.8);
        jQuery('.quote-wrap').parallax("30%", 0.1);
        jQuery('.subscription-wrap').parallax("30%", 0.1);
        jQuery('.image-parallax').parallax("50%", 0.6);
    }

    var $landImg = jQuery('div.landing-img-div>img');
    if(pageWidth < 1200){ //window might be < 1200 when req is made
        $landImg.removeClass('landing-img');
        $landImg.attr('class', 'thumbnail img-thumbnail');
    }
    jQuery(window).resize(function(){
        pageWidth = jQuery(window).width();
        //>1845 - 49rem
        if(pageWidth > 1200){
            //console.log("2) "+pageWidth);
            $landImg.removeClass('thumbnail img-thumbnail');
            $landImg.addClass('landing-img');
        } else if (pageWidth < 1200) {
            //console.log("3 - "+pageWidth);
            $landImg.removeClass('landing-img');
            $landImg.attr('class', 'thumbnail img-thumbnail');
        }
        //jQuery('.landing-text').css("left", function(){
        //    //quick formula to keep landing text centered to pic
        //    return (Math.floor(pageWidth/10)/4)+1 + 'rem';
        //    /*
        //    if pageWidth = 1700px then Math.floor(pageWidth/10)/4 = 42.5
        //    left = 43.5rem
        //    */
        //});
    });

});// end of main jQuery(document).ready();

// Scroll To Top Section Button
jQuery(document).ready(function(){
    //
    jQuery(window).scroll(function(){
        var $scrollup = jQuery('.scrollup');
        if(jQuery(this).scrollTop() > 100){
            $scrollup.fadeIn();
        } else{
            $scrollup.fadeOut();
        }

        var $footer = jQuery('footer.footer-wrap');
        if(jQuery(this).scrollTop() > 1900){
            $footer.animate({bottom: 0}, 'fast');
        } else {
            $footer.animate({bottom: '-100px'}, 'fast');
        }
    });

    jQuery('.scrollup').click(function(){
        jQuery("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });
});

// BxSlider
jQuery(document).ready(function(){
    // for landing page header text slide show
    var onMobile = false;
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) { onMobile = true; }

    jQuery('.text-slide').bxSlider({
        controls: false,
        adaptiveHeight: false,
        pager: false,
        auto:true,
        mode:'fade',
        pause: 3000
    });
});

// wine isotope
jQuery(document).ready(function(){

    (function($) {
        "use strict";
        var $container = $('#wine-wrap'),
            $items = $container.find('.wine-item'),
            wineLayout = 'fitRows';

        if( $container.hasClass('wine-centered') ) {
            wineLayout = 'masonry';
        }

        $container.isotope({
            filter: '*',
            animationEngine: 'best-available',
            layoutMode: wineLayout,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            },
            masonry: {
            }
        }, refreshWaypoints());

        function refreshWaypoints() {
            setTimeout(function() {
            }, 1000);
        }

        var $filters = $('#filters a');

        $filters.on('click', function() {
            var selector = $(this).attr('data-filter');
            $container.isotope({ filter: selector }, refreshWaypoints());
            $filters.removeClass('active');
            $(this).addClass('active');
            return false;
        });

        function getColumnNumber() {
            var winWidth = $(window).width(),
                columnNumber = 1;

            if (winWidth > 1200) {
                columnNumber = 4;
            } else if (winWidth > 950) {
                columnNumber = 4;
            } else if (winWidth > 600) {
                columnNumber = 3;
            } else if (winWidth > 400) {
                columnNumber = 2;
            } else if (winWidth > 250) {
                columnNumber = 1;
            }
            return columnNumber;
        }

        function setColumns() {
            var winWidth = $(window).width(),
                columnNumber = getColumnNumber(),
                itemWidth = Math.floor(winWidth / columnNumber);

            $container.find('.wine-item').each(function() {
                $(this).css( {
                    width : itemWidth + 'px'
                });
            });
        }

        function setwine() {
            setColumns();
            $container.isotope('reLayout');
        }

        $container.imagesLoaded(function () {
            setwine();
        });

        $(window).on('resize', function () {
            setwine();
        });
    })(jQuery);
});//end of $.ready()

// PrettyPhoto isotope overlay
jQuery(function(){
    jQuery("a[data-gal^='prettyPhoto']").prettyPhoto({
        opacity: 0.5,
        social_tools: "",
        deeplinking: false
    });

    jQuery('a[data-rel^="prettyPhoto"]').prettyPhoto();
});


