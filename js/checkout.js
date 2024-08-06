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

console.log(bagList)

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

console.log(infomation)

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
            hx-get="/assets/logo.svg"
            hx-trigger="load"
         ></a>
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
                  <div>ma</div>
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
