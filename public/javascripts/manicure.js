//Burger button opens
$('.nav__burger').click(function(){
      $('.nav__burger--btn').toggleClass("nav__burger--btn--open");
      $('.nav__list').toggleClass('nav__list--open');
      $('.nav__logo').toggleClass('nav__logo--open');
});

//Type manicure
var count = $('.manicure_type').children().length;
const size = 180;
let counter = 1;
$('.carousel_container_btnLeft').click(function(){
      if(counter > 1) {
            --counter;
            $('.manicure_type-container').css('transform', 'translateX(' + -size*(counter-1) + '%)');
      }
      else {
            counter = count;
            $('.manicure_type-container').css('transform', 'translateX(' + -size*(counter-1) + '%)');
      }
});

$('.carousel_container_btnRight').click(function(){
      if(counter < count) {
            $('.manicure_type-container').css('transform', 'translateX(' + -size*counter + '%)');
            counter++;
      }
      else {
            $('.manicure_type-container').css('transform', 'translateX(' + 0 + '%)');
            counter = 1;
      }
});

//galery pedicure
var countGalery = $('.manicure_container').children().length;
const sizeGalery = 180;
let counterGalery = 1;
$('.galery_container_btnLeft').click(function(){
      if(counterGalery > 1) {
            --counterGalery;
            $('.manicure_container-galery').css('transform', 'translateX(' + -size*(counterGalery-1) + '%)');
      }
      else {
            counterGalery = countGalery;
            $('.manicure_container-galery').css('transform', 'translateX(' + -size*(counterGalery-1) + '%)');
      }
});

$('.galery_container_btnRight').click(function(){
      if(counterGalery < countGalery) {
            $('.manicure_container-galery').css('transform', 'translateX(' + -size*counterGalery + '%)');
            counterGalery++;
      }
      else {
            $('.manicure_container-galery').css('transform', 'translateX(' + 0 + '%)');
            counterGalery = 1;
      }
});
