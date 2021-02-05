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
    >
      <van-cell-group>
        <van-field
          :rules="formRules.mobile"
          v-model="user.mobile"
          icon-prefix="toutiao"
          left-icon="shouji"
          placeholder="请输入手机号"
        />
        <van-field
          :rules="formRules.code"
          v-model="user.code"
          clearable
          icon-prefix="toutiao"
          left-icon="yanzhengma"
          placeholder="请输入验证码"
        >
          <template #button>
            <van-button size="mini" round class="send-btn">发送验证码</van-button>
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
import { login } from '@/api/login'

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
      }
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
      } catch (err) {
        this.$toast.fail('用户名或者密码错误')
      }
    },
    onFailed (err) {
      console.log(err)
      this.$toast({
        message: err.errors[0].message,
        position: 'top'
      })
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
