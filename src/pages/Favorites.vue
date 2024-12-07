<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import TheCardList from '@/components/TheCardList.vue'
import TheInfoBlock from '@/components/TheInfoBlock.vue'

const favorites = ref([])

let hasFavorites = false

onMounted(async () => {
  try {
    // ?relations=items - фича mokky dev
    const { data } = await axios.get(
      'https://08e09035facc6854.mokky.dev/favorites?_relations=items',
    )
    favorites.value = data.map((obj) => obj.item)
    hasFavorites = JSON.stringify(favorites.value).length === 2
  } catch (e) {
    console.log(e)
  }
})
</script>

<template>
  <h2 class="text-3xl font-bold mb-8">Мои закладки</h2>
  <TheCardList :items="favorites" is-favorites />
  <p v-if="hasFavorites">
    <TheInfoBlock
      image-url="/emoji-2.png"
      title="У вас нет заказов"
      description="Вы можете оформить заказ на главной странице"
    />

  </p>
</template>

<style scoped></style>
