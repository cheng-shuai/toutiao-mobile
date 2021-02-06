<template>
  <div class="my-container">
    <van-cell-group v-if="user" class="my-info">
      <van-cell center class="base-info" :border="false">
        <template #icon>
          <van-image
            class="avatar"
            fit="cover"
            round
            :src="currentUser.photo"
          />
        </template>
        <template #title>
          <div class="name">{{ currentUser.name }}</div>
        </template>
        <template #right-icon>
          <van-button class="edit-btn" size="mini" round>编辑资料</van-button>
        </template>
      </van-cell>
      <van-grid :border="false" style="box-sizing: border-box">
        <van-grid-item>
          <div slot="icon">
            <div class="text-top">{{ currentUser.art_count }}</div>
            <div class="text-bottom">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="icon">
            <div class="text-top">{{ currentUser.follow_count }}</div>
            <div class="text-bottom">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="icon">
            <div class="text-top">{{ currentUser.fans_count }}</div>
            <div class="text-bottom">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="icon">
            <div class="text-top">{{ currentUser.like_count }}</div>
            <div class="text-bottom">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <div class="not-login" v-else @click="$router.push('/login')">
      <div class="mobile">
        <img src="./shouji.png" alt="">
      </div>
      <div class="text">注册 / 登录</div>
    </div>
    <van-grid :column-num="2" class="mess">
      <van-grid-item icon-prefix="toutiao" icon="shoucang" text="收藏" class="shouchang"/>
      <van-grid-item icon-prefix="toutiao" icon="lishi" text="历史" class="lishi"/>
    </van-grid>
    <div class="operate">
      <van-cell title="消息通知" is-link to="/" class="schoolmate"/>
      <van-cell title="小智同学" is-link to="/" class="schoolmate"/>
    </div>
    <van-button
      @click="onLogout"
      v-if="user"
      block
      style="color:#d86262;"
    >退出登录
    </van-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '@/api/user'

export default {
  name: 'MyIndex',
  data () {
    return {
      currentUser: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadGetUser()
  },
  methods: {
    onLogout () {
      this.$dialog.confirm({
        title: '用户确认',
        message: '确认退出登录嘛',
        confirmButtonColor: '#3e9cfa'
      }).then(() => {
        // on confirm
        this.$store.commit('setUser', null)
      })
        .catch(() => {
          // on cancel
        })
    },
    async loadGetUser () {
      const { data } = await getCurrentUser()
      this.currentUser = data.data
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .my-info {
    height: 180px;
    background: url("./banner.png") no-repeat;
    background-size: cover;

    .base-info {
      box-sizing: border-box;
      height: 115px;
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 12px;

      .avatar {
        border: 1px solid #fff;
        margin-right: 12px;
        width: 66px;
        height: 66px;
      }

      .name {
        font-size: 15px;
        color: #fff;
      }

      .edit-btn {
        width: 58px;
        height: 26px;
        font-size: 10px;
        color: #666666;
      }
    }

    .text-top {
      text-align: center;
      font-size: 18px;
      color: #fff;
    }

    .text-bottom {
      color: #fff;
      font-size: 12px;
      text-align: center;
    }

    ::v-deep .van-grid-item__content {
      background-color: unset;
    }
  }

  .not-login {
    height: 180px;
    background: url("./banner.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;

    .mobile {
      img {
        width: 66px;
        height: 66px;
      }
    }

    .text {
      color: #fff;
      font-size: 14px;
    }
  }

  ::v-deep .mess {
    margin-bottom: 5px;

    .van-grid-item__icon {
      font-size: 22px;
    }

    .shouchang {
      color: #eb5253;
    }

    .lishi {
      color: #ff9d1d;
    }

    ::v-deep .van-grid-item__text {
      font-size: 14px;
    }
  }

  .operate {
    margin-bottom: 5px;
  }
}
</style>
