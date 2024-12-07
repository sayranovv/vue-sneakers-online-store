<script setup>
import TheCardList from '@/components/TheCardList.vue'
import axios from 'axios'
import { inject, onMounted, reactive, ref, watch } from 'vue'
import debouce from 'lodash.debounce'

const items = ref([])

const { addToCart, removeFromCart, cart } = inject('cart')

const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
})

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const onChangeSelect = (event) => {filters.sortBy = event.target.value}

const onChangeSearchInput = debouce((event) => {
  filters.searchQuery = event.target.value
}, 300)

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.id,
      }
      item.isFavorite = true
      const { data } = await axios.post(`https://08e09035facc6854.mokky.dev/favorites`, obj)
      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://08e09035facc6854.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (e) {
    console.log(e)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://08e09035facc6854.mokky.dev/favorites`)
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.item_id === item.id)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id,
      }
    })
  } catch (e) {
    console.log(e)
  }
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`https://08e09035facc6854.mokky.dev/items`, {
      params,
    })

    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false,
    }))
  } catch (e) {
    console.log(e)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()
  await fetchFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id),
  }))
})

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false,
  }))
})

watch(filters, fetchItems)
</script>

<template>
  <div class="flex mobile-s:justify-center tablet:justify-between items-center flex-wrap">
    <h2 class="text-3xl font-bold mobile-s:mb-8 tablet:mb-0">Все кроссовки</h2>

    <div class="flex gap-4 flex-wrap justify-center">
      <select @change="onChangeSelect" class="py-2
      px-3
      border
      rounded-md
      outline-none
      mobile-s:w-72
      tablet:w-auto

">
        <option value="name">По названию</option>
        <option value="price">Цена по возрастанию</option>
        <option value="-price">Цена по убыванию</option>
      </select>

      <div class="relative">
        <img src="/search.svg" alt="search" class="absolute left-4 top-3" />
        <input
          @input="onChangeSearchInput"
          class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400 mobile-s:w-72 tablet:w-auto"
          type="text"
          placeholder="Поиск..."
        />
      </div>
    </div>
  </div>
  <div class="mt-10">
    <TheCardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddPlus" />
  </div>
</template>

<style scoped></style>
