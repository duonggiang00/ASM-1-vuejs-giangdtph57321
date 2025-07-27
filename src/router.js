import { createRouter, createWebHistory } from "vue-router"
import Product from "./components/page/product.vue"
import User from "./components/page/user.vue"

const routes = [
    {path:'/product',component: Product},
    {path:'/user',component: User}
] 
const router = createRouter({
    history: createWebHistory(),
    routes,
 })

export default router