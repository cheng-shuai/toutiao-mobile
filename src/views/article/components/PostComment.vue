<template>
<div class='post-comment-container'>
  <van-field
    v-model.trim="message"
    rows="2"
    autosize
    type="textarea"
    maxlength="50"
    placeholder="请输入留言"
    show-word-limit
  />
  <van-button type="info" @click="postComment">发布</van-button>
</div>
</template>

<script>
import { addComment } from '@/api/comment'

export default {
  name: 'PostComment',
  components: {},
  props: {
    target: {
      type: [Object, String, Number],
      required: true
    },
    articleId: {
      type: [Object, String, Number],
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    async postComment () {
      this.$toast.loading({
        message: '加载中。。。',
        forbidClick: true
      })
      const { data } = await addComment({
        target: this.target.toString(),
        content: this.message,
        art_id: this.articleId === null ? null : this.articleId.toString()
      })
      this.$toast.success('发布成功')
      this.message = ''
      this.$emit('post-sucess')
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang=less scoped>
.post-comment-container {
  display: flex;
  padding: 13px;
  align-items: center;
}
</style>
