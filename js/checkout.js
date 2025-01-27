import { bundle, products } from '/data/products/products.js'
import formatNumber from '/js/formatNumber.js'

const allProduct = [...products, bundle]

const bagListItemElement = document.querySelector('#bag-list-item')
const totalElement = document.querySelector('#total')
const couponInput = document.querySelector('#coupon-input')
const couponBtn = document.querySelector('#coupon-btn')
const mobileBagListItemElement = document.querySelector('#mobile-bag-list-item')
const mobileTotalElement = document.querySelector('#mobile-total')
const mobileSummaryTotalElement = document.querySelector('#mobile-summary-total')
const mobileCouponInput = document.querySelector('#mobile-coupon-input')
const mobileCouponBtn = document.querySelector('#mobile-coupon-btn')

// checkout
const checkoutElement = document.querySelector('#checkout-side')
const checkoutForm = document.querySelector('#checkout-form')

let bagList = []
let balance = 0

if (localStorage.getItem('bag')) {
   bagList = JSON.parse(localStorage.getItem('bag'))
} else {
   localStorage.setItem('bag', JSON.stringify(bagList))
}

const calculateTotalBalance = () => {
   return bagList.reduce((total, item) => {
      const product = allProduct.find(p => p.thumbnail === item.name)
      return total + product.price * item.quantity
   }, 0)
}

const updateBalance = () => {
   balance = calculateTotalBalance()
   totalElement.innerHTML = `<span class="text-sm text-base-300">THB</span> ${formatNumber(
      balance,
   )}.00`
   mobileTotalElement.innerHTML = `<span class="text-sm text-base-300">THB</span> ${formatNumber(
      balance,
   )}.00`
   mobileSummaryTotalElement.innerHTML = `<span class="text-sm text-base-300">THB</span> ${formatNumber(
      balance,
   )}.00`
}

updateBalance()

bagList.forEach(item => {
   const productIndex = allProduct.findIndex(p => p.thumbnail === item.name)

   const product = allProduct[productIndex]

   bagListItemElement.innerHTML += /*html*/ `
      <div class="flex items-center justify-between">
         <div class="flex items-center gap-4">
            <div
               class="relative size-16 flex items-center justify-center bg-base-200 rounded-md border"
            >
               <img
                  class="h-full"
                  src="/assets/products/${product.thumbnail}/${product.thumbnail}1.webp"
                  alt="${product.thumbnail}1"
               />
               <span
                  class="absolute -top-3 -right-3 bg-black/50 rounded-full text-white size-6 flex items-center justify-center"
                  >${item.quantity}</span
               >
            </div>
            <p class="uppercase">${product.name}</p>
         </div>
         <div>
            <span>${formatNumber(product.price)}.00 THB</span>
         </div>
      </div>
   `
   mobileBagListItemElement.innerHTML += /*html*/ `
      <div class="flex items-center justify-between">
         <div class="flex items-center gap-4">
            <div
               class="relative size-16 flex items-center justify-center bg-base-200 rounded-md border"
            >
               <img
                  class="h-full"
                  src="/assets/products/${product.thumbnail}/${product.thumbnail}1.webp"
                  alt="${product.thumbnail}1"
               />
               <span
                  class="absolute -top-3 -right-3 bg-black/50 rounded-full text-white size-6 flex items-center justify-center"
                  >${item.quantity}</span
               >
            </div>
            <p class="uppercase">${product.name}</p>
         </div>
         <div>
            <span>${formatNumber(product.price)}.00 THB</span>
         </div>
      </div>
   `
})

couponBtn.disabled = true
mobileCouponBtn.disabled = true

couponInput.addEventListener('change', () => {
   if (couponInput.value === '') {
      couponBtn.disabled = true
   } else {
      couponBtn.disabled = false
   }
})

mobileCouponInput.addEventListener('change', () => {
   if (mobileCouponInput.value === '') {
      mobileCouponBtn.disabled = true
   } else {
      mobileCouponBtn.disabled = false
   }
})

