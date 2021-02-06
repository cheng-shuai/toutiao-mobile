<template>
  <div class="my-container">
    <van-cell-group>
      <van-cell title="单元格" center>
        <template #icon>
          <van-image
            width="66"
            height="66"
            fit="cover"
            round
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
        </template>
        <template #right-icon>
          <van-button size="small" round>编辑资料</van-button>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'MyIndex'
}
</script>

<style scoped>

</style>
