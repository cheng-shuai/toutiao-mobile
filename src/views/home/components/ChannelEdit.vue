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
        :class="{active : index === active}"
        v-for="(channel, index) in userChannels"
        :key="index"
        :icon="(isEdit && index !== 0) ? 'close' : ''"
        :text="channel.name"
        @click="editUserChannel(channel, index)"
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
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'

export default {
  name: 'ChannelEdit',
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
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
    async onAdd (channel) {
      this.userChannels.push(channel)
      // 数据持久化
      if (this.user) {
        // 登录了，将用户结果存储到线上
        await addUserChannel({
          channels: [
            { id: channel.id, seq: this.userChannels.length }
          ]
        })
      } else {
        // 没有登录就存储到本地
        setItem('user-channels', this.userChannels)
      }
    },
    editUserChannel (channel, index) {
      if (this.isEdit && index !== 0) {
        // 删除频道
        this.deleteChannel(channel, index)
      } else {
        // 跳转到频道
        this.gotoChannel(index)
      }
    },
    async deleteChannel (channel, index) {
      // 如果是当前激活频道之前的频道
      if (index <= this.active) {
        // 更新频道的索引
        this.$emit('update-active', this.active - 1)
      }
      this.userChannels.splice(index, 1)
      if (this.user) {
        // 如果用户登录，将持久化到线上
        await deleteUserChannel(channel.id)
      } else {
        // 如果用户没有登录，持久化到本地
        setItem('user-channels', this.userChannels)
      }
    },
    gotoChannel (index) {
      // 关闭弹出层
      this.$emit('close')
      // 跳转到相应的频道
      this.$emit('update-active', index)
    }
  },
  computed: {
    ...mapState(['user']),
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
  .active {
    ::v-deep .van-grid-item__text {
      color: red;
    }
  }
}
</style>>
