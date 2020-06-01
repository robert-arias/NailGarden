//Click over the burger menu.

//Selects the .nav-burger class.
const burgerBtn = document.querySelector('.nav-burger');
//Variable used to know if the burger button was clicked on. False if action is to open the menu.
let burgerOpen = false;
//Click event listener for burger button click action.
burgerBtn.addEventListener('click', () => {
    if(!burgerOpen) {
        //Adds class 'open' to animate click action.
        burgerBtn.classList.add('open');
        burgerOpen = true;
  } else {
        //Removes class 'open' to animate click action.
        burgerBtn.classList.remove('open');
        burgerOpen = false;
  }
});