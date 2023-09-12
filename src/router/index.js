import { createRouter, createWebHistory } from "vue-router";
import Quiz from '@/components/quiz/index.vue'
import MainPage from '@/components/MainPage.vue'

const routes = [
  {
    path: '/',
    name: 'mainPage',
    component: MainPage,
  },
  {
    path: '/quiz/:quizType',
    name: 'quizPage',
    component: Quiz,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export {router}