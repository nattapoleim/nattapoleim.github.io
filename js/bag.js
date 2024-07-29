import { bundle, products } from '/data/products/products.js'

const allProduct = [...products, bundle]

const bagsQuantity = document.querySelectorAll('.bag-quantity')
const addButtons = document.querySelectorAll('.add-to-bag')
const navList = document.getElementById('nav-list')

let bagList = []

// update bag quantities
const updateBagQuantity = () => {
  const total = bagList.reduce((total, item) => total + item.quantity, 0)

  bagsQuantity.forEach(bag => {
    bag.innerHTML = total
  })
}

// check bag in localstorage
if (localStorage.getItem('bag')) {
  bagList = JSON.parse(localStorage.getItem('bag'))
  updateBagQuantity()
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
    bagList.push({ name: product, quantity: parseInt(quantity) })
  }

  localStorage.setItem('bag', JSON.stringify(bagList))
  updateBagQuantity()
}

// set 'click' for all button
addButtons.forEach(button => {
  button.addEventListener('click', event => {
    const quantity = event.target.dataset.quantity
    const product = event.target.dataset.product

    addToBagHandler(product, quantity)
  })
})

// render bag list
bagList.forEach((item, index) => {
  const productIndex = allProduct.findIndex(p => p.thumbnail === item.name)

  const product = allProduct[productIndex]

  navList.innerHTML += /*html*/ `
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
      <div class="flex-1 h-full flex flex-col items-start justify-between">
        <div>
          <div class="text-sm">${product.subName}</div>
          <div class="text-2xl">${product.name}</div>
        </div>
        <div class="flex items-center gap-5">
          <div
            class="bg-base-100 py-2 px-4 rounded-md border border-accent-content w-2/4 flex items-center justify-center"
          >
            <button id="${product.thumbnail}-decrease">-</button>
            <input
              type="number"
              id="${product.thumbnail}-quantity"
              value="${item.quantity}"
              class="text-center input input-sm w-full bg-transparent felx items-center justify-center focus:outline-none focus:border-none disabled:bg-base-100 disabled:border-none disabled:text-accent-content disabled:cursor-default"
              disabled
            />
            <button id="${product.thumbnail}-increase">+</button>
          </div>
          <button id="${product.thumbnail}-remove">remove</button>
        </div>
      </div>
      <div class="w-1/4 text-xl h-full text-end">$ ${product.price}</div>
    </div>
  `
})

const updateQuantityInBag = (productId, newQuantity) => {
  const index = bagList.findIndex(item => item.name === productId)
  if (index !== -1) {
    bagList[index].quantity = newQuantity
    localStorage.setItem('bag', JSON.stringify(bagList))
    updateBagQuantity()
  }
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
  // ลบ element ของสินค้านี้ออกจาก DOM
  const productElement = document.getElementById(`${productId}-container`)
  if (productElement) {
    productElement.remove()
  }
}

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
