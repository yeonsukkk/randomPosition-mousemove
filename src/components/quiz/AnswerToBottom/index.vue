<template>
  <div
    class="relative w-full h-[calc(100vh_-_50px)] flex justify-center items-center top-[50px] overflow-hidden"
    v-if="isLoaded"
    @mousemove="moveMouse($event)"
  >
    <div
      class="w-[665px] max-w-[95%] h-full relative z-10"
      ref="itemContainer"
    >
      <Item
        v-for="(item, idx) in itemList"
        :key="idx"
        ref="item"
        @childItem="getChildItem"
        @startDrag="startDrag"
        :getPosition="getChildItem"
        :moveMouse="moveMouse"
        :item-info="{
          itemName: item,
          parentPosition: parentMousePosition,
        }"
      />
      <Footer />
    </div>
    <DetailInfo
      :detail-info="detailInfo"
    />
  </div>
</template>

<script>
import { mapStores, setMapStoreSuffix } from 'pinia'
import { useQuiz } from '@/store/quizInfo'
setMapStoreSuffix('')
import Item from './Item.vue'
import Footer from './Footer.vue'
import DetailInfo from '@/components/quiz/DetailInfo.vue'
export default {
  name: 'answerToBottom',
  components: {
    DetailInfo,
    Item,
    Footer,
  },
  props: {
    detailInfo: Object,
  },
  data() {
    return {
      isLoaded: false,
      mokupData: {
        correct: [
          'wins',
          'gains',
          'add',
        ],
        wrong: [
          'subtract',
          'reduces',
          'loses',
        ],
      },
      itemInfo: {
        itemName: '',
        position: [],
      },
      itemList: [],
      shuffledItem: [],
      containerInfo: {
        width: 0,
        height: 0,
      },
      dragTarget: null,
      dragFlag: false,
      parentMousePosition: {
        page: {
          x: 0,
          y: 0,
        },
      },
    }
  },
  computed: {
    ...mapStores(useQuiz),
  },
  mounted() {
    this.isLoaded = this.detailInfo && true
    this.getItemList(this.mokupData)
  },
  methods: {
    getItemList(itemList) {
      for(const item in itemList) {
        const getItem = itemList[item]
        for(const i in getItem) {
          this.itemList = [...this.itemList, getItem[i]]
        }
      }
      this.shuffledItemList(this.itemList)
    },
    shuffledItemList(itemList) { // item 무작위로 섞기
      itemList.sort(() => Math.random() - 0.5)
    },
    getContainerInfo(container) { // 컨테이너 너비, 높이값 구하기
      this.containerInfo.width = container.getBoundingClientRect().width
      this.containerInfo.height = container.getBoundingClientRect().height
    },
    getChildItem(childItem) { // 자식 컴포넌트에서 받아온 아이템을 이용하여 x, y 좌표 구하기
      return childItem && this.getRandomPosition(childItem)
    },
    getRandomPosition(item) { // 랜덤 위치 설정
      this.getContainerInfo(this.$refs?.itemContainer)
      const xMin = 0;
      const yMin = 0;
      const xMax = this.containerInfo.width - 50
      const yMax = this.containerInfo.height - (50 + 80) // 아이템 높이 + footer 높이
      const { width, height } = item.getBoundingClientRect()
      const x = Math.round(this.randomNumber(xMin, (xMax - width)))
      const y = Math.round(this.randomNumber(yMin, (yMax - height)))
      this.parentMousePosition.x = x
      this.parentMousePosition.y = y

      return {
        x,
        y,
        containerSize: this.containerInfo
      }
    },
    randomNumber(min, max) { // 랜덤 위치 구하기
      return (Math.random() * (max - min) + min)
    },
    startDrag(bool) {
      this.dragFlag = bool
    },
    moveMouse(e) {
      if(!this.dragFlag) return

      this.parentMousePosition.page.x = e.pageX
      this.parentMousePosition.page.y = e.pageY
    },
  },
}
</script>