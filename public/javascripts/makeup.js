//Burger button opens
$('.nav__burger').click(function(){
      $('.nav__burger--btn').toggleClass("nav__burger--btn--open");
      $('.nav__list').toggleClass('nav__list--open');
      $('.nav__logo').toggleClass('nav__logo--open');
});

//Type makeup
var count = $('.makeup-type').children().length;
const size = 180;
let counter = 1;
$('.carousel-container__btnLeft').click(function(){
      if(counter > 1) {
            --counter;
            $('.makeup-type-container').css('transform', 'translateX(' + -size*(counter-1) + '%)');
      }
      else {
            counter = count;
            $('.makeup-type-container').css('transform', 'translateX(' + -size*(counter-1) + '%)');
      }
});

$('.carousel-container__btnRight').click(function(){
      if(counter < count) {
            $('.makeup-type-container').css('transform', 'translateX(' + -size*counter + '%)');
            counter++;
      }
      else {
            $('.makeup-type-container').css('transform', 'translateX(' + 0 + '%)');
            counter = 1;
      }
});

//galery makeup
var countGalery = $('.makeup-container').children().length;
const sizeGalery = 180;
let counterGalery = 1;
$('.galery-container__btnLeft').click(function(){
      if(counterGalery > 1) {
            --counterGalery;
            $('.makeup-container-galery').css('transform', 'translateX(' + -size*(counterGalery-1) + '%)');
      }
      else {
            counterGalery = countGalery;
            $('.makeup-container-galery').css('transform', 'translateX(' + -size*(counterGalery-1) + '%)');
      }
});

$('.galery-container__btnRight').click(function(){
      if(counterGalery < countGalery) {
            $('.makeup-container-galery').css('transform', 'translateX(' + -size*counterGalery + '%)');
            counterGalery++;
      }
      else {
            $('.makeup-container-galery').css('transform', 'translateX(' + 0 + '%)');
            counterGalery = 1;
      }
});
