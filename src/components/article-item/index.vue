<template>
  <div class="article-item-container">
    <van-cell :to="{
      name: 'article',
      params: {
        articleId: article.art_id
      }
    }">
      <div class="article-title van-multi-ellipsis--l3" slot="title">
        {{article.title}}
      </div>
      <div class="article-describe" slot="label">
        <div
          class="article-img-wrap"
          v-if="article.cover.type === 3"
        >
          <div
            v-for="(img, index) in article.cover.images"
            :key="index"
            class="article-img"
          >
            <van-image
            class="article-img-c"
            fit="cover"
            :src="img"
          />
          </div>
        </div>
        <div class="description">
          <span>{{article.aut_name}}</span>
          <span>{{article.comm_count}}评论</span>
          <span>{{article.pubdate | relativeTime}}</span>
        </div>
      </div>
      <div class="article-img-r"
        v-if="article.cover.type === 1"
      >
        <div class="div" slot="default">
          <van-image
            fit="cover"
            :src="article.cover.images[0]"
          />
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.article-item-container {
  .article-img-wrap {
    display: flex;
    .article-img {
      flex: 1;
      padding: 15px 0;
      &:not(:last-child) {
        margin-right: 4px;
      }
      .article-img-c {
        width: 100%;
        height: 73px;
      }
    }
  }
  .article-title {
    font-size: 16px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 12px;
  }
  .description span {
    margin-right: 12px;
  }
}
</style>>
