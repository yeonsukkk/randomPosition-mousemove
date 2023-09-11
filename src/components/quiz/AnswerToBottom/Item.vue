<template>
  <p
    v-if="isLoaded"
    class="inline-block bg-[#f1f1f1] p-[0.5em] leading-[2] cursor-pointer absolute z-[100] select-none overflow-hidden transition-shadow duration-150"
    :style="{
      boxShadow: mouseFlag ? '2px 2px 6px #bbb': '1px 1px 2px #bbb',
      zIndex: mouseFlag ? '10000' : '100',
      'transform': `translate(${setPosition.x}px, ${setPosition.y}px)`
    }"
    ref="item"
    @mousedown="startDrag($event, this.$refs.item)"
    @mouseup="endDrag"
    @touchstart="startDrag($event, this.$refs.item)"
    @touchend="endDrag"
  >
    {{itemInfo.item.name}}
  </p>
</template>
<script>
import { mapStores, setMapStoreSuffix } from 'pinia'
import { useQuiz } from '@/store/quizInfo'
setMapStoreSuffix('')
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
    'getStyle',
  ],
  computed: {
    ...mapStores(useQuiz),
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
      const pageX = e.type === 'touchstart' ? e.changedTouches[0].pageX : e.pageX
      const pageY = e.type === 'touchstart' ? e.changedTouches[0].pageY : e.pageY
      this.shift.x = pageX - (target.getBoundingClientRect().left - containerMargin)
      this.shift.y = pageY - (target.getBoundingClientRect().top - 50)

      this.moveAt(pageX, pageY)
    },
    moveAt(pageX, pageY) { // 마우스 무브 이벤트 값에 따라 translate값 바꾸기
      this.itemTag.style.removeProperty?.('transition') // 기존 transition 없애기
      if(this.mouseFlag) {
        const x = pageX - this.shift.x - this.parentInfo.x
        const y = pageY - this.shift.y - this.parentInfo.y
        return {x, y}
      }
    },
    endDrag() {
      this.mouseFlag = false
      this.answerCheck('isCorrect')
      this.startDragFlag(this.mouseFlag)
    },
    answerCheck() { // 하단 정답 영역에 들어왔는지 체크
      const answerType = this.itemInfo.item.answerType
      const item = this.itemTag
      const { bottom, left, width } = item.getBoundingClientRect()
      const { innerWidth, innerHeight } = window
      const stylePosition = {
        isIn: false,
        isSide: null,
      }
      this.itemTag.style.transition = 'all 0.5s'

      if(bottom >= innerHeight - 80) {
        // console.log('들어와따')
        stylePosition.isIn = true
        if(left + (width / 2) <= innerWidth / 2) { // 왼쪽 영역
          stylePosition.isSide = 'left'
          if(answerType === 'increase') { // 정답일 경우
            this.itemTag.style.backgroundColor = '#4caf50'
            setTimeout(() => {
              this.itemTag.style.width = 0
              this.itemTag.style.height = 0
              this.itemTag.style.padding = 0
              this.quizList.isCorrect.increase = [...this.quizList.isCorrect.increase, this.itemTag.innerHTML]
              setTimeout(() => {
                this.itemTag.style.display = 'none'
              }, 500)
            }, 600)
          } else {
            this.itemTag.style.backgroundColor = '#f44336'
            this.itemTag.style.transform = 'translate(0, 0)'
            setTimeout(() => {
              this.itemTag.style.backgroundColor = '#f1f1f1'
            }, 500)
          }
        } else { // 오른쪽 영역
          stylePosition.isSide = 'right'
          if(answerType === 'decrease') { // 정답일 경우
            this.itemTag.style.backgroundColor = '#4caf50'
            setTimeout(() => {
              this.itemTag.style.width = 0
              this.itemTag.style.height = 0
              this.itemTag.style.padding = 0
              this.quizList.isCorrect.decrease = [...this.quizList.isCorrect.decrease, this.itemTag.innerHTML]
              setTimeout(() => {
                this.itemTag.style.display = 'none'
              }, 500)
            }, 600)
          } else {
            this.itemTag.style.backgroundColor = '#f44336'
            this.itemTag.style.transform = 'translate(0, 0)'
            setTimeout(() => {
              this.itemTag.style.backgroundColor = '#f1f1f1'
            }, 500)
          }
        }
        this.$emit('getStyle', stylePosition)
      } else {
        // console.log('나가따')
        stylePosition.isIn = false
        stylePosition.isSide = null
        this.$emit('getStyle', stylePosition)
      }
    },
  },
}
</script>