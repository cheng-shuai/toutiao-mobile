<template>
<div class='seatch-suggest-container'>
<van-cell-group>
  <van-cell
    v-for="(suggestion, index) in suggestons"
    :key="index"
    icon="search"
  >
    <div slot="title" v-html="highlight(suggestion)"></div>
  </van-cell>
</van-cell-group>
</div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggest',
  components: {},
  data () {
    return {
      suggestons: []
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler: debounce(async function () {
        const { data } = await getSearchSuggestions(this.searchText)
        this.suggestons = data.data.options
      }, 500),
      immediate: true
    }
  },
  methods: {
    highlight (suggestion) {
      return suggestion.replace(
        new RegExp(this.searchText, 'gi'), `<span style="color: red;">${this.searchText}</span>`
      )
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang=less scoped>

</style>
