import { bundle, products } from '/data/products/products.js'
import formatNumber from '/js/formatNumber.js'

const allProduct = [...products, bundle]

const bagsQuantityElements = document.querySelectorAll('.bag-quantity')
const addButtonsElements = document.querySelectorAll('.add-to-bag')
const bagItemListElement = document.getElementById('bag-item-list')
const balanceElement = document.getElementById('bag-balance')

let bagList = []
let balance = 0

// update bag quantities
const updateBagQuantity = () => {
   const total = bagList.reduce((total, item) => total + item.quantity, 0)

   bagsQuantityElements.forEach(bag => {
      bag.innerHTML = total
   })
}

// calc balance
const calculateTotalBalance = () => {
   return bagList.reduce((total, item) => {
      const product = allProduct.find(p => p.thumbnail === item.name)
      return total + product.price * item.quantity
   }, 0)
}

// update balance
const updateBalance = () => {
   balance = calculateTotalBalance()
   balanceElement.innerHTML = `THB ${formatNumber(balance)}`
}

const increament = productId => {
   const quantityInput = document.getElementById(`${productId}-quantity`)
   const newQuantity = parseInt(quantityInput.value) + 1
   quantityInput.value = newQuantity
   updateQuantityInBag(productId, newQuantity)
}

const decreament = productId => {
   const quantityInput = document.getElementById(`${productId}-quantity`)
   if (parseInt(quantityInput.value) > 1) {
      const newQuantity = parseInt(quantityInput.value) - 1
      quantityInput.value = newQuantity
      updateQuantityInBag(productId, newQuantity)
   }
}

const removeFromBag = productId => {
   bagList = bagList.filter(item => item.name !== productId)
   localStorage.setItem('bag', JSON.stringify(bagList))
   updateBagQuantity()
   updateBalance()

   // remove element from dom
   const productElement = document.getElementById(`${productId}-container`)
   if (productElement) {
      productElement.remove()
   }
}

// add function for buttons
const setEventButtons = () => {
   bagList.forEach(item => {
      const productId = item.name

      const increaseButton = document.getElementById(`${productId}-increase`)
      const decreaseButton = document.getElementById(`${productId}-decrease`)
      const removeButton = document.getElementById(`${productId}-remove`)

      if (increaseButton) {
         increaseButton.addEventListener('click', () => increament(productId))
      }

      if (decreaseButton) {
         decreaseButton.addEventListener('click', () => decreament(productId))
      }

      if (removeButton) {
         removeButton.addEventListener('click', () => removeFromBag(productId))
      }
   })
}

// render bag list
const renderList = () => {
   bagItemListElement.innerHTML = ''

   bagList.forEach(item => {
      const productIndex = allProduct.findIndex(p => p.thumbnail === item.name)

      const product = allProduct[productIndex]

      bagItemListElement.innerHTML += /*html*/ `
         <div
            id="${product.thumbnail}-container"
            class="h-[10rem] px-8 py-5 flex items-center justify-between w-full gap-5 border-b border-base-300"
         >
            <div class="w-[6rem] overflow-hidden h-full">
            <img
               class="w-full object-cover object-center"
               src="/assets/products/${product.thumbnail}/${product.thumbnail}1.webp"
               alt="serum"
            />
            </div>
            <div class="w-full flex flex-col items-start justify-between h-full">
            <div class="flex-1 h-full w-full flex items-center justify-between">
               <div>
                  <div class="text-sm">${product.subName}</div>
                  <div class="text-2xl">${product.name}</div>
               </div>
               <div class="text-xl h-full text-end"><span class="text-xs">THB</span> ${formatNumber(
                  product.price,
               )}</div>
            </div>

            <div class="flex w-full items-center gap-5">
               <div
                  class="bg-base-100 py-2 px-4 rounded-md border border-accent-content w-1/2 sm:w-1/4 md:w-1/2 flex items-center justify-center"
               >
                  <button id="${product.thumbnail}-decrease">-</button>
                  <input
                  type="number"
                  id="${product.thumbnail}-quantity"
                  value="${item.quantity}"
                  class="text-center input input-sm w-full bg-transparent flex items-center justify-center focus:outline-none focus:border-none disabled:bg-base-100 disabled:border-none disabled:text-accent-content disabled:cursor-default"
                  disabled
                  />
                  <button id="${product.thumbnail}-increase">+</button>
               </div>
               <button id="${product.thumbnail}-remove">ลบ</button>
            </div>
            </div>
         </div>
  `
   })
   setEventButtons()
   updateBalance()
}

// check bag in localstorage
if (localStorage.getItem('bag')) {
   bagList = JSON.parse(localStorage.getItem('bag'))
   updateBagQuantity()
   renderList()
} else {
   localStorage.setItem('bag', JSON.stringify(bagList))
}

// add to bag
const addToBagHandler = (product, quantity) => {
   const existProductIndex = bagList.findIndex(item => item.name === product)

   // check exist product in bag
   if (existProductIndex !== -1) {
      bagList[existProductIndex].quantity += parseInt(quantity)
   } else {
      bagList.push({
         name: product,
         quantity: parseInt(quantity),
      })
   }

   localStorage.setItem('bag', JSON.stringify(bagList))
   updateBagQuantity()
   renderList()
   updateBalance()
}

// set 'click' for all button
addButtonsElements.forEach(button => {
   button.addEventListener('click', event => {
      const quantity = event.target.dataset.quantity
      const product = event.target.dataset.product

      addToBagHandler(product, quantity)
   })
})

// update quantities
const updateQuantityInBag = (productId, newQuantity) => {
   const index = bagList.findIndex(item => item.name === productId)
   if (index !== -1) {
      bagList[index].quantity = newQuantity
      localStorage.setItem('bag', JSON.stringify(bagList))
      updateBagQuantity()
      updateBalance()
   }
}
