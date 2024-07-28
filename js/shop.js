import { biotech, formulated, numbers } from '/data/ads.js'
import { bundle, products } from '/data/products/products.js'

const allProduct = [products[0], products[1], biotech, numbers, products[2], bundle, formulated]

const shop = document.getElementById('shop')

allProduct.forEach((product, index) => {
  shop.innerHTML += /*html*/ `
    <article
          data-aos="fade-left"
          data-aos-delay="${100 + index * 100}"
          class=" bg-white w-full rounded-md h-[35rem] flex card relative group 
          ${
            index === 2 || index === 3 || index === 6
              ? `${index === 2 && 'lg:col-span-1'} hidden md:block col-span-2`
              : ''
          }"
        >
        ${
          product.thumbnail
            ? /*html*/ `
          <div
            style="background-image: url(/assets/products/${product.thumbnail}/${
                product.thumbnail
              }2.webp)"
            class="absolute opacity-0 text-secondary-content bg-center bg-cover inset-0 p-5 rounded-md group-hover:opacity-100 flex flex-col justify-between duration-300
            before:content-[''] before:absolute before:inset-0 before:z-[1] before:bg-accent-content/30
            "
          >
            <a href="/pages/product/${
              product.path
            }.html" class="text-sm uppercase h-full w-full z-20">
              ${
                product.size
                  ? `<div class="flex items-center justify-between z-20">
                    <p>size</p>
                    <p>${product.size.short}</p>
                  </div>`
                  : ''
              }
            </a>
            <div class="z-10">
              <button class="btn btn-primary w-full font-inter z-20">ADD TO BAG</button>
              <p class="mt-2">${product.subName}</p>
              <div class="font-medium card-title flex items-center justify-between w-full">
                <h2 class="uppercase">${product.name}</h2>
                <p class="text-end">$ ${product.price}</p>
              </div>
            </div>
          </div>
          <figure class="h-[25rem] overflow-hidden">
            <img
              src="/assets/products/${product.thumbnail}/${product.thumbnail}1.webp"
              alt="name"
              class="h-[30rem] mt-10 object-cover object-center"
            />
          </figure>
          <div class="card-body">
            <div>
              <p class="text-[#757575]">${product.subName}</p>
              <div class="font-medium card-title flex items-center justify-between w-full">
                <h2 class="uppercase">${product.name}</h2>
                <p class="text-end">$ ${product.price}</p>
              </div>
            </div>
            <div class="card-actions items-center justify-start gap-0 [&_img]:w-4">
              <img src="/assets/star.png" alt="star" />
              <img src="/assets/star.png" alt="star" />
              <img src="/assets/star.png" alt="star" />
              <img src="/assets/star.png" alt="star" />
              <img src="/assets/star.png" alt="star" />
              <span class="ml-2">(${product.rating})</span>
            </div>
          </div>`
            : /*html*/ `
        <div style="background-image: url(/assets/ads/${product.bg})"
        class="w-full h-full bg-center bg-cover rounded-md flex flex-col justify-between
          ${index === 3 || index === 6 ? 'p-14' : 'p-4'}
          ${index === 2 || index === 6 ? 'text-primary-content' : 'text-secondary-content'}
          ">
          <div class="text-7xl font-inter uppercase font-medium overflow-hidden">
            ${product.name ? `<div>${product.name}</div>` : ''}
            ${product.name2 ? `<div>${product.name2}</div>` : ''}
            ${product.name3 ? `<div>${product.name3}</div>` : ''}
          </div>
          <div class="w-full text-end">
            ${
              product.text
                ? `<div class="${index === 3 ? 'text-5xl' : 'text-lg'}">${product.text}</div>`
                : ''
            }
            ${product.text2 ? `<div class="text-2xl w-2/3 ml-auto">${product.text2}</div>` : ''}
            ${product.text3 ? `<div class="mt-6">${product.text3}</div>` : ''}
          </div>
      </div>
      `
        }
        </article>
  `
})
