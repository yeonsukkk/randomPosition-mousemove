<template>
  <div
    class="fixed top-[10px] right-[10px] z-20"
  >
    <button
      type="button"
      class="text-[12px] text-slate-700 leading-[30px] w-[70px] rounded-[40px] bg-[#E5E5E5]"
      ref="modalToggle"
    >Info</button>
    <div
      class="w-[400px] fixed t-[10px] right-[10px] pt-[10px]"
      ref="modalContent"
      v-if="modalFlag"
    >
      <div
        class="w-full h-full p-4 border-2 border-[#808080] bg-white rounded-2xl"
      >
        <h2 class="font-bold text-black text-[17px] mb-[2px]">{{ detailInfo.title }}</h2>
        <div class="flex w-full">
          <div class="w-[80px] text-[#333]">참고 링크</div>
          <div class="w-[calc(100%_-_80px)] flex flex-col gap-[2px]">
            <p
              class="max-w-full text-ellipsis whitespace-nowrap overflow-hidden cursor-pointer text-[#333]"
              v-for="(link, idx) in detailInfo.link"
              :key="idx"
              @click="goToSite(link)"
            >
              {{ link }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DetailInfo',
  props: {
    detailInfo: Object,
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
    goToSite(link) {
      if(!link) return alert('존재하지 않은 링크입니다.')
      window.open(link)
    }
  },
  unmounted() {
    window.removeEventListener('click', this.hideModal)
  },
}
</script>