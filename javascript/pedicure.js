//Burger button opens
$('.nav-burger').click(function(){
      $(this).toggleClass("open");
      $(".nav-items").toggleClass("open");
      $(".logo").toggleClass("open");
});

var count = $('.pedicure-type-container').children().length;
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
