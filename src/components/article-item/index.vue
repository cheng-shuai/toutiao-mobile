<template>
  <div class="article-item-container">
    <van-cell>
      <div class="article-title" slot="title">
        {{article.title}}
      </div>
      <div class="article-describe" slot="label">
        <div class="article-img-c" v-if="article.cover.type === 3">
          <div>
            <van-image
            v-for="(img, index) in article.cover.images"
            :key="index"
            width="116"
            height="73"
            :src="img"
          />
          </div>
        </div>
        <div class="description">
          <span>{{article.aut_name}}</span>
          <span>{{article.comm_count}}评论</span>
          <span>{{article.pubdate}}</span>
        </div>
      </div>
      <div class="article-img-r"
        v-if="article.cover.type === 1"
      >
        <div class="div" slot="default">
          <van-image
            width="116"
            height="73"
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

<style>

</style>
