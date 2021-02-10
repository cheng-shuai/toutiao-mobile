<template>
<div class='search-history-container'>
  <van-cell title="历史记录">
    <div>
      <span>全部删除 </span>
      <span>完成</span>
    </div>
    <van-icon name="delete-o" />
  </van-cell>
  <van-cell
    v-for="(history, index) in searchHistories"
    :title="history"
    :key="index"
  >
    <van-icon name="close"/>
  </van-cell>
</div>
</template>

<script>

export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created () {},
  mounted () {}
}
</script>
<style lang=less scoped>

</style>
