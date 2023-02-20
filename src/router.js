import { createRouter, createWebHashHistory } from "vue-router";

// import { getToken, setToken } from "@/utils/cookieJar";
const whiteList = ["/", "/login", "about"];
const routes = [
  {
    path: "/:name?",
    name: "index",
    component: () => import("@/maphoto/index.vue"),
    meta: {
      title: "maphoto",
      keepAlive: true,
    },
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
// 全局路由守卫
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
  // const token = getToken();
  // console.log(token);
  // if (whiteList.indexOf(to.path) !== -1) {
  //   next();
  // } else {
  //   if (token) {
  //     next();
  //   } else {
  //     next(`/login?redirect=${to.path}`);
  //   }
  // }
});
router.afterEach((to, from, next) => {});
export default router;
