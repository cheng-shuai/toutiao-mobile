<template>
  <div class="channel-edit-container">
    <van-cell class="my-channel" center :border="false">
      <div slot="title">我的频道</div>
        <van-button
          size="mini"
          type="danger"
          plain
          round
          @click="isEdit = !isEdit"
        >{{isEdit ? '完成' : '编辑'}}</van-button>
    </van-cell>
      <van-grid :gutter="10">
        <van-grid-item
        v-for="(channel, index) in userChannels"
        :key="index"
        :icon="(isEdit && index !== 0) ? 'close' : ''"
        :text="channel.name"
        @click="editUserChannel(index)"
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
        @click="onAdd(channel)"
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
      allChannels: [],
      isEdit: false
    }
  },
  created () {
    this.loadGetAllChannels()
  },
  methods: {
    async loadGetAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    onAdd (channel) {
      this.userChannels.push(channel)
    },
    editUserChannel (index) {
      if (this.isEdit && index !== 0) {
        // 删除频道
        this.deleteChannel(index)
      } else {
        // 跳转到频道
        this.gotoChannel(index)
      }
    },
    deleteChannel (index) {
      this.userChannels.splice(index, 1)
    },
    gotoChannel (index) {
      // 关闭弹出层
      this.$emit('close')
      // 跳转到相应的频道
      this.$emit('update-active', index)
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
      margin-top: unset;
    }
  }
  ::v-deep .van-grid-item__icon {
    font-size: 16px;
    color: #ccc;
    position: absolute;
    top: -8px;
    right: -8px;
  }
}
</style>>
