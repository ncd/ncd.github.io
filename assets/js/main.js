var sectionHeight = function() {
  var total    = $(window).height(),
      $section = $('section').css('height','auto');

  if ($section.outerHeight(true) < total) {
    var margin = $section.outerHeight(true) - $section.height();
    $section.height(total - margin - 20);
  } else {
    $section.css('height','auto');
  }
}

var fillForm = function () {
} ();

$(window).resize(sectionHeight);

$(function() {
  $("section h1, section h2, section h3").each(function(){
    if ($(this).attr("id") !== "title") {
      $("nav.section ul").append("<li class='tag-" + this.nodeName.toLowerCase() + "'><a href='#" + $(this).text().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,'') + "'>" + $(this).text() + "</a></li>");
      $(this).attr("id",$(this).text().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,''));
      $("nav.section ul li:first-child a").parent().addClass("active");
    }
  });

  var queryString = document.location.search.split("+").join(" ");
  var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;

  while (tokens = re.exec(queryString)) {
      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }
  
  
  if (params.category !== undefined) {
    $('.content').each(function() {
      if (!$(this).attr('class').includes(params.category)){
        $(this).remove()
      }
    })
    $('a').each(function() {
      if ($(this).text().includes(params.category)) {
        $(this).css('font-weight', 'bold')
      }
      else {
        $(this).css('font-weight', 'normal')
      }
      // if ($(this).text().includes("Click for more detail")) {
      //   var oldUrl = $(this).attr("href");
      //   $(this).attr("href", oldUrl + "?category=" + params.category)
      // }
    })
  }

  $("nav ul li").on("click", "a", function(event) {
    var position = $($(this).attr("href")).offset().top - 190;
    $("html, body").animate({scrollTop: position}, 400);
    $("nav ul li a").parent().removeClass("active");
    $(this).parent().addClass("active");
    event.preventDefault();
  });

  sectionHeight();

  $('img').on('load', sectionHeight);
});
