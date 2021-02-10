<template>
<div class='home-container'>
  <!-- 搜索框 -->
  <form action="/">
    <van-search
      v-model="searchText"
      placeholder="请输入搜索关键词"
      input-align="center"
      show-action
      @focus="isShowResult = false"
      @search="onSearch"
      @cancel="$router.back()"
    />
  </form>
  <!-- 搜索结果 -->
  <search-result v-if="isShowResult"/>
  <!-- 联想建议 -->
  <search-suggest v-else-if="searchText"/>
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
    onSearch () {
      this.isShowResult = true
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang=less scoped>

</style>
