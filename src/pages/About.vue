<script setup>
const data1 = [
  {
    title: '🏆 Кто мы?',
    desc: 'Мы — команда энтузиастов, объединенных страстью к кроссовкам и уличной моде. Наш магазин создан для тех, кто ценит стиль, комфорт и качество. Мы тщательно отбираем только лучшие модели, чтобы каждый наш клиент мог найти идеальную пару',
  },
  {
    title: '🔥 Почему выбирают нас?',
    desc: 'Мы работаем напрямую с проверенными поставщиками и брендами, гарантируя подлинность каждой пары. Наш ассортимент постоянно обновляется — от классики до лимитированных коллекций, чтобы ты всегда был в тренде',
  },
  {
    title: '🚀 Наша миссия',
    desc: 'Мы стремимся сделать покупку кроссовок максимально удобной, быстрой и приятной. Наши консультанты всегда готовы помочь выбрать идеальную модель, а доставка работает так, чтобы ты мог наслаждаться покупкой уже на следующий день',
  },
]

const data2 = [
  {
    title: '🌍 Мы за культуру',
    desc: 'Кроссовки — это не просто обувь, а стиль жизни. Мы поддерживаем культуру сникерхедов, рассказываем о новых трендах и истории культовых моделей, а также сотрудничаем с локальными художниками и брендами',
  },
  {
    title: '📦 Как мы работаем?',
    desc: 'ММы заботимся о каждом клиенте: удобный интерфейс сайта, прозрачные условия покупки, легкий возврат и качественный сервис — все это делает нас лучшими в своем деле. Попробуй сам и убедись!',
  },
  {
    title: '🔥 Присоединяйся к нашей команде сникерхедов!',
    desc: '',
  },
]
</script>

<template>
  <h2 class="text-3xl font-bold mb-8">О нас</h2>
  <section class="flex gap-5 tablet:text-xl flex-col min-[500px]:flex-row">
    <div class="tablet:w-2/3 flex flex-col justify-between gap-5 min-[500px]:gap-0">
      <div v-for="item in data1" :key="item">
        <h2 class="font-medium">{{ item.title }}</h2>
        <p class="mt-2">{{ item.desc }}</p>
      </div>
    </div>
    <img
      src="/stansmith.png"
      alt="adidas"
      class="w-full h-[450px] min-[500px]:h-full min-[500px]:w-5/12 tablet:w-1/3 object-cover rounded-3xl shadow-md"
    />
  </section>
  <section class="flex gap-5 mt-14 tablet:text-xl flex-col-reverse min-[500px]:flex-row">
    <img
      src="/whitenike.png"
      alt="nike"
      class="w-full min-[500px]:w-1/3 tablet:w-1/4 object-cover rounded-3xl shadow-md h-[450px] min-[500px]:h-full"
    />
    <div class="mobile-xl:w-2/3 tablet:w-3/4 flex flex-col justify-between gap-5 min-[500px]:gap-0">
      <div v-for="item in data2" :key="item">
        <h2 class="font-medium">{{ item.title }}</h2>
        <p class="mt-2">{{ item.desc }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
