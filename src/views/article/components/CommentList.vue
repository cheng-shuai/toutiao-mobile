<template>
<div class='comment-list-container'>
  <van-cell title="全部评论"></van-cell>
  <!-- 评论列表 -->
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
  <!-- 评论项 -->
  <comment-item
    v-for="(comment, index) in list"
    :key="index"
    :comment="comment"
  />
    <!-- <van-cell
      v-for="(comment, index) in list"
      :key="index"
      :title="comment.content"
    /> -->
  </van-list>
</div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './CommentItem.vue'

export default {
  name: '',
  components: {
    CommentItem
  },
  props: {
    articleId: {
      type: [String, Object, Number],
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const { data } = await getComments({
        type: 'a',
        source: this.articleId,
        offset: this.offset,
        limit: this.limit
      })
      console.log(data)
      this.$emit('update-total-count', data.data.total_count)
      // 把数据放到列表中
      const { results } = data.data
      this.list.push(...results)
      // // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang=less scoped>

</style>
