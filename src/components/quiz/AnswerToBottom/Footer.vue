<template>
  <div class="fixed left-0 bottom-0 w-full">
    <div
      class="flex w-full h-[80px] border-t-[2px] border-dashed border-[#bdbdbd] bg-[#f5f5f5] text-center"
    >
      <p
        class="w-[50%] flex justify-center items-center cursor-pointer transition-all duration-200 hover:bg-[#ededed]"
        @mouseover="checkAnswer('increase')"
      >
          Increase<br/>+
      </p>
      <p
        class="w-[50%] flex justify-center items-center cursor-pointer border-l-[2px] border-dashed transition-all duration-200 border-[#bdbdbd] hover:bg-[#ededed]"
        @mouseover="checkAnswer('decrease')"
      >
        Decrease<br/>-
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name:'answerToBottomFooter',
  props: {},
  components: {},
  computed() {},
  data() {
    return {
    }
  },
  mounted() {},
  methods: {
    checkAnswer(type) {
      if(type === 'increase') {
        console.log('increase:::', type)
        return
      }
      if(type === 'decrease') {
        console.log('decrease:::', type)
        return
      }
    },
  },
}
</script>