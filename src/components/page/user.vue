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
        <h2 class="text-xl font-semibold mb-4">Thêm người dùng mới</h2>
        <form action="" @submit.prevent="submitForm">
          <label class="block mb-1 font-medium">Tên người dùng</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label class="block mb-1 font-medium">email</label>
          <input
            v-model="form.email"
            type="text"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label class="block mb-1 font-medium">age</label>
          <input
            v-model="form.age"
            type="number"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div class="mb-2">
            <label class="block mb-1 font-medium">Giới tính</label>
            <div class="flex items-center gap-4">
              <label class="flex items-center gap-1">
                <input type="radio" v-model="form.gender" value="1" name="gender" />
                Nam
              </label>
              <label class="flex items-center gap-1">
                <input type="radio" v-model="form.gender" value="2" name="gender" />
                Nữ
              </label>
            </div>
          </div>
          <label for="" class="block mb-1 font-medium">Status</label>
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
      <table class="w-full">
        <thead class="bg-gray-300">
          <tr>
            <th class="border border-gray-200 px-4 py-2">ID</th>
            <th class="border border-gray-200 px-4 py-2">image</th>
            <th class="border border-gray-200 px-4 py-2">Name</th>
            <th class="border border-gray-200 px-4 py-2">Email</th>
            <th class="border border-gray-200 px-4 py-2">Age</th>
            <th class="border border-gray-200 px-4 py-2">Gender</th>
            <th class="border border-gray-200 px-4 py-2">Status</th>
            <th class="border border-gray-200 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users">
            <td class="border border-gray-200 px-4 py-2">{{ index + 1 }}</td>
            <td>
              <img :src="user.image" alt="" class="w-full" />
            </td>
            <td class="border border-gray-200 px-4 py-2">{{ user.name }}</td>
            <td class="border border-gray-200 px-4 py-2">{{ user.email }}</td>
            <td class="border border-gray-200 px-4 py-2">{{ user.age }}</td>
            <td class="border border-gray-200 px-4 py-2">
              {{ user.gender == 1 ? "Nam" : user.gender == 2 ? "nữ" : "" }}
            </td>
            <td class="border border-gray-200 px-4 py-2">
              <button
                class="rounded px-3 py-0.5 cursor-pointer"
                :class="
                  user.status
                    ? 'bg-green-100 border-green-300 border text-green-800'
                    : 'bg-gray-100 border-gray-300 border text-gray-600'
                "
                @click="user.status = !user.status"
              >
                {{ user.status ? "Active" : "Inactive" }}
              </button>
            </td>
            <td class="border border-gray-200 px-4 py-2">
              <button
                class="rounded bg-yellow-500 px-2.5 py-2 m-3 cursor-pointer hover:opacity-80"
                @click="editProduct(user)"
              >
                edit
              </button>
              <button
                class="rounded bg-red-700 px-2.5 py-2 m-3 cursor-pointer hover:opacity-80"
                @click="deleteProduct(user.id)"
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
  id: "",
  image: "",
  name: "",
  email: "",
  age: "",
  gender: "",
  status: true,
});

const clearForm = () => {
  Object.assign(form, {
    id: "",
    image: "",
    name: "",
    email: "",
    age: "",
    gender: "",
    status: true,
  });
};

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

const closeModal = () => {
  formModal.value = false;
  isEdit.value = false;
};

const submitForm = (e) => {
  e.preventDefault();
  const newUser = {
    id: users.length + 1,
    image: "https://picsum.photos/seed/" + (users.length + 1) + "/100",
    name: form.name,
    email: form.email,
    age: parseInt(form.age),
    gender: form.gender,
    status: form.status,
  };
  if (isEdit.value) {
    const index = users.findIndex((p) => p.id == form.id);
    if (index !== -1) {
      users[index] = newUser;
    }
  } else {
    users.push(newUser);
  }
  formModal.value = false;
  isEdit.value = false;
  clearForm();
};

const editProduct = (user) => {
  Object.assign(form, {
    id: user.id,
    image: user.image,
    name: user.name,
    email: user.email,
    age: user.age,
    gender: user.gender,
    status: user.status,
  });
  isEdit.value = true;
  formModal.value = true;
};

const deleteProduct = (id) => {
  const index = users.findIndex((p) => p.id == id);
  if (index != -1) {
    users.splice(index, 1);
  }
};
</script>

<style lang="scss" scoped></style>
