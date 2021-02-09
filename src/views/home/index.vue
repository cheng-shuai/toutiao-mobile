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
      <!-- 面包屑 -->
      <div
        class="wpa-nav-wrap-placeholder"
        slot="nav-right"
      ></div>
      <div
        slot="nav-right"
        @click="isShowEdit = true"
        class="wap-nav-wrap"
      >
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="isShowEdit"
      closeable
      close-icon="close"
      position="bottom"
      get-container="body"
      round
      :style="{ height: '100%' }"
    >
      <channel-edit
        :user-channels="userChannels"
        @close="isShowEdit = false"
        @update-active="active = $event"
        :active="active"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from '@/views/home/components/ArticleList'
import ChannelEdit from '@/views/home/components/ChannelEdit'
import { getItem } from '@/utils/storage'
import { mapState } from 'vuex'

export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      userChannels: [],
      isShowEdit: false
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  computed: {
    ...mapState(['user-channels'])
  },
  created () {
    this.loadUserChannels()
  },
  methods: {
    async loadUserChannels () {
      let channels = []
      if (this.user) {
        // 已经登录，请求获取线上的用户频道列表数据
        const { data } = await getUserChannels()
        channels = data.data.channels
      } else {
        // 没有登录，判断是否有本地存储的频道列表数据
        const localChannels = getItem('user-channels')

        // 如果有本地存储的频道列表则使用
        if (localChannels) {
          channels = localChannels
        } else {
          // 用户没有登录，也没有本地存储的频道，垃圾请求后偶去默认的推荐频道猎豹
          const { data } = await getUserChannels()
          this.userChannels = data.data.channels
        }
      }
      this.userChannels = channels
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
  .wap-nav-wrap {
    box-sizing: border-box;
    position: fixed;
    right: 0;
    width: 33px;
    height: 43px;
    background: #fff;
    opacity: .9;
    border-bottom: 1px solid #ddd;
    .van-icon-wap-nav {
      display: flex;
      justify-content: center;
      line-height: 44px;
    }
  }
  .wpa-nav-wrap-placeholder {
    width: 33px;
    flex-shrink: 0;
  }
}

</style>
