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
  <seatch-history v-else :search-histories="searchHistories"/>
</div>
</template>

<script>
import SearchResult from './components/SearchResult.vue'
import SearchSuggest from './components/SearchSuggest'
import SeatchHistory from './components/SeatchHistory.vue'

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
  computed: {},
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

      // 展示搜索结果
      this.isShowResult = true
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang=less scoped>
.van-search__action {
  color: #fff;
}
</style>
