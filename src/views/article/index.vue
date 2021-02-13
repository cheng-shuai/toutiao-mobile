<template>
<div class='article-container'>
  <!-- 导航栏 -->
  <van-nav-bar
    class="app-nav-bar"
    title="文章详情"
    left-arrow
    @click-left="$router.back()"
  />
  <div class="article-content">
    <!-- 标题 -->
    <h1 class="title">{{article.title}}</h1>
    <!-- 用户部分 -->
    <van-cell center>
      <div slot="icon">
        <van-image
          fit="cover"
          round
          class="user-icon"
          :src="article.aut_photo"
        />
      </div>
      <div slot="title" class="username">
        {{article.aut_name}}
      </div>
      <div slot="label">{{article.pubdate | relativeTime}}</div>
      <van-button
        :type="article.is_followed ? 'default' : 'info' "
        :icon="article.is_followed ? '' : 'plus'"
        round size="small"
        class="concern-btn"
        :loading="isFollowLoding"
        @click="onFollow"
      >{{article.is_followed ? '已关注' : '关注'}}</van-button>
    </van-cell>
    <!-- 文章内容 -->
    <div
      class="markdown-body"
      v-html="article.content"
      ref="articleRef"
    >
    </div>
    <!-- 评论列表 -->
    <comment-list :articleId="articleId" @update-total-count="badge = $event"/>
  </div>
  <!-- 底部区域 -->
  <div class="article-bottom">
    <div class="bottom-btn">
      <van-button
      type="default"
      class="comment-btn"
      round
      size="small"
      @click="isPostShow = true"
      >写评论</van-button>
    </div>
    <div class="bottom-icon">
      <van-icon
        name="comment-o"
        :badge="badge"
        color="#777"
      />
      <van-icon
        :color="article.is_collected ? 'orange' : '#777' "
        :name="article.is_collected ? 'star' : 'star-o' "
        @click="onStar"
      />
      <van-icon
        :color="article.attitude === 1 ? 'hotpink' : '#777' "
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o' "
        @click="onLike"
      />
      <van-icon name="share" color="#777"></van-icon>
    </div>
  </div>
  <!-- 评论弹出层 -->
  <van-popup
    v-model="isPostShow"
    position="bottom"
  >
    <post-comment
      :target="articleId"
      @post-sucess="onPostSucess"
    />
  </van-popup>
</div>
</template>

<script>
import 'github-markdown-css'
import {
  getArticleById,
  collectArticle,
  cancelCollect,
  likeArticle,
  dislikeArticle
} from '@/api/article'
import { ImagePreview } from 'vant'
import { followUser, deleteFollow } from '@/api/user'
import CommentList from './components/CommentList.vue'
import PostComment from './components/PostComment.vue'

export default {
  name: 'ArticleIndex',
  components: {
    CommentList,
    PostComment
  },
  props: {
    articleId: {
      type: [String, Object, Number],
      required: true
    }
  },
  data () {
    return {
      article: {},
      isFollowLoding: false,
      isPostShow: false,
      badge: 0
    }
  },
  computed: {},
  watch: {},
  methods: {
    async loadArticle () {
      const { data } = await getArticleById(this.articleId)
      this.article = data.data
      this.$nextTick(() => {
        this.handlePreviewImages()
      })
    },
    handlePreviewImages () {
      const articleContent = this.$refs.articleRef
      const imgs = articleContent.querySelectorAll('img')
      const imgPaths = []
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = function () {
          // 在时间处理函数中调用ImagePreview() 预览
          ImagePreview({
            images: imgPaths, // 预览图片路径列表
            startPosition: index
          })
        }
      })
    },
    async onFollow () {
      this.isFollowLoding = true
      if (this.article.is_followed) {
        // 用户已经关注，则取消关注
        await deleteFollow(this.article.aut_id)
      } else {
        // 用户没有关注，则关注
        await followUser(this.article.aut_id)
      }
      this.article.is_followed = !this.article.is_followed
      // 关闭loading状态
      this.isFollowLoding = false
    },
    async onStar () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      // 发请求
      if (this.article.is_collected) {
        // 如果已经收藏，则取消收藏
        await cancelCollect(this.article.art_id)
        this.$toast.success('取消收藏')
      } else {
        // 如果没有收藏，则收藏
        await collectArticle(this.article.art_id)
        this.$toast.success('收藏成功')
      }
      this.article.is_collected = !this.article.is_collected
    },
    async onLike () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      if (this.article.attitude === 1) {
        // 如果已经点赞了，则取消点赞
        await dislikeArticle(this.articleId)
        this.$toast.success('取消收藏')
        this.article.attitude = -1
      } else {
        // 如果没有点赞，则点赞
        await likeArticle(this.articleId)
        this.$toast.success('点赞成功')
        this.article.attitude = 1
      }
    },
    onPostSucess () {
      this.isPostShow = false
      this.badge++
    }
  },
  created () {
    this.loadArticle()
  },
  mounted () {}
}
</script>
<style lang=less scoped>
.article-container {
  background-color: #fff;
  .article-content {
    background-color: #fff;
    position: fixed;
    top: 46px;
    bottom: 44px;
    right: 0;
    left: 0;
    overflow-y: auto;
    .title {
      font-size: 20px;
      padding: 12px;
    }
  }
  .app-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  .user-icon {
    width: 35px;
    height: 35px;
    margin-right: 13px;
  }
  .username {
    /* font-size: 12px; */
    color: #333333;
  }
  .concern-btn {
    height: 29px;
    width: 85px;
  }
  .markdown-body {
    padding: 13px;
    ul {
      list-style: unset;
    }
    margin-bottom: 45px;
  }
  .article-bottom {
    position: fixed;
    bottom: -3px;
    right: 0;
    left: 0;
    height: 44px;
    background-color: #fff;
    border-top: 1px solid #d8d8d8;
    display: flex;
    .comment-btn {
      height: 22px;
      width: 140px;
      margin-left: 14px;
    }
    .bottom-icon {
      width: 220px;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
}
</style>
