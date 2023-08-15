import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PowerRankings from "../views/PowerRankings.vue"
import EditPowerRankings from "../views/EditPowerRankings.vue"
import CreatePowerRanking from "../views/CreatePowerRanking.vue"
import Team from "../views/Team.vue"
import Player from "../views/Player.vue"
import Draft from "../views/Draft.vue"
import Login from "../views/Login.vue"
import CareerStandings from "../views/CareerStandings.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: "/draft",
      name: "draft",
      component: Draft,
      meta: {
        guest: true
      }
  },
  {
      path: "/power-rankings/:year/:week",
      name: "power-rankings",
      component: PowerRankings,
      meta: {
        guest: true
      },
  },
  {
    path: "/power-rankings/:year/:week/edit",
    name: "edit-power-rankings",
    component: EditPowerRankings,
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")) {
        next();
      } else {
        next({
          path: '/login'
        });
      }
    }
  },
  {
    path: "/power-rankings/create",
    name: "create-power-rankings",
    component: CreatePowerRanking,
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")) {
        next();
      } else {
        next({
          path: '/login'
        });
      }
    }
  },
  {
      path: '/team/:teamId',
      name: 'team',
      component: Team,
      meta: {
        guest: true
      }
  },
  {
      path: '/player/:playerId',
      name: 'player',
      component: Player,
      meta: {
        guest: true
      }
  },
  {
    path: '/career-standings',
    name: 'career-standings',
    component: CareerStandings,
    meta: {
      guest: true
    }
  }
  ]
});

export default router
