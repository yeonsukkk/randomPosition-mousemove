<template>
  <p
    v-if="isLoaded"
    class="inline-block bg-[#f1f1f1] p-[0.5em] leading-[2] cursor-pointer absolute z-[100] select-none transition-shadow duration-150"
    :style="{
      boxShadow: mouseFlag ? '2px 2px 6px #bbb': '1px 1px 2px #bbb',
      zIndex: mouseFlag ? '10000' : '100',
      left: `${setPosition.x}px`,
      top: `${setPosition.y}px`,
    }"
    ref="item"
    @mousedown="startDrag($event, this.$refs.item)"
    @mouseup="endDrag"
  >
    {{this.itemInfo.itemName}}
  </p>
</template>
<script>
export default {
  name:'answerToBottom Item',
  props: {
    itemInfo: Object,
    getPosition: Function,
    moveMouse: Function,
  },
  components: {},
  emits: [
    'childItem',
    'startDrag',
  ],
  computed: {
    setPosition: function() {
      return this.mouseFlag && this.moveAt(this.itemInfo.parentPosition.page.x, this.itemInfo.parentPosition.page.y)
    },
  },
  data() {
    return {
      isLoaded: false,
      itemTag: null,
      mouseFlag: false,
      parentInfo: {},
      containerSize: {
        width: 0,
        height: 0,
      },
      shift: {
        x: 0,
        y: 0,
      },
    }
  },
  async mounted() {
    this.isLoaded = this.itemInfo && true
    await this.$nextTick()
    this.itemTag = this.$refs?.item
    this.getItemTag() // 부모 컴포넌트로 자식 요소 보내기

    // 아이템 위치 설정
    this.parentInfo = this.getPosition(this.itemTag)
    this.itemTag.style.left = this.parentInfo.x + 'px'
    this.itemTag.style.top = this.parentInfo.y + 'px'
    this.containerSize = this.parentInfo.containerSize

  },
  methods: {
    getItemTag() { // 부모 컴포넌트로 자식 요소 보내기
      this.$emit('childItem', this.itemTag)
    },
    startDragFlag(bool) { // 마우스 이벤트 발생했는지 여부 부모에게 전달
      this.$emit('startDrag', bool)
    },
    async startDrag(e, target) {
      this.mouseFlag = true
      this.startDragFlag(this.mouseFlag)
      this.moveMouse(e) // 마우스 이벤트 발생시 초기 위치값 설정해주기
      const containerMargin = (window.innerWidth - this.containerSize.width) / 2
      this.shift.x = e.pageX - (target.getBoundingClientRect().left - containerMargin)
      this.shift.y = e.pageY - (target.getBoundingClientRect().top - 50)

      this.moveAt(e.pageX, e.pageY)
    },
    moveAt(pageX, pageY) {
      if(this.mouseFlag) {
        const x = pageX - this.shift.x
        const y = pageY - this.shift.y

        return {x, y}
      }
    },
    endDrag() {
      this.mouseFlag = false
      this.startDragFlag(this.mouseFlag)
    },
  },
}
</script>