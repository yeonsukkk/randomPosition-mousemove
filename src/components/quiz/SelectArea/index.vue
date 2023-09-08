<template>
  <div
    class="relative w-full h-full"
    v-if="isLoaded"
  >
    selectArea
    <DetailInfo
      :detail-info="detailInfo"
    />
  </div>
</template>

<script>
import { mapStores, setMapStoreSuffix } from 'pinia'
import { useQuiz } from '@/store/quizInfo'
setMapStoreSuffix('')
import DetailInfo from '@/components/quiz/DetailInfo.vue'
export default {
  name: 'answerToBottom',
  components: {
    DetailInfo,
  },
  props: {
    detailInfo: Object,
  },
  data() {
    return {
      isLoaded: false,
    }
  },
  computed: {
    ...mapStores(useQuiz),
  },
  mounted() {
    this.isLoaded = this.detailInfo && true
    // console.log(this.detailInfo)
  },
}
</script>