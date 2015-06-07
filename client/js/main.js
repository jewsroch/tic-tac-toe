 (function($) {
 	$( document ).ready(function() {
        $( ".cell" ).click(function(e) {
            console.log( "Clicked!" );
            event.preventDefault();
        });
  });
})(jQuery);
