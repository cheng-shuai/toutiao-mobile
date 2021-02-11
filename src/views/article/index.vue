<template>
<div class='article-container'>
  <!-- 导航栏 -->
  <van-nav-bar
    class="app-nav-bar"
    title="文章详情"
    left-arrow
    @click-left="$router.back()"
  />
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
    >{{article.is_followed ? '已关注' : '关注'}}</van-button>
  </van-cell>
  <div
    class="markdown-body"
    v-html="article.content"
    ref="articleRef"
  >
  </div>
</div>
</template>

<script>
import 'github-markdown-css'
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant'

export default {
  name: 'ArticleIndex',
  components: {},
  props: {
    articleId: {
      type: [String, Object, Number],
      required: true
    }
  },
  data () {
    return {
      article: {}
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
  .title {
    font-size: 20px;
    color: #333333;
    padding: 12px;
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
  }
}
</style>
