//Burger button opens
$('.nav-burger').click(function(){
      $(this).toggleClass("open");
      $(".nav-items").toggleClass("open");
      $(".logo").toggleClass("open");
});

//Type makeup
var count = $('.makeup-type-container').children().length;
const size = 180;
let counter = 1;
$('.arrowLeft').click(function(){
      if(counter > 1) {
            --counter;
            $('.type').css('transform', 'translateX(' + -size*(counter-1) + '%)');
      }
      else {
            counter = count;
            $('.type').css('transform', 'translateX(' + -size*(counter-1) + '%)');
      }
});

$('.arrowRight').click(function(){
      if(counter < count) {
            $('.type').css('transform', 'translateX(' + -size*counter + '%)');
            counter++;
      }
      else {
            $('.type').css('transform', 'translateX(' + 0 + '%)');
            counter = 1;
      }
});

//galery makeup
var countGalery = $('.makeup-galery-container').children().length;
const sizeGalery = 180;
let counterGalery = 1;
$('.arrow-galery-Left').click(function(){
      if(counterGalery > 1) {
            --counterGalery;
            $('.galery').css('transform', 'translateX(' + -size*(counterGalery-1) + '%)');
      }
      else {
            counterGalery = countGalery;
            $('.galery').css('transform', 'translateX(' + -size*(counterGalery-1) + '%)');
      }
});

$('.arrow-galery-Right').click(function(){
      if(counterGalery < countGalery) {
            $('.galery').css('transform', 'translateX(' + -size*counterGalery + '%)');
            counterGalery++;
      }
      else {
            $('.galery').css('transform', 'translateX(' + 0 + '%)');
            counterGalery = 1;
      }
});
