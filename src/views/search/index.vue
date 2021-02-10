<template>
<div class='home-container'>
  <!-- 搜索框 -->
  <form action="/">
    <van-search
      v-model="searchText"
      placeholder="请输入搜索关键词"
      show-action
      background="#3296fa"
      shape="round"
      @focus="isShowResult = false"
      @search="onSearch"
      @cancel="$router.back()"
    />
  </form>
  <!-- 搜索结果 -->
  <search-result v-if="isShowResult" :serch-text="searchText"/>
  <!-- 联想建议 -->
  <search-suggest
    v-else-if="searchText"
    :search-text="searchText"
    @search="onSearch"
  />
  <!-- 搜索历史 -->
  <seatch-history
    v-else
    :search-histories="searchHistories"
    @search="onSearch"
  />
</div>
</template>

<script>
import SearchResult from './components/SearchResult.vue'
import SearchSuggest from './components/SearchSuggest'
import SeatchHistory from './components/SeatchHistory.vue'
import { setItem, getItem } from '@/utils/storage'
import { mapState } from 'vuex'
import { getSearchHistories } from '@/api/search'

export default {
  name: 'SearchIndex',
  components: {
    SearchSuggest,
    SeatchHistory,
    SearchResult
  },
  data () {
    return {
      searchText: '',
      isShowResult: false,
      searchHistories: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  methods: {
    onSearch (searchText) {
      this.searchText = searchText
      const index = this.searchHistories.indexOf(searchText)
      if (index !== -1) {
        // 把重复项删除
        this.searchHistories.splice(index, 1)
      }
      // 把最新的搜索历史记录放到顶部
      this.searchHistories.unshift(searchText)

      // 存储用户历史记录到本地
      setItem('user-search', this.searchHistories)

      // 展示搜索结果
      this.isShowResult = true
    },
    async loadSearchHistories () {
      if (this.user) {
        // 如果有用户登录，则获取服务器的历史记录
        const { data } = await getSearchHistories()
        this.searchHistories = data.data.keywords
      } else {
        // 没有则获取本地的历史记录
        this.searchHistories = getItem('user-search') || []
      }
    }
  },
  created () {
    this.loadSearchHistories()
  },
  mounted () {}
}
</script>
<style lang=less scoped>
.van-search__action {
  color: #fff;
}
</style>
