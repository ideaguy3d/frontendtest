"use strict";
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