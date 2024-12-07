<script setup>
import { ref, watch, provide, computed } from 'vue'

import TheHeader from '@/components/TheHeader.vue'
import TheDrawer from '@/components/TheDrawer.vue'

/* Корзина (start) */
const cart = ref([])
const drawerOpen = ref(false)

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))

const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const closeDrawer = () => {drawerOpen.value = false}

const openDrawer = () => {drawerOpen.value = true}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  {
    deep: true,
  },
)
/* Корзина (end) */

provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart,
})
</script>

<template>
  <TheDrawer v-if="drawerOpen" :total-price="totalPrice" :vat-price="vatPrice" />

  <div class="bg-white m-auto rounded-xl shadow-xl laptop:mt-14 mobile-l:w-auto laptop:w-11/12 laptop-l:w-4/5 tv:w-2/3" >
    <TheHeader :total-price="totalPrice" @open-drawer="openDrawer" />
    <div class="
    tablet:p-10
    mobile-s:p-4

">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped></style>
