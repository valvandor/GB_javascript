'use strict';

/**
 * В корзине хранится количество каждого товара по ключу id
 * Ключ — id продукта
 */
let basket = {};

/** 
 * По значению ключей (productId) хранятся объекты с названием и ценой товаров, добавленных в корзину
 */
let productInfo = {};

const openBasketBtn = document.querySelector('.cartIconWrap');
const basketEl = document.querySelector('.basket');
const basketCounterEl = document.querySelector('.cartIconWrap > span');
const basketTotalEl = document.querySelector('.basketTotal');
const basketTotalValueEl = document.querySelector('.basketTotalValue');


openBasketBtn.addEventListener('click', function () {
    basketEl.classList.toggle('hidden');
});



/**
 * Устанавливает data-productId аттрибут родительскому контейнеру равным текущему значению счетчика, 
 * если этого аттрибута у родительского контейнера нет. 
 * Ведёт учёт количества товаров в объекте basket.
 * @param {HTMLElement} clickedBtn
 * @returns {Number} productID
 */
function setDataIdAttrForParentContainer(clickedBtn) {
    // обращаемся к родительскому контейнеру для кликнутого товара
    const parentContainer = clickedBtn.parentNode.parentNode.parentNode;

    if (isNotDataIdAttr(parentContainer)) {
        parentContainer.setAttribute('data-productId', `${counter}`);
        basket[counter] = 1;
        makeProductInfoForBasket(parentContainer, counter);
        counter += 1;
    } else {
        const productId = parentContainer.getAttribute('data-productId')
        basket[productId] += 1;
    }

    return parentContainer.getAttribute('data-productId');
}


/**
 * Функция проверяет наличие data-productId аттрибута
 * @param {HTMLDivElement} divEl 
 * @returns True if not exists
 */
function isNotDataIdAttr(divEl) {
    return !divEl.getAttribute('data-productId')
}

/**
 * Генерирует элементы объекта productInfo с информацией о товаре
 * @param {HTMLDivElement} divEl - current product's card
 * @param {Number} id 
 */
function makeProductInfoForBasket(divEl, id) {
    const productNameEl = divEl.querySelector('.featuredData .featuredName');
    const productPriceEl = divEl.querySelector('.featuredData .featuredPrice');

    const productName = productNameEl.textContent.trim();
    const productPrice = productPriceEl.textContent.replace(/[^\d.]/ig, '');

    productInfo[id] = {
        name: productName,
        price: productPrice
    }
}


function increaseProductsCountIcon() {
    if (basketCounterEl.textContent == '0') {
        basketCounterEl.style.display = 'inline';
    }
    basketCounterEl.textContent++;
}


function renderProductInBasket(productId) {
    let productExist = document.querySelector(`.productCount[data-productId="${productId}"]`);
    if (productExist) {
        increaseProductCount(productId);
        recalculateSumForProduct(productId);
    } else {
        renderNewProductInBasket(productId);
    }
}


function increaseProductCount(productId) {
    const productCountEl = document.querySelector(`.productCount[data-productId="${productId}"]`);
    productCountEl.textContent++;
}


function recalculateSumForProduct(productId) {
    const productPriceEl = document.querySelector(`.productTotalPrice[data-productId="${productId}"]`);
    const pricePerOne = productInfo[productId].price;
    const amountProducts = basket[productId];
    productPriceEl.textContent = (amountProducts * pricePerOne).toFixed(2);
}


function renderNewProductInBasket(productId) {
    let productRow = `
            <div class="basketRow">
                <div>${productInfo[productId].name}</div>
                <div>
                    <span class="productCount" data-productId="${productId}">1</span> шт.
                </div>
                <div>$${productInfo[productId].price}</div>
                <div>
                    $<span class="productTotalPrice" data-productId="${productId}">${productInfo[productId].price}</span>
                </div>
            </div>
        `;
    basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}


function calculateAndRenderTotalBasketSum() {
    let totalSum = 0;
    for (let productId in basket) {
        totalSum += basket[productId] * productInfo[productId].price;
    }
    basketTotalValueEl.textContent = totalSum.toFixed(2);
}


function addProductIntoBasket(event) {
    let productId = setDataIdAttrForParentContainer(event.target);
    increaseProductsCountIcon();
    renderProductInBasket(productId);
    calculateAndRenderTotalBasketSum();
}