<template>
  <div>
    <div
      class="container pb-8 max-w-5xl mx-auto text-center text-2xl overflow-hidden lg:rounded-t-lg shadow-md lg:mt-16 lg:max-w-4xl xl:max-w-5xl bg-white min-h-screen lg:min-h-0"
    >
      <h1
        class="font-bold uppercase bg-gray-300 text-sm py-3 tracking-wide text-gray-600 shadow-md"
      >Мои инструменты</h1>
      <payment-cards/>
    </div>
  </div>
</template>

<script>
import "./assets/main.css";
import PaymentCards from "./components/PaymentCards";


export default {
  name: "app",
  components: {
    PaymentCards
  }
};
</script>
