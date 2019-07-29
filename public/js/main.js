$(document).ready(function(){

 
	
//loading	
$('#preloader').delay(1000).fadeOut('500', function() {
    $(this).fadeOut()
});
    
    

//
AOS.init({
    duration: 1000
});
AOS.refresh();

  
});
//end



$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});






