<template>
  <div class="relative">
    <button
      type="button"
      class="text-[12px] text-slate-700 leading-[30px] w-[70px] rounded-[40px] bg-[#E5E5E5]"
      ref="modalToggle"
    >Type</button>
    <ul
      class="absolute t-[100%] right-[50%] translate-x-[50%] bg-white border border-[#808080] rounded-[8px] mt-[10px]"
      :style="{
        width: 'max-content'
      }"
      ref="modalContent"
      v-if="modalFlag"
    >
      <li
        class="text-center p-[8px] cursor-pointer leading-[24px]"
        :class="[
          idx !== quizList.quizList.length - 1 && 'border-b border-[#f2f2f2]'
        ]"
        v-for="(list, idx) in quizList.quizList"
        :key="idx"
        @click="goToPage(list.link)"
      >
        {{ list.name }}
      </li>
    </ul>
  </div>
</template>
<script>
import { mapStores, setMapStoreSuffix } from 'pinia'
import { useQuiz } from '@/store/quizInfo'
setMapStoreSuffix('')
export default {
  name:'vue-lnb',
  props: {},
  components: {},
  computed: {
    ...mapStores(useQuiz),
  },
  data() {
    return {
      modalFlag: false,
    }
  },
  mounted() {
    window.addEventListener('click', this.hideModal)
  },
  methods: {
    goToPage(path) {
      if(!path) return alert('준비 중입니다.')
      this.$router.push({
        path: `/quiz/${path}`
      })
      this.modalFlag = false
    },
    hideModal(e) {
      const modalContent = this.$refs.modalContent
      const modalToggle = this.$refs.modalToggle

      if(modalToggle && modalToggle.contains(e.target)){ // 버튼 클릭시 컨텐츠 토글
        this.modalFlag = !this.modalFlag
      }

      if(modalContent && !modalContent.contains(e.target) && this.modalFlag) { // 컨텐츠 제외 클릭시 컨텐츠 Hide
        this.modalFlag = false
      }
    },
  },
  unmounted() {
    window.removeEventListener('click', this.hideModal)
  },
}
</script>