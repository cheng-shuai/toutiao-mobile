<template>
<div class='update-birthday-container'>
  <van-datetime-picker
    v-model="currentDate"
    type="date"
    title="选择年月日"
    :min-date="minDate"
    :max-date="maxDate"
    @cancel="$emit('close')"
    @confirm="onConfirm"
  />
</div>
</template>

<script>
import dayjs from 'dayjs'
import { updateUser } from '@/api/user'

export default {
  name: 'UpdateBirthday',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true
      })
      const date = dayjs(this.currentDate).format('YYYY-MM-DD')
      await updateUser({
        birthday: date
      })
      this.$toast.success('修改成功')
      this.$emit('close')
      this.$emit('input', date)
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang=less scoped>

</style>
