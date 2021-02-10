<template>
<div class='search-result-container'>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell
      v-for="(article, index) in list"
      :key="index"
      :title="article.title"
    />
  </van-list>
</div>
</template>

<script>
import { getSearchResult } from '@/api/search'

export default {
  name: 'SearchResult',
  components: {},
  props: {
    serchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onLoad () {
      const { data } = await getSearchResult({
        page: this.page,
        per_page: this.perPage,
        q: this.serchText
      })
      const { results } = data.data
      this.list.push(...results)
      this.loading = false
      if (results.length) {
        this.page++
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
.search-result-container {
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    top: 54px;
    overflow-y: auto;
}
</style>
