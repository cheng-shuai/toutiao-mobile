<template>
  <div class="channel-edit-container">
    <van-cell class="my-channel" center :border="false">
      <div slot="title">我的频道</div>
        <van-button
          size="mini"
          type="danger"
          plain
          round
        >编辑</van-button>
    </van-cell>
      <van-grid :gutter="10">
        <van-grid-item
        v-for="(channel, index) in userChannels"
        :key="index"
        :text="channel.name"
        />
      </van-grid>
        <van-cell class="my-channel" center :border="false">
      <div slot="title">频道推荐</div>
    </van-cell>
      <van-grid :gutter="10">
        <van-grid-item
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        />
      </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'

export default {
  name: 'ChannelEdit',
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      allChannels: []
    }
  },
  created () {
    this.loadGetAllChannels()
  },
  methods: {
    async loadGetAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    }
  },
  computed: {
    recommendChannels () {
      return this.allChannels.filter(channel => {
        return !this.userChannels.find(allChannels => {
          return allChannels.id === channel.id
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit-container {
  padding-top: 54px;
  .van-cell__title {
    font-size: 16px;
  }
  ::v-deep .van-grid-item__content {
    background-color: #f4f5f6;
    width: 80px;
    height: 43px;
    .van-grid-item__text {
      font-size: 14px;
      color: #222;
    }
  }
}
</style>>
