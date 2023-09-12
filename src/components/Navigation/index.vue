<template>
  <header class="fixed flex justify-between w-full top-0 left-0 h-[50px] bg-[#f8f8f8] px-[2.5%] z-[100]">
    <div
      class="flex items-center cursor-pointer"
      @click="goToMain"
    >
      <img :src="btnClosed" alt="메인으로 돌아가기" />
    </div>
    <div class="flex items-center gap-[8px]">
      <Lnb />
      <DetailInfo
        :detail-info="detailInfo"
      />
    </div>
  </header>
</template>
<script>
import DetailInfo from '@/components/Navigation/DetailInfo.vue'
import Lnb from '@/components/Navigation/Lnb.vue'
import btnClosed from '@/assets/btn-closed.svg'
export default {
  name:'vue-header',
  props: {
    detailInfo: Object,
  },
  components: {
    DetailInfo,
    Lnb,
  },
  computed: {},
  data() {
    return {
      btnClosed,
    }
  },
  mounted() {},
  methods: {
    goToMain() {
      const answer = confirm('메인 페이지로 돌아가시겠습니까?')
      if(!answer) return
      this.$router.push({
        path: '/'
      })
    },
  },
}
</script>