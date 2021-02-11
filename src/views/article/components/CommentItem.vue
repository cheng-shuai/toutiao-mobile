<template>
<div class='comment-item-container'>
  <van-cell>
    <!-- 头像 -->
    <van-image
      class="avatar"
      round
      slot="icon"
      :src="comment.aut_photo"
    />
    <!-- 用户名 -->
    <div slot="title">
      <div class="name">{{comment.aut_name}}</div>
      <div class="content">{{comment.content}}</div>
      <div class="b-wrap">
        <span class="pubdate">{{comment.pubdate | datetime}}</span>
        <van-button class="reply-btn" size="mini" round>{{comment.reply_count}}回复</van-button>
      </div>
    </div>
    <!-- 右边点赞按钮 -->
    <div class="right-icon" slot="right-icon">
      <div>
        <van-icon class="icon-font" name="good-job-o" />
      <span class="like-count">{{comment.like_count}}</span>
      </div>
    </div>
  </van-cell>
</div>
</template>

<script>

export default {
  name: 'CommentItem',
  components: {},
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
.comment-item-container {
  .avatar {
    width: 36px;
    height: 36px;
    margin-right: 13px;
  }
  .name {
    font-size: 14px;
    color: #406599;
  }
  .content {
    font-size: 16px;
  }
  .pubdate {
    font-size: 10px;
    color: #222222;
    margin-right: 20px;
  }
  .b-wrap {
    display: flex;
  }
  .reply-btn {
    height: 24px;
    width: 68px;
    background-color: #f4f5f6;
    color: #222222;
  }
  .right-icon {
    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
