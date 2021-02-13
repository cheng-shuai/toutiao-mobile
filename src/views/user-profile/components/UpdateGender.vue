<template>
<div class='update-gender-container'>
  <van-picker
    title="请选择性别"
    show-toolbar
    :columns="columns"
    :default-index="genderindex"
    @confirm="onConfirm"
    @cancel="$emit('close')"
  />
</div>
</template>

<script>
import { updateUser } from '@/api/user'

export default {
  name: 'UpdateGender',
  components: {},
  props: {
    gender: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      genderindex: this.gender
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onConfirm (value, index) {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true
      })
      await updateUser({
        gender: index
      })
      this.$toast.success('修改成功')
      this.$emit('close')
      this.$emit('update-gender', this.index)
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang=less scoped>

</style>
