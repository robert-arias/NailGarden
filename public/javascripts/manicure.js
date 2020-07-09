//Burger button opens
$('.nav__burger').click(function(){
      $('.nav__burger--btn').toggleClass("nav__burger--btn--open");
      $('.nav__list').toggleClass('nav__list--open');
      $('.nav__logo').toggleClass('nav__logo--open');
});

//Type manicure
var count = $('.manicure-type-container').children().length;
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

//galery pedicure
var countGalery = $('.manicure-galery-container').children().length;
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

//button
$('.btn').click(function(){
  location.href="/appointment"
});
