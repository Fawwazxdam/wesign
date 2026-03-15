import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/Home.vue";
import Excercise from "@/pages/Excercise.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import Dashboard from "@/pages/Authenticated/Dashboard.vue";
import Event from "@/pages/Authenticated/Event.vue";

const routes = [
    {path: "/", name: "Home", component: Home},
    {path: "/excercise", name: "Excercise", component: Excercise},

    {path: "/login", name: "Login", component: Login, meta: { layout: "auth" }},
    {path: "/register", name: "Register", component: Register, meta: { layout: "auth" }},

    {path: "/dashboard", name: "Dashboard", component: Dashboard, meta: { layout: "authenticated" }},
    {path: "/events", name: "Event", component: Event, meta: { layout: "authenticated" }},

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;