<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="登录"
      left-arrow
      @click-left="$router.back()"
    />
    <!--    登录表单-->
    <van-form
      @submit="onLogin"
      validate-first
      :show-error="false"
      :show-error-message="false"
      @failed="onFailed"
      ref="formRef"
    >
      <van-cell-group>
        <van-field
          :rules="formRules.mobile"
          v-model="user.mobile"
          icon-prefix="toutiao"
          left-icon="shouji"
          name="mobile"
          placeholder="请输入手机号"
        />
        <van-field
          :rules="formRules.code"
          v-model="user.code"
          clearable
          icon-prefix="toutiao"
          left-icon="yanzhengma"
          name="code"
          placeholder="请输入验证码"
        >
          <template #button>
            <van-count-down
              v-if="isShowCountDown"
              :time="1000 * 6"
              format="ss s"
              @finish="isShowCountDown = false"
            />
            <van-button
              v-else
              size="mini"
              round
              class="send-btn"
              :loading="isLoading"
              @click.prevent="onSendSms"
            >发送验证码
            </van-button>
          </template>
        </van-field>
      </van-cell-group>
      <div class="btn-wrap">
        <van-button type="info" block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getSms } from '@/api/login'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      formRules: {
        mobile: [
          {
            required: true,
            message: '请输入手机号'
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号码格式不对'
          }
        ],
        code: [
          {
            require: true,
            message: '请输入验证码'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      isShowCountDown: false,
      isLoading: false
    }
  },
  methods: {
    async onLogin () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await login(this.user)
        this.$toast.success('登录成功')
        // 存储用户token
        this.$store.commit('setUser', res.data.data)
      } catch (err) {
        this.$toast.fail('用户名或者密码错误')
      }
    },
    onFailed (err) {
      this.$toast({
        message: err.errors[0].message,
        position: 'top'
      })
    },
    async onSendSms () {
      try {
        await this.$refs.formRef.validate('mobile')
        // 开启按钮loading状态
        this.isLoading = true
        // 发送验证码
        const res = await getSms(this.user.mobile)
        // 显示倒计时
        this.isShowCountDown = true
        console.log(res)
      } catch (err) {
        this.$toast({
          message: err.message,
          position: 'top'
        })
      }

      // 关闭loading
      this.isLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    color: #666666;
    font-size: 11px;
  }

  .btn-wrap {
    margin: 38px 30px;
  }
}
</style>
