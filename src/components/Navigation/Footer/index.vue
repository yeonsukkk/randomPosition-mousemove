<template>
  <div class="fixed left-0 bottom-0 w-full">
    <AnswerToBttom
      v-if="quizType === 'answerToBottom'"
    />
  </div>
</template>
<script>
import { mapStores, setMapStoreSuffix } from 'pinia'
import { useQuiz } from '@/store/quizInfo'
setMapStoreSuffix('')
import AnswerToBttom from '@/components/quiz/AnswerToBottom/Footer.vue'
export default {
  name: 'vue-fotoer',
  components: {
    AnswerToBttom,
  },
  computed: {
    ...mapStores(useQuiz),
  },
  data() {
    return {
      quizType: null,
    }
  },
  async mounted() {
    await this.$nextTick()
    this.quizType = this.$route?.params?.quizType
    this.detailInfo = this.$route?.params?.quizType && this.quizList.getQuizList(this.quizType)
  },
}
</script>