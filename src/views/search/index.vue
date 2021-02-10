<template>
<div class='home-container'>
  <!-- 搜索框 -->
  <form action="/">
    <van-search
      v-model="searchText"
      placeholder="请输入搜索关键词"
      input-align="center"
      show-action
      @search="onSearch"
      @cancel="$router.back()"
    />
  </form>
  <!-- 联想建议 -->
  <search-suggest/>
  <!-- 搜索历史 -->
  <seatch-history/>
</div>
</template>

<script>
import SearchSuggest from './components/SearchSuggest'
import SeatchHistory from './components/SeatchHistory.vue'

export default {
  name: 'SearchIndex',
  components: {
    SearchSuggest,
    SeatchHistory
  },
  data () {
    return {
      searchText: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    onSearch () {
      console.log('search')
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang=less scoped>

</style>
