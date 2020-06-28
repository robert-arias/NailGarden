var count = $('.type').children().length;
const size = 180;
let counter = 1;
$('.arrowLeft').click(function(){
      if(counter > 1) {
            --counter;
            $('.review').css('transform', 'translateX(' + -size*(counter-1) + '%)');
      }
      else {
            counter = count;
            $('.review').css('transform', 'translateX(' + -size*(counter-1) + '%)');
      }
});

$('.arrowRight').click(function(){
      if(counter < count) {
            $('.type-description').css('transform', 'translateX(' + -size*counter + '%)');
            counter++;
      }
      else {
            $('.type-description').css('transform', 'translateX(' + 0 + '%)');
            counter = 1;
      }
});
