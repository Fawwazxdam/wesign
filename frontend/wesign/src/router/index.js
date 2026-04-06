import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/Home.vue";
import Excercise from "@/pages/Excercise.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import Dashboard from "@/pages/Authenticated/Dashboard.vue";
import EventIndex from "@/views/events/index.vue";
import EventAdd from "@/views/events/add.vue";
import EventDetail from "@/views/events/detail.vue";
import EventEdit from "@/views/events/edit.vue";

const routes = [
    { path: "/", name: "Home", component: Home },
    { path: "/excercise", name: "Excercise", component: Excercise },

    { path: "/login", name: "Login", component: Login, meta: { layout: "auth" } },
    { path: "/register", name: "Register", component: Register, meta: { layout: "auth" } },

    { path: "/dashboard", name: "Dashboard", component: Dashboard, meta: { layout: "authenticated" } },
    { path: "/events", name: "EventIndex", component: EventIndex, meta: { layout: "authenticated" } },
    { path: "/events/add", name: "EventAdd", component: EventAdd, meta: { layout: "authenticated" } },
    { path: "/events/:id", name: "EventDetail", component: EventDetail, meta: { layout: "authenticated" } },
    { path: "/events/:id/edit", name: "EventEdit", component: EventEdit, meta: { layout: "authenticated" } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
