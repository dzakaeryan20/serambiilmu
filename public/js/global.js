var base_url = window.location.origin+"/";

$(document).ready(function(){

	$(function() {
		window.prettyPrint && prettyPrint()
			$(document).on('click', '.menu-top .dropdown-menu', function(e) {
			  e.stopPropagation()
			})
	})

	$(".brand-tips").popover({
		placement : 'bottom',
		show:'true'
    });

	$('.brand-tips').popover();
	$('.brand-tips').on('click', function (e) {
		$('.brand-tips').not(this).popover('hide');
	});

	$('.dropdown a').click(function(e){
		e.preventDefault();
		var url = $(this).attr('href');
		location.href = url;
	});

});
 
function search_mg()
{
	var source		= "https://www.google.com/?gws_rd=ssl#q=site:mgholidaygroup.com ";
	var q_search	= $('#q_search').val();

	var strQuery	= source + q_search;
	window.open(strQuery);
	return false;
}

//analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-57269719-1', 'auto');
  ga('require', 'displayfeatures');
  ga('send', 'pageview');