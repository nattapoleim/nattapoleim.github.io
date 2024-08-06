import { bundle, products } from '/data/products/products.js'
import formatNumber from '/js/formatNumber.js'

const currentProducts = [...products, bundle]

const content = document.getElementById('content')

const pathname = window.location.pathname.split('/')
const currentPath = pathname[pathname.length - 1].split('.')[0]

currentProducts.forEach((product, index) => {
   if (currentPath === product.path) {
      content.innerHTML = /*html*/ `
      <div  class="md:h-screen bg-secondary/40 w-screen flex md:flex-row flex-col">
        <!-- PRODUCT IMAGES -->
        <div class="relative h-[35rem] p-5 sm:p-10 md:p-0 md:mt-0 mt-10 w-full md:w-1/2 md:h-full">
          <img
            id="displayImg"
            class="object-center w-full h-full object-cover rounded-md md:rounded-none"
            src="/assets/products/${product.name}/${product.name}1.webp" 
            alt="${product.name}">
            
          <!-- IMAGES LIST -->
          <div id="imgList" class="absolute md:w-fit mt-5 md:mt-0 flex md:flex-col items-center justify-center gap-2 md:top-[12rem] md:-right-[2.5rem]">
          </div>
        </div>

        

        <!-- PRODUCT DETAIL -->
        <div class="w-full md:w-1/2 pb-24 md:pb-0 pt-28 md:pt-24 h-full bg-secondary/20">
          <div class="flex flex-col w-full md:w-[90%] mx-auto items-start justify-center font-courier gap-4 px-5 sm:px-10">
            <div class="flex w-full items-end justify-between">
              <div class="overflow-hidden">
                <p class="font-athiti">${product.subName}</p>
                <h4 class="text-4xl uppercase">${product.name}</h4>
              </div>
              <div class="overflow-hidden">
                <p class="text-xl lg:text-2xl">
                  <span>THB ${formatNumber(product.price)}</span>
                  ${
                     product.normalPrice
                        ? '<span class="line-through text-black/20">4,990</span>'
                        : ''
                  }
                  
                </p>
              </div>
            </div>
            <div
              class="card-actions items-center justify-start gap-0 [&_img]:w-4"
            >
              <img src="/assets/star.png" alt="star" />
              <img src="/assets/star.png" alt="star" />
              <img src="/assets/star.png" alt="star" />
              <img src="/assets/star.png" alt="star" />
              <img src="/assets/star.png" alt="star" />
              <span class="ml-2">(${product.rating})</span>
            </div>
            <div class="overflow-hidden">
              <p class="font-athiti font-medium">
                ${product.desc.short}
              </p>
            </div>
            <div class="overflow-hidden block md:hidden lg:block">
               <p class="font-athiti font-medium">${product.desc.full || product.desc.second}</p>
            </div>
            ${
               product.desc.third
                  ? /*html*/ `
                <div class="overflow-hidden block md:hidden lg:block">
                  <p>${product.desc.third}</p>
                </div>
                <div class="overflow-hidden block md:hidden lg:block">
                  <p>${product.desc.forth}</p>
                </div>
              `
                  : ''
            }

            ${
               product.size
                  ? /*html*/ `
                  <div>
                    <p>Size: ${product.size.full}</p>
                  </div>
                  `
                  : ''
            }

            <div id="badges" class="flex items-center flex-wrap gap-2 font-athiti font-medium"></div>
            
            <div class="overflow-hidden w-full flex items-center gap-4 mt-14">
              <div class="bg-base-100 py-2 px-4 rounded-md border border-accent-content w-1/4 flex items-center justify-center">
                <button id="decrease">-</button>
                <input type="number" id="product-quantity" value="1" class="text-center input w-full bg-transparent flex items-center justify-center focus:outline-none focus:border-none disabled:bg-base-100 disabled:border-none disabled:text-accent-content disabled:cursor-default" disabled/>
                <button id="increase">+</button>
              </div>
              <button
                data-product="${product.thumbnail}"
                id="product-add-to-bag" class="btn btn-secondary btn-lg flex-1">
                  ADD TO BAG
              </button>
            </div>
          </div>
        </div>
      </div>
    `

      // badge
      product.badge.forEach(item => {
         document.getElementById('badges').innerHTML += /*html*/ `
      <div class="badge badge-primary">${item}</div>
    `
      })

      // image list
      for (let i = 0; i < product.imgList; i++) {
         document.getElementById('imgList').innerHTML += /*html*/ `
        <img
          class="image size-16 rounded-md cursor-pointer object-cover"
          src="/assets/products/${product.thumbnail}/${product.thumbnail}${i + 1}.webp"
          alt="${product.name}"
          data-index="${i + 1}"
          data-product="${product.thumbnail}"
          >
      `
      }
   }
})

const imgList = document.getElementById('imgList')
imgList.addEventListener('click', event => {
   if (event.target.tagName === 'IMG') {
      const index = event.target.dataset.index
      const product = event.target.dataset.product
      imageHandler(product, index)
   }
})

const imageHandler = (product, index) => {
   document.getElementById('displayImg').src = `/assets/products/${product}/${product}${index}.webp`
}

const productQuantity = document.getElementById('product-quantity')
const addButtonElement = document.getElementById('product-add-to-bag')

const increament = () => {
   productQuantity.value = parseInt(productQuantity.value) + 1
}
const decreament = () => {
   if (productQuantity.value != 1) {
      productQuantity.value = parseInt(productQuantity.value) - 1
   }
}

document.getElementById('increase').addEventListener('click', increament)
document.getElementById('decrease').addEventListener('click', decreament)

let productBagList = []

// check bag in localstorage
if (localStorage.getItem('bag')) {
   productBagList = JSON.parse(localStorage.getItem('bag'))
} else {
   localStorage.setItem('bag', JSON.stringify(productBagList))
}

// add to bag
const productAddToBagHandler = (product, quantity) => {
   const existProductIndex = productBagList.findIndex(item => item.name === product)

   // check exist product in bag
   if (existProductIndex !== -1) {
      productBagList[existProductIndex].quantity += parseInt(quantity)
   } else {
      productBagList.push({
         name: product,
         quantity: parseInt(quantity),
      })
   }

   localStorage.setItem('bag', JSON.stringify(productBagList))
   window.location.reload()
}

addButtonElement.addEventListener('click', event => {
   const product = event.target.dataset.product

   productAddToBagHandler(product, productQuantity.value)
})
