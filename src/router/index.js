import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import * as fb from "../firebase";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Dashboard.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/adminDashboard",
    name: "AdminDashboard",
    component: () => import("../views/AdminDashboard.vue"),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
    beforeEnter: (to, from, next) => {
      if (store.state.userProfile.admin === undefined) next(false);
      else next();
    },
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const currentUser = fb.auth.currentUser;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) {
    next("/");
  } else if (!requiresAuth && currentUser) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
