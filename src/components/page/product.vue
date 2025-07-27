<template>
  <div class="">
    <button
      class="rounded p-3.5 bg-blue-500 cursor-pointer hover:opacity-80 m-2"
      @click="formModal = true"
    >
      them moi
    </button>
    <div
      v-if="formModal || isEdit"
      class="fixed inset-0 bg-gray-400/40 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
        <button
          @click="closeModal()"
          class="absolute top-2 right-2 text-gray-500 hover:text-red-600"
        >
          ✕
        </button>
        <h2 class="text-xl font-semibold mb-4">Thêm sản phẩm mới</h2>
        <form action="" @submit.prevent="submitForm">
          <label class="block mb-1 font-medium">Tên sản phẩm</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label class="block mb-1 font-medium">Mô tả sản phẩm</label>
          <input
            v-model="form.description"
            type="text"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label class="block mb-1 font-medium">Giá sản phẩm</label>
          <input
            v-model="form.price"
            type="number"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label class="block mb-1 font-medium">danh mục</label>
          <select name="" id="" v-model="form.category">
            <option v-for="(value, key) in category" :key="key" :value="key">
              {{ value }}
            </option>
          </select>
          <label for="" class="block mb-1 font-medium">Tình trạng</label>
          <div class="inline-flex rounded bg-gray-400">
            <button
              type="button"
              class="px-4 py-2 text-sm font-medium transition rounded-l"
              :class="form.status ? 'bg-gray-300 text-gray-900 shadow' : 'text-gray-500'"
              @click="form.status = true"
              for=""
            >
              Active
            </button>
            <button
              type="button"
              class="px-4 py-2 text-sm font-medium transition rounded-r"
              :class="!form.status ? 'bg-gray-300 text-gray-900 shadow' : 'text-gray-500'"
              @click="form.status = false"
              for=""
            >
              Inactive
            </button>
          </div>
          <div>
            <button
              class="rounded px-4 py-1 bg-blue-500 cursor-pointer hover:opacity-80 m-2"
            >
              {{ isEdit ? "update" : "Add" }}
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="border border-gray-400">
      <table class="w-full table-auto">
        <thead class="bg-gray-300">
          <tr>
            <th class="border border-gray-200 px-4 py-2">ID</th>
            <th class="border border-gray-200 px-4 py-2">image</th>
            <th class="border border-gray-200 px-4 py-2">Name</th>
            <th class="border border-gray-200 px-4 py-2">Description</th>
            <th class="border border-gray-200 px-4 py-2">Price</th>
            <th class="border border-gray-200 px-4 py-2">Category</th>
            <th class="border border-gray-200 px-4 py-2">Status</th>
            <th class="border border-gray-200 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products">
            <td class="border border-gray-200 px-4 py-2">{{ index + 1 }}</td>
            <td>
              <img :src="product.image" alt="" class="w-full" />
            </td>
            <td class="border border-gray-200 px-4 py-2">{{ product.name }}</td>
            <td class="border border-gray-200 px-4 py-2">{{ product.description }}</td>
            <td class="border border-gray-200 px-4 py-2">{{ product.price }}</td>
            <td class="border border-gray-200 px-4 py-2">{{ product.category }}</td>
            <td class="border border-gray-200 px-4 py-2 text-center align-middle">
              <button
                class="rounded px-3 py-0.5 cursor-pointer"
                :class="
                  product.status
                    ? 'bg-green-100 border-green-300 border text-green-800'
                    : 'bg-gray-100 border-gray-300 border text-gray-600'
                "
                @click="product.status = !product.status"
              >
                {{ product.status ? "Active" : "Inactive" }}
              </button>
            </td>
            <td class="border border-gray-200 px-4 py-2 text-center align-middle">
              <button
                class="rounded bg-yellow-500 px-2.5 py-2 m-3 cursor-pointer hover:opacity-80"
                @click="editProduct(product)"
              >
                edit
              </button>
              <button
                class="rounded bg-red-700 px-2.5 py-2 m-3 cursor-pointer hover:opacity-80"
                @click="deleteProduct(product.id)"
              >
                delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const formModal = ref(false);

const isEdit = ref(false);

