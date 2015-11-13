/**
 * Created by Julius Hernandez on 11/11/2015.
 */
//jQuery(window).load(function(){
//
//});

(function($){
    $('#ja1').hover(function(){
        console.log("1st fn");
        $(this).animate({left: 75}, 'fast')
    }, function(){
        console.log("2nd .hover() fn");
        $(this).animate({left: 20}, 'fast')
    });
})(jQuery);