const products = [
  {
    tumbnail: 'serum',
    name: 'serum',
    subName: 'skin-strengthening',
    rating: 89,
    price: 88,
    desc: {
      short:
        'Target all 5 signs of inflammaging with this vitality-boosting <strong>skin-strengthening serum.</strong> ',
      full: 'This lightweight, milky serum is clinically proven to reduce the appearance of fine lines, improve elasticity and moisture levels, and improve the appearance of uneven skin tone. The result? 100% of clinical participants experienced healthier, more supple skin in just 4 weeks. ',
    },
    size: { full: '1 fl oz / 30ml', short: '30ml' },
    badge: ['strengthen', 'protect', 'smooth', 'revitalize'],
  },

  {
    tumbnail: 'cleanser',
    name: 'cleanser',
    subName: 'purifying whipped',
    rating: 84,
    price: 32,
    desc: {
      short:
        "The <strong>purifying whipped cleanser</strong> is a mymicrobiome certified, pH-friendly formulation that gently removes impurities and dirt while maintaining your skin's barrier health.  ",
      full: 'A lush (gel-free) microfoam ideal for all skin (even sensitive skin types), this formulation has ample cushion to wash away pollutants while maintaining the moisture barrier and leaving skin soft and smooth. ',
    },
    size: { full: '5.1 fl oz / 150mL', short: '150ml' },
    badge: ['refresh', 'cleanse', 'balance', 'soften'],
  },
  {
    tumbnail: 'face',
    name: 'face stick',
    subName: 'moisture-locking',
    rating: 89,
    price: 36,
    desc: {
      short: 'A take-anywhere-apply-anytime ally for healthy skin.    ',
      full: 'Lightweight and nourishing, this compact face balm glides effortlessly across skin to lock in essential moisture while helping protect against damage from daily environmental stressors, like pollution. With potent ingredients like biotech-derived Naringenin and skin-identical lipids like ceramides and squalane, the face stick is clinically proven to boost moisture instantly and over time and reduce redness for smoother, more comforted skin.',
    },
    size: { full: '10g', short: '10g' },
    badge: ['moisturize', 'soothe', 'comfort', 'boost'],
  },
]

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
          src="/assets/products/${product.tumbnail}/${product.tumbnail}1.webp"
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
