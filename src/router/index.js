import { createRouter, createWebHistory } from "vue-router";

import TeamsList from "../components/teams/TeamsList.vue";
import UsersList from "../components/users/UsersList.vue";
import TeamMembers from "../components/teams/TeamMembers.vue";
import NotFound from "../components/nav/NotFound.vue";
import Auth from "../components/auth/Auth.vue"


const routes = [
  {
    path: "/",
    redirect: "/teams"
  },
  {
    name: "teams",
    path: "/teams",
    meta: { needsAuth: true },
    component: TeamsList,
    children: [
      {
        name: "team-members",
        path: ":teamId",
        component: TeamMembers,
        props: true
      }
    ]
  },
  {
    name: "users",
    path: "/users",
    component: UsersList
  },
  {
    path: "/:notFound(.*)",
    component: NotFound
  },
  {
    name: "auth",
    path: "/login",
    component: Auth
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(function(to, _from, next) {
  if (to.meta.needsAuth) {
    if (localStorage.getItem("login") === null) {
      console.log("Needs auth!");
      next({ name: "auth" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
