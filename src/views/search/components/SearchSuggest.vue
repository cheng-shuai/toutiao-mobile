<template>
<div class='seatch-suggest-container'>
<van-cell-group>
  <van-cell
    v-for="(suggestion, index) in suggestons"
    :key="index"
    :title="suggestion"
    icon="search"
  ></van-cell>
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
      }, 1000),
      immediate: true
    }
  },
  methods: {},
  created () {},
  mounted () {}
}
</script>
<style lang=less scoped>

</style>
