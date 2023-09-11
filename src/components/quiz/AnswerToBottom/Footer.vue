<template>
  <div
    class="fixed left-0 bottom-0 w-full"
  >
    <div
      v-if="quizList.isCorrect.increase.length >= 3 && quizList.isCorrect.decrease.length >= 3"
    >
      끝나따
    </div>
    <div
      else
      class="flex w-full h-[80px] border-t-[2px] border-dashed border-[#bdbdbd] bg-[#f5f5f5] text-center"
    >
      <div
        class="w-[50%] flex justify-center items-center cursor-pointer transition-all duration-200 hover:bg-[#ededed] relative"
      >
        Increase<br/>+
        <!-- 정답 컨텐츠 -->
        <div
          class="absolute top-0 left-0 p-[0.2em] flex items-center gap-[2px]"
          v-if="quizList.isCorrect.increase.length > 0"
        >
          <span
            class="w-[7px] h-[7px] rounded-[50%] bg-[#4caf50] transition-all duration-200"
            v-for="(item, idx) in quizList.isCorrect.increase"
            :key="idx"
            :title="item"
          ></span>
        </div>
      </div>
      <div
        class="w-[50%] flex justify-center items-center cursor-pointer border-l-[2px] border-dashed transition-all duration-200 border-[#bdbdbd] hover:bg-[#ededed] relative"
      >
        Decrease<br/>-
        <!-- 정답 컨텐츠 -->
        <div
          class="absolute top-0 left-0 p-[0.2em] flex items-center gap-[2px]"
          v-if="quizList.isCorrect.decrease.length > 0"
        >
          <span
            class="w-[7px] h-[7px] rounded-[50%] bg-[#4caf50] transition-all duration-200"
            v-for="(item, idx) in quizList.isCorrect.decrease"
            :key="idx"
            :title="item"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapStores, setMapStoreSuffix } from 'pinia'
import { useQuiz } from '@/store/quizInfo'
setMapStoreSuffix('')
export default {
  name:'answerToBottomFooter',
  props: {
    answerStyle: Object,
  },
  components: {},
  computed: {
    ...mapStores(useQuiz),
  },
  data() {
    return {
    }
  },
  mounted() {},
  methods: {},
}
</script>