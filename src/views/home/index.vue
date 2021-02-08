<template>
  <div class="home-container">
    <!--     导航栏-->
    <van-nav-bar
      class="app-nav-bar">
      <van-button
        slot="title"
        icon="search"
        type="info"
        round
        class="search-btn"
      >搜索
      </van-button>
    </van-nav-bar>
<!--    导航频道-->
    <van-tabs v-model="active">
      <van-tab
        :key="channel.id"
        sticky
        v-for="channel in userChannels"
        :title="channel.name"
      >
        <article-list :channel="channel"/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from '@/views/home/components/ArticleList'

export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      userChannels: []
    }
  },
  components: {
    ArticleList
  },
  created () {
    this.loadUserChannels()
  },
  methods: {
    async loadUserChannels () {
      const { data } = await getUserChannels()
      this.userChannels = data.data.channels
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  .search-btn {
    width: 277px;
    height: 32px;
    background-color: #5babfb;
    border: none;

    .van-icon-search {
      font-size: 18px;
    }

    .van-button__text {
      font-size: 14px;
    }
  }

  ::v-deep .van-nav-bar__title {
    max-width: none;
  }

  ::v-deep .van-tab {
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
  ::v-deep .van-tabs__line {
    background: #5babfb;
    width: 15px;
    height: 3px;
    margin-bottom: 5px;
  }
}

</style>
