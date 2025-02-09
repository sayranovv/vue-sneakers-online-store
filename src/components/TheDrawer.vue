<script setup>
import { Input } from '@/components/ui/input'
import TheDrawerHead from '@/components/TheDrawerHead.vue'
import TheCartList from '@/components/TheCartList.vue'
import TheInfoBlock from '@/components/TheInfoBlock.vue'
import axios from 'axios'
import { ref, inject, computed } from 'vue'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { h } from 'vue'
import * as z from 'zod'

const formSchema = toTypedSchema(
  z.object({
    fullName: z
      .string({
        required_error: 'Обязательное поле',
      })
      .min(2, 'Имя должно содержать хотя бы 2 символа')
      .max(50, 'Имя слишком длинное'),

    phone: z
      .string({
        required_error: 'Обязательное поле',
      })
      .regex(/^(\+?\d{1,3})?\d{10}$/, 'Введите корректный номер телефона'),

    email: z
      .string({
        required_error: 'Обязательное поле',
      })
      .email('Введите корректный email'),

    address: z
      .string({
        required_error: 'Обязательное поле',
      })
      .min(5, 'Адрес слишком короткий')
      .max(100, 'Адрес слишком длинный'),

    city: z
      .string({
        required_error: 'Обязательное поле',
      })
      .min(2, 'Город должен содержать хотя бы 2 символа')
      .max(50, 'Название города слишком длинное'),

    deliveryMethod: z.string({
      required_error: 'Пожалуйста, выберите способ доставки',
    }),

    paymentMethod: z.enum(['card', 'cash_on_delivery', 'paypal'], {
      required_error: 'Пожалуйста, выберите способ оплаты',
    }),

    comment: z.string().optional(),
    promoCode: z.string().optional(),
  }),
)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number,
})

const isCreating = ref(false)
const orderId = ref(null)

const { cart, closeDrawer } = inject('cart')

const createOrder = handleSubmit(async () => {
  try {
    isCreating.value = true
    const { data } = await axios.post('https://08e09035facc6854.mokky.dev/orders', {
      items: cart.value,
      totalPrice: props.totalPrice.value,
    })

    cart.value = []

    orderId.value = data.id
  } catch (e) {
    console.log(e)
  } finally {
    isCreating.value = false
  }
})

const cartIsEmpty = computed(() => cart.value.length === 0)

const buttonDisabled = computed(() => isCreating.value || cartIsEmpty.value)
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="bg-white w-full mobile-l:w-96 h-full fixed right-0 top-0 z-50 p-8 overflow-y-auto">
    <TheDrawerHead />

    <div v-if="!totalPrice || orderId" class="flex h-full items-center">
      <TheInfoBlock
        v-if="!totalPrice && !orderId"
        title="Корзина пустая"
        description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"
        image-url="/package-icon.png"
      />
      <TheInfoBlock
        v-if="orderId"
        title="Заказ оформлен!"
        :description="`Ваш заказ #${orderId} скоро будет передан курьерской службе`"
        image-url="/order-success-icon.png"
      />
    </div>

    <div v-else>
      <TheCartList />

      <div class="flex flex-col gap-4 mt-7">
        <form class="space-y-2" @submit="createOrder">
          <FormField v-slot="{ componentField }" name="fullName">
            <FormItem>
              <FormLabel>Имя и Фамилия</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Сергей Автайкин" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="phone">
            <FormItem>
              <FormLabel>Номер телефона</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+79991234567" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@gmail.com" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="address">
            <FormItem>
              <FormLabel>Адрес</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Мира 42, кв. 37" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="city">
            <FormItem>
              <FormLabel>Город</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Пермь" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="deliveryMethod">
            <FormItem>
              <FormLabel>Способ доставки</FormLabel>
              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите способ доставки" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="courier"> Курьер </SelectItem>
                    <SelectItem value="pickup"> Самовывоз </SelectItem>
                    <SelectItem value="mail"> Почта </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{}" name="">
            <FormItem>
              <FormLabel>Размер кроссовок</FormLabel>
              <NumberField id="shoeSize" :default-value="39" :min="35" :max="45">
                <NumberFieldContent>
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" type="radio" name="paymentMethod">
            <FormItem>
              <FormLabel>Способ оплаты</FormLabel>
              <FormControl>
                <RadioGroup class="flex flex-col space-y-1" v-bind="componentField">
                  <FormItem class="flex items-center space-y-0 gap-x-3">
                    <FormControl>
                      <RadioGroupItem value="card" />
                    </FormControl>
                    <FormLabel class="font-normal"> Картой </FormLabel>
                  </FormItem>
                  <FormItem class="flex items-center space-y-0 gap-x-3">
                    <FormControl>
                      <RadioGroupItem value="cash_on_delivery" />
                    </FormControl>
                    <FormLabel class="font-normal"> Наличными при получении </FormLabel>
                  </FormItem>
                  <FormItem class="flex items-center space-y-0 gap-x-3">
                    <FormControl>
                      <RadioGroupItem value="paypal" />
                    </FormControl>
                    <FormLabel class="font-normal"> СБП </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="comment">
            <FormItem>
              <FormLabel>Комментарий</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Ваши пожелания" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="promoCode">
            <FormItem>
              <FormLabel>Промокод</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Если есть" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <div>
            <div class="mt-10 flex gap-2">
              <span>Итого:</span>
              <div class="flex-1 border-b border-dashed"></div>
              <b>{{ totalPrice }} руб.</b>
            </div>

            <div class="mb-6 flex gap-2">
              <span>Налог 5%:</span>
              <div class="flex-1 border-b border-dashed"></div>
              <b>{{ vatPrice }} руб.</b>
            </div>
          </div>
          <button
            type="submit"
            :disabled="buttonDisabled"
            class="mt-4 bg-lime-500 w-full rounded-xl py-3 text-white disabled:bg-slate-300 hover:bg-lime-600 transition active:bg-lime-700 cursor-pointer"
          >
            Оформить заказ
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
