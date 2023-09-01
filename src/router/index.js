import { createRouter, createWebHistory } from "vue-router";
import AnswerToBottom from '@/components/AnswerToBottom'
import MainPage from '@/components/MainPage.vue'

const routes = [
  {
    path: '/',
    name: 'mainPage',
    component: MainPage,
  },
  {
    path: '/answerToBottom',
    name: 'answerToBottom',
    component: AnswerToBottom
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export {router}