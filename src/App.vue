<script setup>
import Header from "./components/layout/header.vue";
import Product from "./components/page/product.vue";
</script>

<template>
  <div class="container">
    <Header />
    <div class="mt-6 bg-white p-6 rounded shadow border border-gray-300">
      <router-view />
    </div>
  </div>
</template>

<style scoped></style>
