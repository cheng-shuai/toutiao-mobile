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
        v-for="value in 8"
        :key="value"
        text="文字"
        />
      </van-grid>
          <van-cell class="my-channel" center :border="false">
      <div slot="title">频道推荐</div>
    </van-cell>
      <van-grid :gutter="10">
        <van-grid-item
        v-for="value in 8"
        :key="value"
        text="文字"
        />
      </van-grid>
  </div>
</template>

<script>
export default {
  name: 'ChannelEdit'
}
</script>

<style lang="less" scoped>
.channel-edit-container {
  padding-top: 54px;
}
</style>>
