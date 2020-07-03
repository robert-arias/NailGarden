//Burger button opens
$('.nav-burger').click(function(){
      $(this).toggleClass("open");
      $(".nav-items").toggleClass("open");
      $(".logo").toggleClass("open");
});

//reviews
var count = $('.reviews-container').children().length;
const size = 180;
let counter = 1;
$('#btnLeft').click(function(){
      if(counter > 1) {
            --counter;
            $('.review').css('transform', 'translateX(' + -size*(counter-1) + '%)');
      }
      else {
            counter = count;
            $('.review').css('transform', 'translateX(' + -size*(counter-1) + '%)');
      }
});

$('#btnRight').click(function(){
      if(counter < count) {
            $('.review').css('transform', 'translateX(' + -size*counter + '%)');
            counter++;
      }
      else {
            $('.review').css('transform', 'translateX(' + 0 + '%)');
            counter = 1;
      }
});

//galery carousel
var countGalery = $('.carousel-galery-container').children().length;
$(document).ready(function (){
  var show=3;
  var w = $('#slider').width() / show;
  var l = $('.slide').length;

  $('.slide').width(w);
  $('#slider-container').width(w*l)

  function slider(){
    $('.slider:first-child').animate({
      marginLeft: -w
    }, 'slow' , function(){
      $('this').appendTo($('this').parent()).css({marginLeft:0});
    });
  }
  var timer = setInterval(slider, 2000);

  $('#slider').hover(function(){
    clearInterval(timer);
  },function(){
    timer=setInterval(slider, 2000);
  });
});
