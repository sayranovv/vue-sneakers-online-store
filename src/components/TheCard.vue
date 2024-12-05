<script setup>
defineProps({
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function,
})
</script>

<template>
  <div>
    <div
      class="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition"
    >
      <img
        v-if="onClickAdd"
        :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
        alt="Like"
        @click="onClickFavorite"
      />
      <img :src="imageUrl" alt="sneakers" />
      <p>{{ title }}</p>

      <div class="flex justify-between">
        <div class="flex flex-col">
          <span class="text-slate-400">Цена:</span>
          <b>{{ price }} руб.</b>
        </div>
        <img
          v-if="onClickAdd"
          @click="onClickAdd"
          :src="!isAdded ? '/plus.svg' : '/checked.svg'"
          alt="Plus"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
