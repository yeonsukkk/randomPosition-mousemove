import { defineStore } from 'pinia'

export const  useQuiz = defineStore('quizList', () => {
  const isCorrect = {
    increase: [],
    decrease: [],
  }
  const quizList = [
    {
      name: '선다형 텍스트 유형',
      link: 'multipleText',
    },
    {
      name: '선다형 이미지 유형',
      link: 'multipleImage',
    },
    {
      name: 'OX 유형',
      link: 'ox',
    },
    {
      name: '단답형',
      link: 'shortAnswer',
    },
    {
      name: '하단 정답으로 이동 유형',
      link: 'answerToBottom',
    },
    {
      name: '순서 맞추기 유형',
      link: 'orderInOrder',
    },
  ]

  function getQuizList(path) {
    const quizInfo = {
      title: '',
      link: [],
    }
    switch(path) {
      case 'multipleText':
        quizInfo.title = '선다형 텍스트 유형'
        quizInfo.link[0] = 'https://anton.app/en_us/learn/us-math-grade-1/topic-01-numbers-and-counting/exercises-03-counting-1-to-120/exercise-03/'
        break;
      case 'multipleImage':
        quizInfo.title = '선다형 이미지 유형'
        quizInfo.link[0] = 'https://anton.app/en_us/learn/us-math-grade-1/topic-02-add-and-subtract-within-20/exercises-02-subtract-within-10/exercise-03/'
        quizInfo.link[1] = 'https://anton.app/en_us/learn/us-math-grade-1/topic-09-data-and-graphs/exercises-05-tally-charts/exercise-02/'
        break;
      case 'ox':
        quizInfo.title = 'OX 유형'
        quizInfo.link[0] = 'https://anton.app/en_us/learn/us-science-3-5/topic-10-energy/exercises-03-electricity/exercise-04/'
        break;
      case 'shortAnswer':
        quizInfo.title = '단답형'
        quizInfo.link[0] = 'https://anton.app/en_us/learn/us-math-k/topic-04-add-and-subtract/exercises-07-picture-problems/exercise-04/'
        quizInfo.link[1] = 'https://anton.app/en_us/learn/us-math-grade-2/topic-04-add-and-subtract-within-20/exercises-01-add-within-20/exercise-03/'
        quizInfo.link[2] = 'https://anton.app/en_us/learn/us-math-grade-1/topic-03-addition-and-subtraction-strategies/exercises-04-number-lines-addition/exercise-01/'
        break;
      case 'answerToBottom':
        quizInfo.title = '하단 정답으로 이동 유형'
        quizInfo.link[0] = 'https://anton.app/en_us/learn/us-math-grade-6/topic-04-integers/exercises-02-integers-problem-solving/exercise-01/'
        quizInfo.link[1] = 'https://anton.app/en_us/learn/us-math-k/topic-06-sorting-and-classifying/exercises-04-sort-by-shape/exercise-03/'
        break;
      case 'orderInOrder':
        quizInfo.title = '순서 맞추기 유형'
        quizInfo.link[0] = 'https://anton.app/en_us/learn/us-math-grade-2/topic-03-comparing-numbers/exercises-01-order-numbers/exercise-01/'
        break;
    }
    return quizInfo
  }

  return {
    quizList,
    isCorrect,
    getQuizList,
  }
})