const category = ref({
  0: "Thiết bị khác",
  1: "Điện thoại",
  2: "Máy tính bảng",
  3: "Đồng hồ",
  4: "Phụ kiện",
  5: "Laptop",
});

const form = reactive({
  id: "",
  image: "",
  name: "",
  description: "",
  price: "",
  category: "",
  status: true,
});

const clearForm = () => {
  Object.assign(form, {
    id: "",
    image: "",
    name: "",
    description: "",
    price: "",
    category: "",
    status: "",
  });
};

const products = reactive([
  {
    id: 1,
    image: "https://picsum.photos/seed/1/100",
    name: "iPhone 15 Pro",
    description: "Điện thoại cao cấp của Apple với chip A17.",
    price: 28990000,
    category: "Điện thoại",
    status: true,
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/2/100",
    name: "Samsung Galaxy S23",
    description: "Flagship của Samsung, màn hình Dynamic AMOLED.",
    price: 24990000,
    category: "Điện thoại",
    status: true,
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/3/100",
    name: "MacBook Air M2",
    description: "Laptop mỏng nhẹ, chip Apple M2.",
    price: 32990000,
    category: "Laptop",
    status: true,
  },
  {
    id: 4,
    image: "https://picsum.photos/seed/4/100",
    name: "Tai nghe Sony WH-1000XM5",
    description: "Tai nghe chống ồn hàng đầu thế giới.",
    price: 7990000,
    category: "Phụ kiện",
    status: true,
  },
  {
    id: 5,
    image: "https://picsum.photos/seed/5/100",
    name: "Apple Watch Series 9",
    description: "Đồng hồ thông minh theo dõi sức khỏe.",
    price: 10990000,
    category: "Đồng hồ",
    status: true,
  },
  {
    id: 6,
    image: "https://picsum.photos/seed/6/100",
    name: "iPad Air 5",
    description: "Máy tính bảng mỏng nhẹ, chip M1.",
    price: 16990000,
    category: "Máy tính bảng",
    status: false,
  },
  {
    id: 7,
    image: "https://picsum.photos/seed/7/100",
    name: "Chuột Logitech MX Master 3S",
    description: "Chuột cao cấp dành cho lập trình viên và designer.",
    price: 2590000,
    category: "Phụ kiện",
    status: true,
  },
  {
    id: 8,
    image: "https://picsum.photos/seed/8/100",
    name: "Bàn phím Keychron K8",
    description: "Bàn phím cơ bluetooth layout TKL.",
    price: 1990000,
    category: "Phụ kiện",
    status: true,
  },
  {
    id: 9,
    image: "https://picsum.photos/seed/9/100",
    name: "Dell XPS 13",
    description: "Ultrabook cao cấp của Dell.",
    price: 33990000,
    category: "Laptop",
    status: true,
  },
  {
    id: 10,
    image: "https://picsum.photos/seed/10/100",
    name: "Kindle Paperwhite",
    description: "Máy đọc sách màn hình e-ink chống chói.",
    price: 3690000,
    category: "Thiết bị khác",
    status: true,
  },
]);

const closeModal = () => {
  formModal.value = false;
  isEdit.value = false;
};

const submitForm = (e) => {
  e.preventDefault();
  const newProduct = {
    id: products.length + 1,
    image: "https://picsum.photos/seed/" + (products.length + 1) + "/100",
    name: form.name,
    description: form.description,
    price: parseFloat(form.price),
    category: category.value[form.category],
    status: form.status,
  };
  if (isEdit.value) {
    const index = products.findIndex((p) => p.id == form.id);
    if (index !== -1) {
      products[index] = newProduct;
    }
  } else {
    products.push(newProduct);
  }
  formModal.value = false;
  isEdit.value = false;
  clearForm();
};

const editProduct = (product) => {
  Object.assign(form, {
    id: product.id,
    image: product.image,
    name: product.name,
    description: product.description,
    price: product.price,
    category: Object.keys(category.value).find(
      (key) => category.value[key] == product.category
    ),
    status: product.status,
  });
  isEdit.value = true;
  formModal.value = true;
};

const deleteProduct = (id) => {
  const index = products.findIndex((p) => p.id == id);
  if (index != -1) {
    products.splice(index, 1);
  }
};
</script>

<style lang="scss" scoped></style>
