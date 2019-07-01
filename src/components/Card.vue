<template>
  <div
    class="mt-5 w-11/12 h-32 bg-white border-transparent rounded-lg cursor-pointer max-w-xxs md:mr-3 md:ml-3 shadow-md bg-gray-300 hover:bg-gray-400 hover:border-gray-400 credit-card"
    ref="cardTemplate"
    @click="cardToggle = !cardToggle"
  >
    <div class="flex justify-between p-3">
      <div class="w-1/2 text-lg text-left flex flex-col">
        <input
          type="text"
          name="title"
          v-show="editMode"
          ref="titleInput"
          @click.stop
          class="bg-1/2black w-175 sm:w-190 px-2 text-white text-base uppercase font-bold outline-none rounded credit-card-title"
        >
        <span
          class="uppercase font-bold credit-card-title text-white text-base"
          v-show="!editMode"
        >{{ title }}</span>
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
        class="bg-1/2black w-175 sm:w-190 px-2 text-white text-base uppercase outline-none rounded text-sm tracking-wide text-white credit-card-number"
        v-show="editMode && !first4"
        v-model="cardNumber"
        placeholder="номер карты"
      >
      <span
        v-show="!editMode || editMode && first4"
        class="text-lg tracking-wide text-white credit-card-number"
      >{{first4}} **** **** {{last4}}</span>
      <div class="flex justify-center align-center items-center">
        <div class="bank-type h-12 w-12">
          <svg class="icon inline-block bankLogo"></svg>
        </div>
        <div class="card-type">
          <svg
            v-if="paymentSystem == 'MASTERCARD'"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 15 10"
          >
            <use xlink:href="#mastercard"></use>
          </svg>
          <svg v-if="paymentSystem == 'VISA'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 6">
            <use xlink:href="#visa"></use>
          </svg>
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
      cardType: "",
      logo: "",
      paymentSystem: ""
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
    first4: {
      type: [Number, Boolean],
      default: false
    },
    last4: {
      type: [Number, Boolean],
      default: false
    },
    updateCard: {
      type: Function,
      required: true
    },
    cardsLogo: {
      type: Array,
      required: true
    }
  },
  methods: {
    removeCard() {
      this.$emit("remove", this.id);
    },
    async numberInput(e) {
      let value = e.target.value;
      if (value.length === 6) {
        let response = await fetch(
          `https://api.tinkoff.ru/v1/brand_by_bin?bin=${value.slice(0, 6)}`
        );
        const data = await response.json();
        if (!data.resultCode.includes("ERROR")) {
          const { baseColor, logoFile, paymentSystem } = data.payload;
          if (baseColor) {
            this.$refs.cardTemplate.style.backgroundColor = "#" + baseColor;
          }
          if (logoFile) {
            let logo = logoFile.split(".")[0];
            if (this.cardsLogo.includes(logo)) {
              this.$refs.cardTemplate.querySelector(".bankLogo").innerHTML = `
                <use xlink:href="#${logo}"></use>
              `;
            }
          }
          if (paymentSystem) {
            this.paymentSystem = paymentSystem;
          }
        }
      } else if (value.length < 6) {
        this.$refs.cardTemplate.style.removeProperty("background-color");
        this.$refs.cardTemplate.querySelector(".bankLogo").innerHTML = ``;
        this.paymentSystem = "";
      }
    }
  },
  computed: {
    status() {
      return this.active ? "Подтверждена" : "Заблокирована";
    }
  },
  created() {
    if (!this.first4) {
      this.editMode = true;
      this.cardToggle = true;
    }
  },
  mounted() {
    this.$refs.titleInput.value = this.title;
  },
  watch: {
    editMode() {
      if (!this.editMode) {
        const card = { title: this.$refs.titleInput.value, id: this.id };
        this.$nextTick(function() {
          if (!this.first4) {
            const cardNumber = this.$refs.numberInput.value.replace(/\D/g, "");
            card.first4 = +cardNumber.slice(0, 4);
            card.last4 = +cardNumber.slice(-4);
          }
          this.updateCard(card);
        });
      }
    }
  }
};
</script>
