//Burger button opens
$('.nav-burger').click(function(){
      $(this).toggleClass("open");
      $(".nav-items").toggleClass("open");
      $(".logo").toggleClass("open");
});

//Type pedicure
var count = $('.pedicure_type').children().length;
const size = 180;
let counter = 1;
$('.carousel_container_btnLeft').click(function(){
      if(counter > 1) {
            --counter;
            $('.pedicure_type-container').css('transform', 'translateX(' + -size*(counter-1) + '%)');
      }
      else {
            counter = count;
            $('.pedicure_type-container').css('transform', 'translateX(' + -size*(counter-1) + '%)');
      }
});

$('.carousel_container_btnRight').click(function(){
      if(counter < count) {
            $('.pedicure_type-container').css('transform', 'translateX(' + -size*counter + '%)');
            counter++;
      }
      else {
            $('.pedicure_type-container').css('transform', 'translateX(' + 0 + '%)');
            counter = 1;
      }
});

//galery pedicure
var countGalery = $('.pedicure_container').children().length;
const sizeGalery = 180;
let counterGalery = 1;
$('.galery_container_btnLeft').click(function(){
      if(counterGalery > 1) {
            --counterGalery;
            $('.pedicure_container-galery').css('transform', 'translateX(' + -size*(counterGalery-1) + '%)');
      }
      else {
            counterGalery = countGalery;
            $('.pedicure_container-galery').css('transform', 'translateX(' + -size*(counterGalery-1) + '%)');
      }
});

$('.galery_container_btnRight').click(function(){
      if(counterGalery < countGalery) {
            $('.pedicure_container-galery').css('transform', 'translateX(' + -size*counterGalery + '%)');
            counterGalery++;
      }
      else {
            $('.pedicure_container-galery').css('transform', 'translateX(' + 0 + '%)');
            counterGalery = 1;
      }
});

//button
$('.btn').click(function(){
  location.href="/appointment"
});
