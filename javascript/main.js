//Burger button opens
$('.nav-burger').click(function(){
      $(this).toggleClass("open");
      $(".nav-items").toggleClass("open");
      $(".logo").toggleClass("open");
});

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
const sizeGalery = 180;
let counterGalery = 1;
$('.arrow-carousel-Left').click(function(){
      if(counterGalery > 1) {
            --counterGalery;
            $('.carousel').css('transform', 'translateX(' + -size*(counterGalery-1) + '%)');
      }
      else {
            counterGalery = countGalery;
            $('.carousel').css('transform', 'translateX(' + -size*(counterGalery-1) + '%)');
      }
});

$('.arrow-carousel-Right').click(function(){
      if(counterGalery < countGalery) {
            $('.carousel').css('transform', 'translateX(' + -size*counterGalery + '%)');
            counterGalery++;
      }
      else {
            $('.carousel').css('transform', 'translateX(' + 0 + '%)');
            counterGalery = 1;
      }
});
