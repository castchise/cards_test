<template>
  <!-- xs-land:w-1/2 md:w-1/3 -->
  <div
    class="mt-5 w-11/12 h-32 bg-white border border-gray-300 rounded-lg cursor-pointer max-w-xxs md:mr-3 md:ml-3 shadow-md bg-gray-300 hover:bg-gray-400 hover:border-gray-400 credit-card"
    @click="cardToggle = !cardToggle"
  >
    <div class="flex justify-between p-3">
      <div class="w-1/2 flex-grow text-lg text-left flex flex-col">
        <input
          type="text"
          name="title"
          v-show="editMode"
          ref="titleInput"
          @click.stop
          class="bg-gray-500 px-2 text-white text-base uppercase font-bold outline-none rounded credit-card-title"
        >
        <span class="uppercase font-bold credit-card-title text-white text-base" v-show="!editMode">{{ title }}</span>
        <span
          class="w-12/12 text-xs mt-3 group-hover:opacity-100 uppercase font-bold"
          :class="active ? 'text-green-400' : 'text-red-400'"
        >{{ status }}</span>
      </div>
      <div class="w-1/4 flex justify-end flex-wrap items-start">
        <transition name="fadeIn">
          <a
            href="#!"
            class="text-gray-700 opacity-50 hover:opacity-100 credit-card-edit"
            @click.stop="editMode = !editMode"
            v-show="cardToggle"
          >
            <svg
              class="h-5 w-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z"></path>
            </svg>
          </a>
        </transition>
        <transition name="fadeIn">
          <a
            href="#!"
            class="ml-3 text-gray-700 opacity-50 hover:opacity-100 credit-card-edit"
            @click.stop="removeCard"
            v-show="cardToggle"
          >
            <svg
              class="h-5 w-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"></path>
            </svg>
          </a>
        </transition>
      </div>
    </div>
    <div class="w-full flex items-center justify-between pl-3 pr-3">
      <input
        type="text"
        ref="numberInput"
        @input="numberInput"
        @click.stop
        class="bg-gray-500 px-2 text-white text-base uppercase outline-none rounded text-sm tracking-wide text-white credit-card-number"
        v-show="editMode && !first6"
        v-model="cardNumber"
      >
      <span
        v-show="!editMode"
        class="text-lg tracking-wide text-white credit-card-number"
      >{{first6}} **** **** {{last6}}</span>
      <div class="flex justify-center align-center items-center">
        <div class="bank-type">
          <img src="../assets/sber.png" class="w-12 inline-block" alt>
        </div>
        <div class="card-type">
          <!-- <img src="../assets/mastercard.png" class="w-12 inline-block" alt> -->
          <svg v-if="String(first6)[0]==5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 10"><path opacity=".15" fill-rule="evenodd" clip-rule="evenodd" d="M10 10H5c-2.7 0-5-2.2-5-5 0-2.7 2.2-5 5-5h5c2.7 0 5 2.2 5 5s-2.2 5-5 5z"/><path fill="#F8771B" d="M7.8 2.2l-.3-.3-.3.3C6.4 3 6 3.9 6 5c0 1.1.4 2.1 1.2 2.8l.3.3.3-.3C8.6 7.1 9 6.1 9 5c0-1.1-.4-2-1.2-2.8z"/><path fill="#F33519" d="M2.2 2.2C1.4 3 1 3.9 1 5c0 1.1.4 2.1 1.2 2.8C3 8.6 3.9 9 5 9c1 0 1.8-.3 2.5-.9l-.3-.3C6.4 7.1 6 6.1 6 5c0-1.1.4-2 1.2-2.8l.3-.3C6.8 1.3 6 1 5 1c-1.1 0-2 .4-2.8 1.2z"/><path fill="#FDB81C" d="M14 5c0-1.1-.4-2-1.2-2.8C12.1 1.4 11.1 1 10 1c-1 0-1.8.3-2.5.9l.3.3C8.6 3 9 3.9 9 5c0 1.1-.4 2.1-1.2 2.8l-.3.3c.7.6 1.5.9 2.5.9 1.1 0 2.1-.4 2.8-1.2S14 6.1 14 5z"/></svg>
          <svg v-if="String(first6)[0]==4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 6"><path fill="#fff" d="M6.7 5.9l1-5.8h1.5l-1 5.8zM13.8.2C13.5.1 13 0 12.4 0c-1.5 0-2.6.8-2.6 1.9 0 .8.8 1.3 1.3 1.6.7.3.9.5.9.7 0 .4-.5.6-.9.6-.6 0-.9-.1-1.4-.3l-.3-.1-.2 1.3c.4.2 1 .3 1.7.3 1.6 0 2.7-.8 2.7-2 0-.7-.4-1.2-1.3-1.6-.5-.3-.9-.4-.9-.7 0-.2.3-.5.9-.5.5 0 .9.1 1.2.2l.1.1.2-1.3zm2.1 3.7c.1-.3.6-1.6.6-1.6l.2-.6.1.5s.3 1.4.4 1.7h-1.3zM17.8.1h-1.2c-.4 0-.6.1-.8.5l-2.3 5.3h1.6s.3-.7.3-.9h2c0 .2.2.9.2.9H19L17.8.1zM5.4.1l-1.5 4-.2-.8c-.2-1-1.1-2-2.1-2.5L3 5.9h1.6L7 .1H5.4zM2.5.1H0v.1c1.9.5 3.2 1.6 3.7 3L3.2.6C3.1.2 2.8.1 2.5.1" data-qa-file="Visa"/></svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      cardToggle: false,
      cardNumber: "",
      editMode: false,
      cardType: ''
    };
  },
  props: {
    id: {
      type: Number
    },
    title: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    },
    first6: {
      type: [Number, Boolean],
      default: false
    },
    last6: {
      type: [Number, Boolean],
      default: false
    },
    updateCard: {
      type: Function,
      required: true
    }
  },
  methods: {
    removeCard() {
      this.$emit("remove", this.id);
    },
    async numberInput(e) {
      let value = e.target.value;
      // if(value.length >= 6) {
      //   let data = await fetch(`https://api.tinkoff.ru/v1/brand_by_bin?bin=${value.slice(0,6)}`);
      //   console.log(await data.json());
         
      // }
    }
  },
  computed: {
    status() {
      return this.active ? "Подтверждена" : "Заблокирована";
    }
  },
  created() {
    if (!this.first6) {
      this.editMode = true;
      this.cardToggle = true;
    }
  },
  watch: {
    editMode() {
      if (!this.editMode) {
        const card = { title: this.$refs.titleInput.value, id: this.id };
        this.$nextTick(function() {
          if (!this.first6) {
            const cardNumber = this.$refs.numberInput.value.replace(/\D/g, "");
            card.first6 = +cardNumber.slice(0, 4);
            card.last6 = +cardNumber.slice(-4);
          }
          this.updateCard(card);
          // console.log(this.$refs.titleInput.value);
        });
      }
    }
  }
};
</script>
