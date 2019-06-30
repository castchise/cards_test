<template>
  <div class="px-4 flex items-center flex-col md:flex-wrap md:py-5 md:justify-center xl:justify-start md:flex-row md:ml-3" id="card-container">
    <card v-for="card in cards.slice(0, maxCards)" :key="card.id" v-bind="card"/>
    <div
      class="mt-5 w-11/12 h-32 bg-white border border-dashed border-gray-300 rounded-lg group hover:border-solid hover:border-gray-500 cursor-pointer max-w-xxs md:mr-3 md:ml-3"
      v-if="cards.length <= maxCards-1"
    >
      <div class="flex relative h-3/4">
        <div
          class="h-8 w-1 bg-gray-300 absolute top-1/2 left-1/2 transform-50 group-hover:bg-gray-500 add-wallet-bar"
        ></div>
        <div
          class="h-1 w-8 bg-gray-300 absolute top-1/2 left-1/2 transform-50 group-hover:bg-gray-500 add-wallet-bar"
        ></div>
      </div>
      <p class="text-sm text-gray-500 opacity-25 group-hover:opacity-100 add-wallet-txt">Добавить кошелек</p>
    </div>
  </div>
</template>
<script>
import card from "./Card";

export default {
  props: {
    maxCards: {
      type: Number,
      default: 7
    }
  },
  components: {
    card
  },
  data: function() {
    return {
      cards: [
        {
          id: 1,
          title: "моя карта 1",
          active: true,
          first6: 1111,
          last6: 4213
        },
        {
          id: 2,
          title: "моя карта 2",
          active: false,
          first6: 2221,
          last6: 3314
        },
        {
          id: 3,
          title: "моя карта 3",
          active: false,
          first6: 7891,
          last6: 8934
        },
        {
          id: 4,
          title: "моя карта 4",
          active: true,
          first6: 1234,
          last6: 5554
        },
        {
          id: 5,
          title: "моя карта 5",
          active: true,
          first6: 2232,
          last6: 8733
        },
        { id: 6, title: "моя карта 6", active: true, first6: 2232, last6: 8733 }
      ],
      cardsLength: 0
    };
  },
  created() {
    this.cardsLength = this.cards.length;
  }
};
</script>
