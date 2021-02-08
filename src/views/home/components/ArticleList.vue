<template>
  <div class="article-list-container">
    <van-pull-refresh
      v-model="isRefreshLoading"
      success-text="刷新成功"
      success-duration="1000"
      @refresh="onRefresh"
    >
      <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
        <article-item
          v-for="(article, index) in articles"
          :key="index"
          :title="article.title"
          :article="article"
          />
        <!-- <van-cell
          v-for="(article, index) in articles"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      articles: [],
      loading: false,
      finished: false,
      timestamp: null,
      isRefreshLoading: false // 刷新状态
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // 加载状态结束
      const { results } = data.data
      this.articles.push(...results)
      // 关闭loading状态
      this.loading = false
      // 判断时候还有下一页的数据
      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    async onRefresh () {
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      const { results } = data.data
      this.articles.unshift(...results)
      this.isRefreshLoading = false
    }
  },
  components: {
    ArticleItem
  }
}
</script>

<style lang="less" scoped>
.article-list-container {
  position: fixed;
  right: 0;
  left: 0;
  top: 90px;
  bottom: 50px;
  overflow-y: auto;
}
</style>
