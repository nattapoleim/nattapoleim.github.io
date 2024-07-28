import { bundle, products } from '/data/products/products.js'

const currentProducts = [...products, bundle]

const content = document.getElementById('content')

const pathname = window.location.pathname.split('/')
const currentPath = pathname[pathname.length - 1].split('.')[0]

currentProducts.forEach((product, index) => {
  if (currentPath === product.path) {
    content.innerHTML = /*html*/ `
      <div  class="h-screen w-screen flex">
        <div class="w-1/2 pt-24 h-full">
          <img
            class="object-center w-full h-full object-cover"
            src="/assets/products/${product.name}/${product.name}1.webp" 
            alt="${product.name}">
        </div>
        <div class="w-1/2 pt-24 px-20 h-full bg-secondary/20">
          <div class="flex flex-col items-start justify-center font-courier space-y-4 px-10">
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
            
            <div class="overflow-hidden w-full flex items-center gap-4">
              <div class="">
                <button>-</button>
                <input type="number" />
                <button>+</button>
              </div>
              <button class="btn btn-secondary btn-lg flex-1">
                ADD TO BAG
              </button>
            </div>
          </div>
        </div>
      </div>
    `
  }
})
