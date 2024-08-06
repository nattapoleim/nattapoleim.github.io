import { bundle, products } from '/data/products/products.js'
import formatNumber from '/js/formatNumber.js'

const allProduct = [...products, bundle]

const bagListItemElement = document.querySelector('#bag-list-item')
const totalElement = document.querySelector('#total')
const couponInput = document.querySelector('#coupon-input')
const couponBtn = document.querySelector('#coupon-btn')
const mobileBagListItemElement = document.querySelector('#mobile-bag-list-item')
const mobileTotalElement = document.querySelector('#mobile-total')
const mobileSummaryTotalElement = document.querySelector('#mobile-summary-total')
const mobileCouponInput = document.querySelector('#mobile-coupon-input')
const mobileCouponBtn = document.querySelector('#mobile-coupon-btn')

let bagList = []
let balance = 0

if (localStorage.getItem('bag')) {
   bagList = JSON.parse(localStorage.getItem('bag'))
} else {
   localStorage.setItem('bag', JSON.stringify(bagList))
}

console.log(bagList)

const calculateTotalBalance = () => {
   return bagList.reduce((total, item) => {
      const product = allProduct.find(p => p.thumbnail === item.name)
      return total + product.price * item.quantity
   }, 0)
}

const updateBalance = () => {
   balance = calculateTotalBalance()
   totalElement.innerHTML = `<span class="text-sm text-base-300">THB</span> ${formatNumber(
      balance,
   )}.00`
   mobileTotalElement.innerHTML = `<span class="text-sm text-base-300">THB</span> ${formatNumber(
      balance,
   )}.00`
   mobileSummaryTotalElement.innerHTML = `<span class="text-sm text-base-300">THB</span> ${formatNumber(
      balance,
   )}.00`
}

updateBalance()

bagList.forEach(item => {
   const productIndex = allProduct.findIndex(p => p.thumbnail === item.name)

   const product = allProduct[productIndex]

   bagListItemElement.innerHTML += /*html*/ `
      <div class="flex items-center justify-between">
         <div class="flex items-center gap-4">
            <div
               class="relative size-16 flex items-center justify-center bg-base-200 rounded-md border"
            >
               <img
                  class="h-full"
                  src="/assets/products/${product.thumbnail}/${product.thumbnail}1.webp"
                  alt="${product.thumbnail}1"
               />
               <span
                  class="absolute -top-3 -right-3 bg-black/50 rounded-full text-white size-6 flex items-center justify-center"
                  >${item.quantity}</span
               >
            </div>
            <p class="uppercase">${product.name}</p>
         </div>
         <div>
            <span>${formatNumber(product.price)}.00 THB</span>
         </div>
      </div>
   `
   mobileBagListItemElement.innerHTML += /*html*/ `
      <div class="flex items-center justify-between">
         <div class="flex items-center gap-4">
            <div
               class="relative size-16 flex items-center justify-center bg-base-200 rounded-md border"
            >
               <img
                  class="h-full"
                  src="/assets/products/${product.thumbnail}/${product.thumbnail}1.webp"
                  alt="${product.thumbnail}1"
               />
               <span
                  class="absolute -top-3 -right-3 bg-black/50 rounded-full text-white size-6 flex items-center justify-center"
                  >${item.quantity}</span
               >
            </div>
            <p class="uppercase">${product.name}</p>
         </div>
         <div>
            <span>${formatNumber(product.price)}.00 THB</span>
         </div>
      </div>
   `
})

couponBtn.disabled = true
mobileCouponBtn.disabled = true

couponInput.addEventListener('change', () => {
   if (couponInput.value === '') {
      couponBtn.disabled = true
   } else {
      couponBtn.disabled = false
   }
})

mobileCouponInput.addEventListener('change', () => {
   if (mobileCouponInput.value === '') {
      mobileCouponBtn.disabled = true
   } else {
      mobileCouponBtn.disabled = false
   }
})
