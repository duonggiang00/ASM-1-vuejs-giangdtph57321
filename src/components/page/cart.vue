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
        <h2 class="text-xl font-semibold mb-4">Thêm đơn hàng mới</h2>
        <form action="" @submit.prevent="submitForm">
          <label class="block mb-1 font-medium">người mua</label>
          <select name="" id="" v-model="form.user">
            <option v-for="(user, key) in users" :key="key" :value="user.name">
              {{ user.name }}
            </option>
          </select>
          <div class="mt-3 flex flex-col">
            <select name="" id="" class="mt-3" v-model="selectedProduct">
              <option disabled value="">-- Chọn sản phẩm --</option>
              <option v-for="(product, key) in products" :key="key" :value="key">
                {{ product.name + " - " + product.price }}
              </option>
            </select>
            <input
              type="number"
              v-model.number="quantity"
              placeholder="Số lượng"
              min="1"
              class="border px-2 py-1 w-24 rounded mt-3"
            />
            <button
              type="button"
              @click="addToCart()"
              class="bg-blue-500 text-white px-3 py-1 rounded hover:opacity-80 mt-3 inline"
            >
              Thêm
            </button>
            <div
              v-if="form.items.length > 0"
              v-for="(item, key) in form.items"
              :key="key"
              class="flex mt-3 border py-2 px-2"
            >
              <input type="text" readonly v-model="item.name" />
              <input type="number" readonly v-model="item.price" />
              <input type="number" readonly v-model="item.quantity" />
            </div>
          </div>

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
            <th class="border border-gray-200 px-4 py-2">Customer Name</th>
            <th class="border border-gray-200 px-4 py-2">Quantity Total</th>
            <th class="border border-gray-200 px-4 py-2">Price Total</th>
            <th class="border border-gray-200 px-4 py-2">Status</th>
            <th class="border border-gray-200 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders">
            <td class="border border-gray-200 px-4 py-2">{{ index + 1 }}</td>
            <td class="border border-gray-200 px-4 py-2">{{ order.user }}</td>
            <td class="border border-gray-200 px-4 py-2">
              {{
                order.items.reduce((total, item) => {
                  return total + item.quantity;
                }, 0)
              }}
            </td>
            <td class="border border-gray-200 px-4 py-2">
              {{
                order.items.reduce((total, item) => {
                  return total + item.price;
                }, 0)
              }}
            </td>
            <td class="border border-gray-200 px-4 py-2 text-center align-middle">
              <button
                class="rounded px-3 py-0.5 cursor-pointer"
                :class="
                  order.status
                    ? 'bg-green-100 border-green-300 border text-green-800'
                    : 'bg-gray-100 border-gray-300 border text-gray-600'
                "
                @click="order.status = !order.status"
              >
                {{ order.status ? "Active" : "Inactive" }}
              </button>
            </td>
            <td class="border border-gray-200 px-4 py-2 text-center align-middle">
              <button
                class="rounded bg-yellow-500 px-2.5 py-2 m-3 cursor-pointer hover:opacity-80"
                @click="editOrder(order)"
              >
                edit
              </button>
              <button
                class="rounded bg-red-700 px-2.5 py-2 m-3 cursor-pointer hover:opacity-80"
                @click="deleteOrder(order.id)"
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

const form = reactive({
  user: "",
  items: [],
});

const clearForm = () => {
  Object.assign(form, {
    id: "",
    user: "",
    items: [],
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

const users = reactive([
  {
    id: 1,
    image: "https://i.pravatar.cc/100?img=1",
    name: "Nguyễn Văn A",
    email: "vana@example.com",
    age: 28,
    gender: 1,
    status: true,
  },
  {
    id: 2,
    image: "https://i.pravatar.cc/100?img=2",
    name: "Trần Thị B",
    email: "thib@example.com",
    age: 25,
    gender: 2,
    status: false,
  },
  {
    id: 3,
    image: "https://i.pravatar.cc/100?img=3",
    name: "Lê Văn C",
    email: "vanc@example.com",
    age: 30,
    gender: 1,
    status: true,
  },
  {
    id: 4,
    image: "https://i.pravatar.cc/100?img=4",
    name: "Phạm Thị D",
    email: "thid@example.com",
    age: 22,
    gender: 2,
    status: false,
  },
  {
    id: 5,
    image: "https://i.pravatar.cc/100?img=5",
    name: "Đỗ Văn E",
    email: "vane@example.com",
    age: 35,
    gender: 1,
    status: true,
  },
  {
    id: 6,
    image: "https://i.pravatar.cc/100?img=6",
    name: "Ngô Thị F",
    email: "thif@example.com",
    age: 27,
    gender: 2,
    status: true,
  },
  {
    id: 7,
    image: "https://i.pravatar.cc/100?img=7",
    name: "Vũ Văn G",
    email: "vang@example.com",
    age: 24,
    gender: 1,
    status: false,
  },
  {
    id: 8,
    image: "https://i.pravatar.cc/100?img=8",
    name: "Bùi Thị H",
    email: "thih@example.com",
    age: 31,
    gender: 2,
    status: true,
  },
  {
    id: 9,
    image: "https://i.pravatar.cc/100?img=9",
    name: "Cao Văn I",
    email: "vani@example.com",
    age: 29,
    gender: 1,
    status: true,
  },
  {
    id: 10,
    image: "https://i.pravatar.cc/100?img=10",
    name: "Lý Thị J",
    email: "thij@example.com",
    age: 26,
    gender: 2,
    status: false,
  },
]);

const orders = reactive([
  {
    id: "1",
    user: "Nguyễn Văn A",
    items: [
      {
        name: "iPhone 15 Pro",
        price: 28990000,
        quantity: 5,
      },
      {
        name: "Samsung Galaxy S23",
        price: 24990000,
        quantity: 3,
      },
      {
        name: "MacBook Air M2",
        price: 32990000,
        quantity: 4,
      },
    ],
  },
]);

const closeModal = () => {
  formModal.value = false;
  isEdit.value = false;
};

const submitForm = (e) => {
  e.preventDefault();
  const newOrder = {
    id: orders.length + 1,
    user: form.user,
    items: form.items,
    status: form.status,
  };
  if (isEdit.value) {
    const index = orders.findIndex((o) => o.id == form.id);
    if (index !== -1) {
      orders[index] = newOrder;
    }
  } else {
    orders.push(newOrder);
  }
  formModal.value = false;
  isEdit.value = false;
  clearForm();
};

const editOrder = (product) => {
  isEdit.value = true;
  formModal.value = true;
};

const deleteOrder = (id) => {
  const index = orders.findIndex((p) => p.id == id);
  if (index != -1) {
    orders.splice(index, 1);
  }
};

const selectedProduct = ref("");
const quantity = ref(1);

const addToCart = () => {
  const product = products[selectedProduct.value];
  if (!product || quantity.value < 1) return;
  form.items.push({
    name: product.name,
    price: product.price,
    quantity: quantity.value,
  });
  selectedProduct.value = "";
  quantity.value = 1;
};
</script>

<style lang="scss" scoped></style>
