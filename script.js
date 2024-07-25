// init carousel after htmx get element
setTimeout(function () {
  initCarousel()
}, 500)

// carousel
function initCarousel() {
  const carousel = document.getElementById('carousel')

  const slides = Array.from(carousel.children)
  const totalSlides = slides.length
  let currentSlide = 0

  const nextButton = document.getElementById('nextButton')
  const prevButton = document.getElementById('prevButton')

  if (!nextButton || !prevButton) {
    console.error('Navigation elements not found')
    return
  }

  function updateCarousel() {
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`
    console.log('update')
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides
    console.log('next')
    updateCarousel()
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
    console.log('prev')
    updateCarousel()
  }

  nextButton.addEventListener('click', nextSlide)
  prevButton.addEventListener('click', prevSlide)
}
