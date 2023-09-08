import { createRouter, createWebHistory } from "vue-router";
import Quiz from '@/components/quiz/index.vue'
import SelfDrag from '@/components/Self/Drag.vue'
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
    component: Quiz
  },
  {
    path: '/self/drag',
    name: 'dragTest',
    component: SelfDrag
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export {router}