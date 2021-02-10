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
  <seatch-history v-else/>
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
      isShowResult: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    onSearch (serchText) {
      this.searchText = serchText
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
