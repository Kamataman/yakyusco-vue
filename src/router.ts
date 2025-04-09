// Setting Router
import { createRouter, createWebHistory } from "vue-router";
import AppTop from "./components/AppTop.vue";
import TeamHomeView from "./components/TeamHomeView.vue";
import PlayerListView from "./components/PlayerListView.vue";
import GameResultListView from "./components/GameResultListView.vue";
import GameResultView from "./components/GameResultView.vue";
import StatsView from "./components/Stats.vue";
import TeamTop from "./components/TeamTop.vue";
import AddGameResultView from "./components/AddGameResultView.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
