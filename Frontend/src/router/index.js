import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import auth from "../auth";


const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    beforeEnter: async (to, from, next) => {
      let authResult = await auth.authenticated();
      if (!authResult) {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/SignUpView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },

  {
    path: "/add",
  name: "add",
  component: () => import("../views/AddPostView.vue"),
  beforeEnter: async (to, from, next) => {
    let authResult = await auth.authenticated();
    if (!authResult) {
      next("/login");
    } else {
      next();
    }
  },
},
{
  path: "/posts/:id",
  name: "post",
  component: () => import("../views/PostView.vue"),
  beforeEnter: async (to, from, next) => {
    let authResult = await auth.authenticated();
    if (!authResult) {
      next("/login");
    } else {
      next();
    }
  },
},
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
