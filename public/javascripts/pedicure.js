//Burger button opens
$('.nav__burger').click(function(){
      $('.nav__burger--btn').toggleClass("nav__burger--btn--open");
      $('.nav__list').toggleClass('nav__list--open');
      $('.nav__logo').toggleClass('nav__logo--open');
});

//Type pedicure
var count = $('.pedicure-type').children().length;
const size = 180;
let counter = 1;
$('.carousel-container__btnLeft').click(function(){
      if(counter > 1) {
            --counter;
            $('.pedicure-type-container').css('transform', 'translateX(' + -size*(counter-1) + '%)');
      }
      else {
            counter = count;
            $('.pedicure-type-container').css('transform', 'translateX(' + -size*(counter-1) + '%)');
      }
});

$('.carousel-container_btnRight').click(function(){
      if(counter < count) {
            $('.pedicure-type-container').css('transform', 'translateX(' + -size*counter + '%)');
            counter++;
      }
      else {
            $('.pedicure-type-container').css('transform', 'translateX(' + 0 + '%)');
            counter = 1;
      }
});

//galery pedicure
var countGalery = $('.pedicure-container').children().length;
const sizeGalery = 180;
let counterGalery = 1;
$('.galery-container__btnLeft').click(function(){
      if(counterGalery > 1) {
            --counterGalery;
            $('.pedicure-container-galery').css('transform', 'translateX(' + -size*(counterGalery-1) + '%)');
      }
      else {
            counterGalery = countGalery;
            $('.pedicure-container-galery').css('transform', 'translateX(' + -size*(counterGalery-1) + '%)');
      }
});

$('.galery-container_btnRight').click(function(){
      if(counterGalery < countGalery) {
            $('.pedicure-container-galery').css('transform', 'translateX(' + -size*counterGalery + '%)');
            counterGalery++;
      }
      else {
            $('.pedicure-container-galery').css('transform', 'translateX(' + 0 + '%)');
            counterGalery = 1;
      }
});
