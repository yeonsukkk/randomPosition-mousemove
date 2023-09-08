<template>
  <div class="h-screen flex flex-col justify-center items-center gap-[25px]">
    <h1 class="text-[24px] font-[700] mb-[10px]">아이스크림 프로토타입 문제 유형</h1>
    <div
      v-for="(list, idx) in list"
      :key="idx"
    >
      <button
        type="button"
        class="w-[220px] border border-[#FF7967] text-[#FF7967] rounded-[8px] leading-[40px] transition-all duration-200 hover:bg-[#FF7967] hover:text-white"
        @click="goToPage(list.link)"
      >
        {{ list.name }}
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'mainPage',
  data() {
    return {
      list: [
        {
          name: '하단 정답으로 이동 유형',
          link: 'answerToBottom',
        },
        {
          name: '영역 선택 유형',
          link: 'selectArea',
        },
      ],
    }
  },
  methods: {
    goToPage(path) {
      if(!path) return alert('준비 중입니다.')
      this.$router.push({
        path: `/quiz/${path}`
      })
    },
  },
}
</script>