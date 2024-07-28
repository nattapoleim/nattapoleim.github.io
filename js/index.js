import { products } from '/data/products/products.js'

const cardDesktop = document.getElementById('cardDesktop')
const cardMobile = document.getElementById('cardMobile')

products.forEach((product, index) => {
  cardDesktop.innerHTML += /*html*/ `
  <div
      data-aos="fade-left"
      data-aos-delay="${600 + index * 100}"
      class="flex card relative bg-white md:w-[20rem] rounded-md group"
    >
      <div
        style="background-image: url(/assets/products/${product.thumbnail}/${
    product.thumbnail
  }2.webp)"
        class="absolute opacity-0 text-secondary-content bg-center bg-cover inset-0 p-5 rounded-md group-hover:opacity-100 flex flex-col justify-between duration-300
            before:content-[''] before:absolute before:inset-0 before:z-[1] before:bg-accent-content/30"
      >

        <a href="" class="text-sm uppercase h-full w-full z-20">
            <div class="flex items-center justify-between z-20">
              <p>size</p>
              <p>${product.size.short}</p>
            </div>
        </a>
        <div class="z-10">
          <button class="btn btn-primary w-full font-inter">ADD TO BAG</button>
          <p class="mt-2">${product.subName}</p>
          <div class="font-medium card-title flex items-center justify-between w-full">
            <h2 class="uppercase">${product.name}</h2>
            <p class="text-end">$ ${product.price}</p>
          </div>
        </div>
      </div>
      <figure class="h-[15rem] overflow-hidden">
        <img
          src="/assets/products/${product.thumbnail}/${product.thumbnail}1.webp"
          alt="${product.name}"
          class="h-[20rem] mt-10 object-cover object-center"
        />
      </figure>
      <div class="card-body">
        <p class="text-[#757575]">${product.subName}</p>
        <div class="font-medium card-title flex items-center justify-between w-full">
          <h2 class="uppercase">${product.name}</h2>
          <p class="text-end">$ ${product.price}</p>
        </div>
        <div class="card-actions items-center justify-start gap-0 [&_img]:w-4">
          <img src="./assets/star.png" alt="star" />
          <img src="./assets/star.png" alt="star" />
          <img src="./assets/star.png" alt="star" />
          <img src="./assets/star.png" alt="star" />
          <img src="./assets/star.png" alt="star" />
          <span class="ml-2">(${product.rating})</span>
        </div>
      </div>
    </div>
  `

  cardMobile.innerHTML += /* html */ `
  <div
    data-aos="fade-left"
    data-aos-delay="${600 + index * 100}" 
    class="ml-10 shrink-0 card relative bg-white rounded-md w-[80vw]">
      <figure class="h-[22rem] overflow-hidden">
        <img
          src="/assets/products/${product.thumbnail}/${product.thumbnail}1.webp"
          alt="${product.name}"
          class="h-[33rem] mt-10 object-cover object-center"
        />
      </figure>
      <div class="card-body">
        <p class="text-[#757575]">${product.subName}</p>
        <div class="font-medium card-title flex items-center justify-between w-full">
          <h2 class="uppercase">${product.name}</h2>
          <p class="text-end">$ ${product.price}</p>
        </div>
        <div class="card-actions items-center justify-start gap-0 [&_img]:w-4">
          <img src="./assets/star.png" alt="star" />
          <img src="./assets/star.png" alt="star" />
          <img src="./assets/star.png" alt="star" />
          <img src="./assets/star.png" alt="star" />
          <img src="./assets/star.png" alt="star" />
          <span class="ml-2">(${product.rating})</span>
        </div>
        <button class="btn btn-primary w-full mt-4">ADD TO BAG</button>
      </div>
    </div>
  `
})
