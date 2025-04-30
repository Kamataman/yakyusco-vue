// Setting Router
import { createRouter, createWebHistory } from "vue-router";
import AppTop from "@/views/AppTop.vue";
import TeamHomeView from "@/views/TeamHomePage.vue";
import PlayerListView from "@/views/PlayerListPage.vue";
import GameResultListView from "@/views/GameResultListPage.vue";
import GameResultView from "@/views/GameResultPage.vue";
import StatsView from "@/views/StatsPage.vue";
import TeamTop from "@/views/TeamTop.vue";
import AddGameResultView from "@/views/AddGameResultPage.vue";
import Testview from "@/views/testview.vue";

const routes = [
  { path: "/", component: AppTop },
  {
    path: "/:team",
    component: TeamTop,
    children: [
      { path: "", name: "home", component: TeamHomeView },
      {
        path: "gameresults",
        name: "gameresults",
        component: GameResultListView,
      },
      {
        path: "gameresult/:gameResultId",
        name: "gameresult",
        component: GameResultView,
      },
      {
        path: "gameresult/add",
        name: "addgameresult",
        component: AddGameResultView,
      },
      { path: "players", name: "players", component: PlayerListView },
      { path: "stats", name: "stats", component: StatsView },
    ],
  },
  { path: "/test", component: Testview },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
