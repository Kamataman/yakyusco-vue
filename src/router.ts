// Setting Router
import { createRouter, createWebHistory } from "vue-router";
import AppTop from "@/views/AppTop.vue";
import Login from "@/views/Login.vue";
import SignUp from "@/views/SignUp.vue";
import InitialSetting from "@/views/InitialSetting.vue";
import TeamHomePage from "@/views/TeamHomePage.vue";
import PlayerListPage from "@/views/PlayerListPage.vue";
import GameResultListPage from "@/views/GameResultListPage.vue";
import GameResultPage from "@/views/GameResultPage.vue";
import StatsPage from "@/views/StatsPage.vue";
import TeamTop from "@/views/TeamTop.vue";
import Testview from "@/views/testview.vue";

const routes = [
  { path: "/", component: AppTop },
  { name: "login", path: "/login", component: Login },
  { name: "signup", path: "/signup", component: SignUp },
  {
    name: "initialsetting",
    path: "/initialsetting",
    component: InitialSetting,
    meta: { requiresAuth: true },
  },
  {
    name: "teamTop",
    path: "/:team",
    component: TeamTop,
    children: [
      { path: "", name: "home", component: TeamHomePage },
      {
        path: "gameresults",
        name: "gameresults",
        component: GameResultListPage,
      },
      {
        path: "gameresult/:gameResultId",
        name: "gameresult",
        component: GameResultPage,
        props: { isAdd: false },
      },
      {
        path: "gameresult/add",
        name: "addgameresult",
        component: GameResultPage,
        props: { isAdd: true },
        meta: { requiresAuth: true },
      },
      { path: "players", name: "players", component: PlayerListPage },
      { path: "stats", name: "stats", component: StatsPage },
    ],
  },
  { path: "/test", component: Testview },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
