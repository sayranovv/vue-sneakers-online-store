<script setup>
const emit = defineEmits(['openDrawer'])

defineProps({
  totalPrice: Number,
})
</script>

<template>
  <header class="
  flex
  items-center
  laptop:justify-between
  border-b
  border-slate-100
  py-8
  mobile-s:flex-wrap
  mobile-s:justify-center
  mobile-l:gap-5
  mobile-s:px-2
  laptop:px-10
">
    <router-link to="/">
      <div class="
      flex
      items-center
      gap-4">
        <img src="/logo.png" alt="Logo" class="w-10" />
        <div>
          <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
          <p class="text-slate-400">Магазин лучших кроссовок</p>
        </div>
      </div>
    </router-link>

    <ul class="flex
    items-center
    gap-10
    mobile-s:mt-6
    tablet:mt-0
">
      <li
        @click="() => emit('openDrawer')"
        class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black"
      >
        <img src="/cart.svg" alt="Cart" />
        <b class="
        mobile-s:hidden
        tablet:inline
">{{ totalPrice }} руб.</b>
      </li>
      <router-link to="/favorites">
        <li class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
          <img src="/heart.svg" alt="Heart" />
          <span class="
        mobile-s:hidden
        tablet:inline"
          >Закладки</span>
        </li>
      </router-link>
      <li class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
        <img src="/profile.svg" alt="Profile" />
        <span class="
        mobile-s:hidden
        tablet:inline">Профиль</span>
      </li>
    </ul>
  </header>
</template>

<style scoped></style>
