<template>
  <div class="w-full h-screen">
    <Header
      :detail-info="detailInfo"
    />
    <AnswerToBottom
      v-if="$route?.params?.quizType === 'answerToBottom'"
    />
    <MultipleText
      v-if="$route?.params?.quizType === 'multipleText'"
    />
    <MultipleImage
      v-if="$route?.params?.quizType === 'multipleImage'"
    />
    <OX
      v-if="$route?.params?.quizType === 'ox'"
    />
    <ShortAnswer
      v-if="$route?.params?.quizType === 'shortAnswer'"
    />
    <OrderInOrder
      v-if="$route?.params?.quizType === 'orderInOrder'"
    />
  </div>
</template>

<script>
import { mapStores, setMapStoreSuffix } from 'pinia'
import { useQuiz } from '@/store/quizInfo'
setMapStoreSuffix('')
import Header from '@/components/Navigation/'
import AnswerToBottom from '@/components/quiz/AnswerToBottom'
import MultipleText from '@/components/quiz/MultipleText'
import MultipleImage from '@/components/quiz/MultipleImage'
import OX from '@/components/quiz/OX'
import ShortAnswer from '@/components/quiz/ShortAnswer'
import OrderInOrder from '@/components/quiz/OrderInOrder'
export default {
  name: 'quizMainPage',
  components: {
    Header,
    MultipleText,
    MultipleImage,
    OX,
    ShortAnswer,
    AnswerToBottom,
    OrderInOrder,
  },
  computed: {
    ...mapStores(useQuiz),
  },
  data() {
    return {
      quizType: null,
      detailInfo: {},
    }
  },
  async mounted() {
    await this.$nextTick()
    this.quizType = this.$route?.params?.quizType
    this.detailInfo = this.$route?.params?.quizType && this.quizList.getQuizList(this.quizType)
  },
}
</script>