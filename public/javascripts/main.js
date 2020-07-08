//Burger button opens
$('.nav__burger').click(function(){
      $('.nav__burger--btn').toggleClass("nav__burger--btn--open");
      $('.nav__list').toggleClass('nav__list--open');
      $('.nav__logo').toggleClass('nav__logo--open');
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
