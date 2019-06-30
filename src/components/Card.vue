<template>
  <!-- xs-land:w-1/2 md:w-1/3 -->
  <div
    class="mt-5 w-11/12 h-32 bg-white border border-gray-300 rounded-lg cursor-pointer max-w-xxs md:mr-3 md:ml-3 shadow-md bg-gray-300 hover:bg-gray-400 hover:border-gray-400 credit-card"
    @click="cardToggle = !cardToggle"
  >
    <div class="flex justify-between p-3">
      <div class="w-1/2 text-lg text-left flex flex-col">
        <span class="uppercase font-bold credit-card-title text-white">{{ title }}</span>
        <span
          class="w-12/12 text-sm mt-3 group-hover:opacity-100 uppercase font-bold"
          :class="active ? 'text-green-400' : 'text-red-400'"
          
        >{{ status }}</span>
      </div>
      <div class="w-1/2 flex justify-end flex-wrap items-start">
        <transition name="fadeIn">
          <a href="#!" class="text-gray-700 opacity-50 hover:opacity-100 credit-card-edit" v-show="cardToggle">
            <svg class="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z"></path>
            </svg>
          </a>
        </transition>
        <transition name="fadeIn">
          <a href="#!" class="ml-3 text-gray-700 opacity-50 hover:opacity-100 credit-card-edit" v-show="cardToggle">
            <svg class="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"></path>
            </svg>
          </a>
        </transition>
      </div>
    </div>
    <div class="w-full flex items-center justify-between pl-3 pr-3">
      <span class="text-lg tracking-wide text-white credit-card-number">{{first6}} **** **** {{last6}}</span>
      <div class="flex justify-center align-center items-center">
        <img src="../assets/mastercard.png" class="w-12 inline-block" alt="">
        <img src="../assets/sber.png" class="w-12 inline-block" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      cardToggle: false,
    };
  },
  props: {
    title: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    },
    first6: {
      type: Number,
      required: true
    },
    last6: {
      type: Number,
      required: true
    }
  },
  computed: {
    status() {
      return this.active ? 'Подтверждена' : 'Заблокирована'
    }
  }
};
</script>
