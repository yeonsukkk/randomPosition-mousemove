<template>
  <div class="fixed left-0 bottom-0 w-full">
    <div
      class="flex w-full h-[80px] border-t-[2px] border-dashed border-[#bdbdbd] bg-[#f5f5f5] text-center"
    >
      <div
        class="w-[50%] flex justify-center items-center cursor-pointer transition-all duration-200 hover:bg-[#ededed]"
      >
        Increase<br/>+
        <!-- 정답 컨텐츠 -->
        <div class="absolute top-0 left-0 p-[0.2em]"></div>
      </div>
      <div
        class="w-[50%] flex justify-center items-center cursor-pointer border-l-[2px] border-dashed transition-all duration-200 border-[#bdbdbd] hover:bg-[#ededed]"
      >
        Decrease<br/>-
        <!-- 정답 컨텐츠 -->
        <div class="absolute top-0 left-0 p-[0.2em]"></div>
      </div>
    </div>
    {{test}}
  </div>
</template>
<script>
export default {
  name:'answerToBottomFooter',
  props: {
    getStyle: Array,
  },
  components: {},
  computed: {
    test: function() {
      return this.getStyle && this.getStyle
    },
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {},
}
</script>