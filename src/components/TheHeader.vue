<script setup>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)

const closeOnOutsideClick = (event) => {
  if (!event.target.closest('.menu-content') && isOpen.value) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeOnOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', closeOnOutsideClick)
})

const emit = defineEmits(['openDrawer'])

defineProps({
  totalPrice: Number,
})
</script>

<template>
  <header
    class="flex items-center justify-between border-b border-slate-100 py-8 px-4 tablet:px-10"
  >
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" class="w-10" />
        <div>
          <h2 class="text-xl font-bold uppercase">JUST Sneakers</h2>
          <p class="text-slate-400">Магазин лучших кроссовок</p>
        </div>
      </div>
    </router-link>

    <ul v-if="width >= 500" class="flex items-center gap-10 tablet:mt-0">
      <router-link to="/about">
        <li class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
          <img src="/about.svg" alt="Heart" />
          <span class="mobile-s:hidden tablet:inline">О нас</span>
        </li>
      </router-link>
      <li
        @click="() => emit('openDrawer')"
        class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black"
      >
        <img src="/cart.svg" alt="Cart" />
        <b class="mobile-s:hidden tablet:inline">{{ totalPrice }} руб.</b>
      </li>
      <router-link to="/favorites">
        <li class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
          <img src="/heart.svg" alt="Heart" />
          <span class="mobile-s:hidden tablet:inline">Закладки</span>
        </li>
      </router-link>
      <li class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
        <img src="/profile.svg" alt="Profile" />
        <span class="mobile-s:hidden tablet:inline">Профиль</span>
      </li>
    </ul>

    <div v-else class="overflow-hidden">
      <button
        @click.stop="isOpen = !isOpen"
        class="relative z-40 flex flex-col gap-1 w-10 h-10 justify-center items-center"
      >
        <span
          class="block h-1 w-8 bg-[#9B9B9B] rounded transition-all"
          :class="{ 'rotate-45 translate-y-2': isOpen }"
        ></span>
        <span
          class="block h-1 w-8 bg-[#9B9B9B] rounded transition-all"
          :class="{ 'opacity-0': isOpen }"
        ></span>
        <span
          class="block h-1 w-8 bg-[#9B9B9B] rounded transition-all"
          :class="{ '-rotate-45 -translate-y-2': isOpen }"
        ></span>
      </button>

      <!-- Затемнение фона -->
      <div v-if="isOpen" class="fixed inset-0 bg-black opacity-50 z-10 transition-opacity"></div>

      <!-- Меню -->
      <nav
        v-if="isOpen"
        class="menu-content fixed pt-14 top-0 right-0 w-2/4 h-full bg-white shadow-lg z-10 p-6 flex flex-col gap-6"
      >
        <RouterLink to="/" class="text-lg font-semibold" @click="() => (isOpen = !isOpen)"
          >Главная</RouterLink
        >
        <RouterLink to="/about" class="text-lg font-semibold" @click="() => (isOpen = !isOpen)"
          >О нас</RouterLink
        >
        <p
          @click="
            () => {
              emit('openDrawer')
              isOpen = !isOpen
            }
          "
          to="#"
          class="text-lg font-semibold"
        >
          Корзина
        </p>
        <RouterLink to="/favorites" @click="() => (isOpen = !isOpen)" class="text-lg font-semibold"
          >Закладки</RouterLink
        >
        <RouterLink to="/" @click="() => (isOpen = !isOpen)" class="text-lg font-semibold"
          >Профиль</RouterLink
        >
      </nav>
    </div>
  </header>
</template>

<style scoped>
button span {
  transition:
    transform 0.3s,
    opacity 0.3s;
}
</style>
