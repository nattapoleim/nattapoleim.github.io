import { products } from './data/products/products.js'

const cardDesktop = document.getElementById('cardDesktop')

products.forEach((product, index) => {
  cardDesktop.innerHTML += /* html */ `
  <div
      data-aos="fade-left"
      data-aos-delay="${600 + index * 100}"
      class="flex card relative bg-white md:w-[20rem] rounded-md group"
    >
      <div
        style="background-image: url(/assets/products/${product.tumbnail}/${
    product.tumbnail
  }1.webp)"
        class="absolute opacity-0 bg-center inset-0 p-5 bg-contain rounded-md group-hover:opacity-100 flex flex-col justify-between duration-300"
      >
        <div class="text-sm uppercase">
          <div class="flex items-center justify-between">
            <p>size</p>
            <p>${product.size.short}</p>
          </div>
          <!-- <div class="flex items-center justify-between">
            <p>percent bio-based</p>
            <p>93</p>
          </div>
          <div class="flex items-center justify-between">
            <p>biotech actives</p>
            <p>8</p>
          </div> -->
        </div>
        <div>
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
          src="/assets/products/serum/serum1.webp"
          alt="serum"
          class="h-[20rem] object-cover"
        />
      </figure>
      <div class="card-body">
        <p class="text-[#757575]">${product.subName}</p>
        <div class="font-medium card-title flex items-center justify-between w-full">
          <h2 class="uppercase">${product.name}</h2>
          <p class="text-end">$ ${product.price}8</p>
        </div>
        <div class="card-actions items-center justify-start gap-0 [&_img]:w-4">
          <img src="/assets/star.png" alt="star" />
          <img src="/assets/star.png" alt="star" />
          <img src="/assets/star.png" alt="star" />
          <img src="/assets/star.png" alt="star" />
          <img src="/assets/star.png" alt="star" />
          <span class="ml-2">(${product.rating})</span>
        </div>
      </div>
    </div>
  `
})

// // init carousel after htmx get element
// setTimeout(function () {
//   initCarousel()
// }, 500)

// // carousel
// function initCarousel() {
//   const carousel = document.getElementById('carousel')

//   const slides = Array.from(carousel.children)
//   const totalSlides = slides.length
//   let currentSlide = 0

//   const nextButton = document.getElementById('nextButton')
//   const prevButton = document.getElementById('prevButton')

//   if (!nextButton || !prevButton) {
//     console.error('Navigation elements not found')
//     return
//   }

//   function updateCarousel() {
//     carousel.style.transform = `translateX(-${currentSlide * 100}%)`
//     console.log('update')
//   }

//   function nextSlide() {
//     currentSlide = (currentSlide + 1) % totalSlides
//     console.log('next')
//     updateCarousel()
//   }

//   function prevSlide() {
//     currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
//     console.log('prev')
//     updateCarousel()
//   }

//   nextButton.addEventListener('click', nextSlide)
//   prevButton.addEventListener('click', prevSlide)
// }
