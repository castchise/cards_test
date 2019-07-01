<template>
  <div
    class="px-4 flex items-center flex-col md:flex-wrap md:py-5 md:justify-center xl:justify-start md:flex-row md:ml-3"
    id="card-container"
  >
    <card
      v-for="card in cards.slice(0, maxCards)"
      :key="card.id"
      v-bind="card"
      @remove="removeCard"
      :update-card="editCard"
      :cards-logo="cardsLogo"
    />
    <div
      class="mt-5 w-11/12 h-32 bg-white border border-dashed border-gray-300 rounded-lg group hover:border-solid hover:border-gray-500 cursor-pointer max-w-xxs md:mr-3 md:ml-3"
      v-if="cards.length <= maxCards-1"
      @click="addCard"
    >
      <div class="flex relative h-3/4">
        <div
          class="h-8 w-1 bg-gray-300 absolute top-1/2 left-1/2 transform-50 group-hover:bg-gray-500 add-wallet-bar"
        ></div>
        <div
          class="h-1 w-8 bg-gray-300 absolute top-1/2 left-1/2 transform-50 group-hover:bg-gray-500 add-wallet-bar"
        ></div>
      </div>
      <p
        class="text-sm text-gray-500 opacity-25 group-hover:opacity-100 add-wallet-txt"
      >Добавить кошелек</p>
    </div>
  </div>
</template>
<script>
import card from "./Card";

export default {
  props: {
    maxCards: {
      type: Number,
      default: 6
    }
  },
  components: {
    card
  },
  data: function() {
    return {
      cards: [],
      cardsLength: 0,
      cardsLogo: [
        "akb",
        "alfabank",
        "bankofmoscow",
        "gazprom",
        "kredit-evropa-bank",
        "mdm",
        "mir",
        "mts-bank",
        "otkrytie1",
        "otp-bank",
        "pochta-bank",
        "promsvyazbank",
        "rnko_platezhniy_centr",
        "rosbank",
        "tinkoff",
        "sberbank"
      ]
    };
  },
  methods: {
    removeCard(id) {
      this.cards = this.cards.filter(card => card.id !== id);
    },
    editCard(editedCard) {
      let index = this.cards.findIndex(function(card) {
        return card.id === editedCard.id;
      });
      this.cards.splice(index, 1, Object.assign(this.cards[index], editedCard));
    },
    addCard() {
      this.cards.push({
        id: this.cards.length + 1,
        title: `Моя карта ${this.cards.length + 1}`,
        active: true
      });
    }
  },
  created() {
    this.cardsLength = this.cards.length;
  }
};
</script>
