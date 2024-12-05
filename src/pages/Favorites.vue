<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import TheCardList from '@/components/TheCardList.vue'

const favorites = ref([])

onMounted(async () => {
  try {
    // ?relations=items - фича
    const { data } = await axios.get(
      'https://08e09035facc6854.mokky.dev/favorites?_relations=items',
    )
    favorites.value = data.map((obj) => obj.item)
  } catch (e) {
    console.log(e)
  }
})
</script>

<template>
  <h2 class="text-3xl font-bold mb-8">Мои закладки</h2>
  <TheCardList :items="favorites" is-favorites />
</template>

<style scoped></style>