const email = document.getElementById('email')
const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const address = document.getElementById('address')
const district = document.getElementById('district')
const subDistrict = document.getElementById('subDistrict')
const state = document.getElementById('state')
const zipCode = document.getElementById('zipCode')
const option = document.getElementById('option')
const phone = document.getElementById('phone')

let infomation = JSON.parse(localStorage.getItem('infomation')) || ''

if (infomation !== '') {
   email.value = infomation.email
   firstName.value = infomation.firstName
   lastName.value = infomation.lastName
   address.value = infomation.address
   district.value = infomation.district
   subDistrict.value = infomation.subDistrict
   state.value = infomation.state
   zipCode.value = infomation.zipCode
   option.value = infomation.option
   phone.value = infomation.phone
}

checkoutForm.addEventListener('submit', e => {
   e.preventDefault()

   infomation = {
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      district: district.value,
      subDistrict: subDistrict.value,
      state: state.value,
      zipCode: zipCode.value,
      option: option.value,
      phone: phone.value,
   }

   localStorage.setItem('infomation', JSON.stringify(infomation))

   if (infomation !== '') {
      checkoutElement.innerHTML = /*html*/ `
      <div class="ml-auto lg:w-4/5 xl:w-3/4 flex flex-col items-start p-8">
         <a
            class="hidden md:block mb-4"
            href="/index.html"
         >
            <svg width="100" height="22" viewBox="0 0 110 25" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M78.3339 0.615807C76.7785 0.560622 75.2193 0.605775 73.6367 0.605775V24.9687C75.3021 24.9687 76.8921 25.0477 78.4698 24.9549C84.6211 24.5924 89.4653 20.2178 90.0176 14.0935C90.3721 10.1666 89.2466 6.73633 86.3755 3.98586C84.122 1.82862 81.4176 0.724923 78.3339 0.615807ZM84.799 16.7888C83.3486 19.5267 80.8925 20.6705 77.82 20.7583V4.79231C80.4935 4.88136 82.7581 5.79567 84.3011 8.02189C86.226 10.8025 86.3742 13.8163 84.799 16.7888Z" fill="#255653"></path>
               <path d="M11.8183 3.19888C8.29605 0.354346 4.16717 0.432107 0 0.613967V24.9568C1.67774 24.9568 3.30977 25.0409 4.92945 24.9393C8.01931 24.7461 10.7546 23.6098 12.9636 21.3736C15.6 18.7046 16.6551 15.4412 16.3475 11.6949C16.0584 8.19062 14.5215 5.38245 11.8183 3.19888ZM4.14617 20.695V4.8444C7.95383 4.69139 12.0642 7.60992 12.1321 12.6719C12.1951 17.2999 8.59009 20.9898 4.14617 20.695Z" fill="#255653"></path>
               <path d="M68.2847 7.55068C66.9973 0.402967 59.0793 -2.00134 54.0078 1.7713C51.4171 3.69902 50.3286 6.39932 50.3237 9.59628C50.3175 14.5253 50.3212 19.4543 50.3237 24.3834C50.3237 24.574 50.3533 24.7659 50.3657 24.9452H54.4328C54.4328 24.6267 54.4328 24.3608 54.4328 24.0924C54.4328 19.3866 54.4279 14.6808 54.439 9.97506C54.4402 9.46459 54.4711 8.9441 54.5761 8.44869C55.247 5.28057 58.1861 3.58363 61.1413 4.63842C62.9599 5.28809 64.3201 7.25343 64.3374 9.36426C64.3634 12.6653 64.3485 15.9664 64.3498 19.2662C64.351 21.1387 64.3498 23.0113 64.3498 24.9565H68.4354C68.4502 24.7433 68.4712 24.5702 68.4712 24.3946C68.4725 19.5095 68.4799 14.6269 68.4638 9.74177C68.4601 9.01057 68.4144 8.26808 68.2847 7.55068Z" fill="#255653"></path>
               <path d="M45.1914 0.615967H41.1602V24.9413H45.1914V0.615967Z" fill="#255653"></path>
               <path d="M20.7207 8.70042V16.8841C20.7207 21.5987 23.9638 24.891 28.6078 24.891H36.406V20.8788H28.6078C27.6849 20.8788 24.6729 20.5903 24.6729 16.8841V14.8561H34.349V10.7297H24.6729V8.70042C24.6729 6.49803 26.4384 4.70577 28.6078 4.70577H36.406V0.694824H28.6078C24.259 0.694824 20.7207 4.28561 20.7207 8.70042Z" fill="#255653"></path>
               <path d="M102.202 4.70507H110V0.692871H102.202C97.8528 0.692871 94.3145 4.28491 94.3145 8.69972V16.8834C94.3145 21.598 97.5575 24.889 102.202 24.889H110V20.8781H102.202C101.279 20.8781 98.2667 20.5883 98.2667 16.8834V14.8541H107.943V10.7278H98.2667V8.69972C98.2667 6.49733 100.032 4.70507 102.202 4.70507Z" fill="#255653"></path>
            </svg>
         </a>
         <p class="text-sm font-bold text-secondary mb-2">ชำระเงิน</p>
         <div class="grid border rounded-md w-full p-4 divide-y gap-4">
            <div class="grid grid-cols-6 items-start">
               <div class="text-black/60">ติดต่อ</div>
               <div class="col-span-4">${infomation.email}</div>
               <a
                  class="text-sm ml-auto link text-secondary font-medium"
                  href="/pages/checkout.html"
                  >แก้ไข</a
               >
            </div>
            <div class="grid grid-cols-6 items-start pt-4">
               <div class="text-black/60">ที่อยู่</div>
               <div class="col-span-4">${infomation.address}, ${infomation.district}, ${infomation.subDistrict}, ${infomation.state} ${infomation.zipCode}</div>
               <a
                  class="text-sm ml-auto link text-secondary font-medium"
                  href="/pages/checkout.html"
                  >แก้ไข</a
               >
            </div>
         </div>
         <div class="grid gap-4 mt-6 w-full">
            <p class="font-medium mb-4 text-2xl">ช่องทางชำระเงิน</p>
            <div class="w-full border rounded-md grid">
               <div
                  class="flex items-center justify-between p-4 bg-secondary/10 border border-secondary rounded-t-md"
               >
                  <p>บัตรเครดิต</p>
                  <div class="flex items-center gap-2">
                     <img alt="VISA" src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/0169695890db3db16bfe.svg" role="img" width="38" height="24" class="_1fragemwa _1fragemw5 _1fragemwj _1fragemrn _1tgdqw66">
                     <img alt="MASTERCARD" src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/ae9ceec48b1dc489596c.svg" role="img" width="38" height="24" class="_1fragemwa _1fragemw5 _1fragemwj _1fragemrn _1tgdqw66">
                  </div>
               </div>
               <div class="bg-base-100 p-4 border border-black/20 rounded-b-md">
                  <input
                     type="text"
                     pattern="\d*"
                     maxlength="16"
                     class="input bg-white rounded-md input-bordered w-full"
                     placeholder="หมายเลขบัตร"
                  />
                  <div class="flex items-center mt-4 gap-4">
                     <input
                        type="text"
                        maxlength="5"
                        class="input bg-white rounded-md input-bordered w-full"
                        placeholder="วันหมดอายุ (ดด/ปป)"
                     />
                     <input
                        type="text"
                        maxlength="3"
                        class="input bg-white rounded-md input-bordered w-full"
                        placeholder="รหัสความปลอดภัย"
                     />
                  </div>
                  <input
                     type="text"
                     class="input bg-white rounded-md mt-4 input-bordered w-full"
                     placeholder="ชื่อบนบัตร"
                  />
               </div>
            </div>
         </div>
         <div class="flex items-center w-full mt-8 justify-between">
            <a class="text-primary-content/60" href="/pages/checkout.html"
               >< กลับไปขั้นตอนก่อนหน้า</a
            >
            <button
               type="submit"
               class="btn px-14 btn-primary font-black capitalize font-athiti text-sm"
            >
               ชำระเงิน
            </button>
         </div>
      </div>
   `
   }
})
