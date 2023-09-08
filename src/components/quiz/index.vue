<template>
  <div class="w-full h-screen">
    <Header />
    <AnswerToBottom
      v-if="quizType === 'answerToBottom'"
      :detail-info="detailInfo"
    />
    <SelectArea
      v-if="quizType === 'selectArea'"
      :detail-info="detailInfo"
    />
  </div>
</template>

<script>
import { mapStores, setMapStoreSuffix } from 'pinia'
import { useQuiz } from '@/store/quizInfo'
setMapStoreSuffix('')
import Header from '@/components/Navigation/Header'
import AnswerToBottom from '@/components/quiz/AnswerToBottom'
import SelectArea from '@/components/quiz/SelectArea'
export default {
  name: 'quizMainPage',
  components: {
    AnswerToBottom,
    SelectArea,
    Header,
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