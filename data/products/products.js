export const products = [
  {
    thumbnail: 'serum',
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
    thumbnail: 'cleanser',
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
    thumbnail: 'face',
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

export const bundle = {
  thumbnail: 'bundle',
  name: 'bundle',
  subName: 'skin-fortifying',
  rating: 273,
  price: 125,
  desc: {
    short:
      'The first-of-its-kind preventative product lineup to target the five signs of inflammaging with biotech-derived, clinically-proven ingredients while remaining gentle enough for all skin types.',
    second:
      'The <strong>purifying whipped cleanser</strong> is a light and airy facial cleanser that lathers into a microfoam while removing impurities from skin.',
    third:
      'Our lightweight, milky <strong>skin-strengthening serum</strong> targets the signs of inflammaging while boosting skin’s vitality.',
    forth:
      'The <strong>moisture-locking face stick</strong> is a take-anywhere-apply-anytime ally for healthy, nourished skin. ',
  },
  badge: ['moisturize', 'soothe', 'comfort', 'boost'],
}
