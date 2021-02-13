<template>
<div class='comment-reply-container'>
  <van-nav-bar>
    <div slot="title">共{{comment.reply_count}}条回复</div>
    <van-icon
      slot="left"
      name="cross"
      @click="$emit('close')"
    />
  </van-nav-bar>
  <comment-item :comment="comment" />
  <!-- 全部评论 -->
  <comment-list :source="comment.com_id" type="c"/>
</div>
</template>

<script>
import CommentItem from './CommentItem'
import CommentList from './CommentList.vue'

export default {
  name: '',
  components: {
    CommentItem,
    CommentList
  },
  props: {
    comment: {
      type: Object,
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
