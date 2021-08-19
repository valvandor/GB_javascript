'use strict';

let counter = 1;
const addToCartButtons = document.querySelectorAll('.featuredImgDark > button');


addToCartButtons.forEach(function (button) {
    button.addEventListener('click', addProductIntoBasket);
})

