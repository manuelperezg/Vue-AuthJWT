import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
import store from "./store.js";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import About from "./views/About.vue";
import Resource from "./views/Resources.vue";
import AdminPage from "./views/Admin_Page.vue";
import GuestPage from "./views/Guest_Page.vue";

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminPage,
      meta: {
        requiresAuth: true,
        canViewCol: false
      }
    },
    {
      path: "/guest",
      name: "guest",
      component: GuestPage,
      meta: {
        requiresAuth: true,
        canViewCol: true
      }
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/resources",
      name: "resources",
      component: Resource,
      meta: {
        requiresAuth: true,
        canViewCol: true
      }
    }
  ]
});
router.beforeEach((to, _from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const canViewCol = to.matched.some(record => record.meta.canViewCol);
  const role = store.getters.user.role;
  const currenUser = store.getters.user.name;

  if (requiresAuth) {
    // Si no esta auth
    if (currenUser === "") {
      return next("/login");
    }
    if (role == "colaborador") {
      // Si el colaborador no tiene permiso de ver la vista
      if (!canViewCol) {
        return next({ name: "home" });
      }
    }
    return next();
  } else {
    next();
  }
});
export default router;
