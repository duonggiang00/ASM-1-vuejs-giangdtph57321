<template>
  <div>
    <nav class="bg-white border-gray-200 px-4 py-2.5">
      <div class="flex flex-wrap justify-between items-center mx-auto">
        <ul class="flex flex-row space-x-8 mt-4 font-medium">
          <li>
            <router-link
              to="/product"
              class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400"
              >Product</router-link
            >
          </li>
          <li>
            <router-link
              to="/user"
              class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400"
              >User</router-link
            >
          </li>
          <li>
            <router-link
              to="/cart"
              class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400"
              >Cart</router-link
            >
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
