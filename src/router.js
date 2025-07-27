import { createRouter, createWebHistory } from "vue-router"
import Product from "./components/page/product.vue"
import User from "./components/page/user.vue"
import Cart from "./components/page/cart.vue"

const routes = [
    {path:'/product',component: Product},
    {path:'/user',component: User},
    {path:'/cart',component: Cart}
] 
const router = createRouter({
    history: createWebHistory(),
    routes,
 })

export default router