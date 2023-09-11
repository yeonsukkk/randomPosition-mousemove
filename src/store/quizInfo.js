import { defineStore } from 'pinia'

export const  useQuiz = defineStore('quizList', () => {
  const isCorrect = {
    increase: [],
    decrease: [],
  }
  function getQuizList(path) {
    const quizInfo = {
      title: '',
      link: [],
    }
    switch(path) {
      case 'answerToBottom':
        quizInfo.title = '하단 정답으로 이동'
        quizInfo.link[0] = 'https://anton.app/en_us/learn/us-math-grade-6/topic-04-integers/exercises-02-integers-problem-solving/exercise-01/'
        quizInfo.link[1] = 'https://anton.app/en_us/learn/us-math-k/topic-06-sorting-and-classifying/exercises-04-sort-by-shape/exercise-03/'
        break;
      case 'selectArea':
        quizInfo.title = '영역 선택'
        quizInfo.link[0] = 'https://anton.app/en_us/learn/us-math-k/topic-07-shapes/exercises-02-two-dimensional-shapes-01/exercise-02/'
        quizInfo.link[1] = 'https://anton.app/en_us/learn/us-math-grade-2/topic-03-comparing-numbers/exercises-01-order-numbers/exercise-02/'
        break;
    }
    return quizInfo
  }

  return {
    isCorrect,
    getQuizList,
  }
})