<template>
<div class='search-history-container'>
  <van-cell title="历史记录">
    <div v-if="isDeleteShow">
      <span @click="onDeleteAll">全部删除 </span>
      <span @click="isDeleteShow = false">完成</span>
    </div>
    <van-icon v-else name="delete-o" @click="isDeleteShow = true"/>
  </van-cell>
  <van-cell
    v-for="(history, index) in searchHistories"
    :title="history"
    :key="index"
    @click="onDelete(history, index)"
  >
    <van-icon name="close" v-show="isDeleteShow"/>
  </van-cell>
</div>
</template>

<script>
import { deleteSearchHistories } from '@/api/search'
import { setItem } from '@/utils/storage'

export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    onDelete (history, index) {
      if (this.isDeleteShow) {
        // 如果是删除状态，则删除
        this.searchHistories.splice(index, 1)
        // 设置本地的历史记录
        setItem('user-search', this.searchHistories)
      } else {
        // 如果不是删除状态，则跳转到相应的搜索结果
        this.$emit('search', history)
      }
    },
    async onDeleteAll () {
      // 删除线上的历史记录
      const res = await deleteSearchHistories()
      // 删除本地的历史记录
      this.searchHistories.splice(0, this.searchHistories.length)
      setItem('user-search', this.searchHistories)
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang=less scoped>

</style>
