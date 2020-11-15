import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import LaunchDetails from "../views/LaunchDetails.vue";
import Starlink from "../views/Starlink.vue";
import Stats from "../views/Stats.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/details/:flight_number",
    name: "Details",
    component: LaunchDetails,
    props: true,
  },
  {
    path: "/stats",
    component: Stats,
  },
  {
    path: "/starlink",
    component: Starlink,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
