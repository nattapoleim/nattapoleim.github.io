import { bundle, products } from '/data/products/products.js'

const currentProducts = [...products, bundle]

const content = document.getElementById('content')

const pathname = window.location.pathname.split('/')
const currentPath = pathname[pathname.length - 1].split('.')[0]

currentProducts.forEach((product, index) => {
  if (currentPath === product.path) {
    content.innerHTML = /*html*/ `
      <div  class="h-screen w-screen flex">
        <!-- PRODUCT IMAGES -->
        <div class="relative w-1/2 h-full">
          <img
            id="displayImg"
            class="object-center w-full h-full object-cover"
            src="/assets/products/${product.name}/${product.name}1.webp" 
            alt="${product.name}">
            
          <!-- IMAGES LIST -->
          <div id="imgList" class="absolute flex flex-col items-center justify-center gap-2 top-[12rem] -right-[2.5rem]">
          </div>
        </div>

        

        <!-- PRODUCT DETAIL -->
        <div class="w-1/2 pt-24 px-20 h-full bg-secondary/20">
          <div class="flex flex-col items-start justify-center font-courier gap-4 px-10">
            <div class="flex w-full items-end justify-between">
              <div class="overflow-hidden">
                <p>${product.subName}</p>
                <h4 class="text-4xl">${product.name}</h4>
              </div>
              <div class="overflow-hidden">
                <p class="text-xl lg:text-2xl">
                  <span>$ ${product.price}</span>
                  ${
                    product.normalPrice
                      ? '<span class="line-through text-base-300">$156</span>'
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
              <p>
                ${product.desc.short}
              </p>
            </div>
            <div class="overflow-hidden hidden lg:block"><p>${
              product.desc.full || product.desc.second
            }</p></div>
            ${
              product.desc.third
                ? /*html*/ `
                <div class="overflow-hidden hidden lg:block">
                  <p>${product.desc.third}</p>
                </div>
                <div class="overflow-hidden hidden lg:block">
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

            <div id="badges" class="flex items-center gap-2"></div>
            
            <div class="overflow-hidden w-full flex items-center gap-4 mt-14">
              <div class="bg-base-100 py-2 px-4 rounded-md border border-accent-content w-1/4 flex items-center justify-center">
                <button id="decrease">-</button>
                <input type="number" id="quantity" name="quantity" value="1" class="text-center input w-full bg-transparent felx items-center justify-center focus:outline-none focus:border-none disabled:bg-base-100 disabled:border-none disabled:text-accent-content disabled:cursor-default" disabled/>
                <button id="increase">+</button>
              </div>
              <button class="btn btn-secondary btn-lg flex-1">
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

const quantity = document.getElementById('quantity')

const increament = () => {
  quantity.value = parseInt(quantity.value) + 1
}
const decreament = () => {
  if (quantity.value != 1) {
    quantity.value = parseInt(quantity.value) - 1
  }
}

document.getElementById('increase').addEventListener('click', increament)
document.getElementById('decrease').addEventListener('click', decreament)
