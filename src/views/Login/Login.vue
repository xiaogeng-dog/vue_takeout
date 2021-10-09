<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a
            href="javascript:;"
            :class="{ on: loginWay }"
            @click="loginWay = true"
            >短信登录</a
          >
          <a
            href="javascript:;"
            :class="{ on: !loginWay }"
            @click="loginWay = false"
            >密码登录</a
          >
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{ on: loginWay }">
            <section class="login_message">
              <input
                type="tel"
                maxlength="11"
                placeholder="手机号"
                v-model="phone"
              />
              <button
                :disabled="!checkPhone"
                class="get_verification"
                :class="{ right_phone: checkPhone }"
                @click.prevent="getCode"
              >
                {{ checkTime ? `已发送${checkTime}s` : '获取验证码' }}
              </button>
            </section>
            <section class="login_verification">
              <input
                type="tel"
                maxlength="8"
                placeholder="验证码"
                v-model="code"
              />
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{ on: !loginWay }">
            <section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                  v-model="name"
                />
              </section>
              <section class="login_verification">
                <input
                  type="password"
                  maxlength="8"
                  placeholder="密码"
                  v-if="!showPwd"
                  v-model="pwd"
                />
                <input
                  type="text"
                  maxlength="8"
                  placeholder="密码"
                  v-model="pwd"
                  v-else
                />
                <div
                  class="switch_button"
                  @click="showPwd = !showPwd"
                  :class="!showPwd ? 'off' : 'on'"
                >
                  <div class="switch_circle" :class="{ right: showPwd }"></div>
                  <span class="switch_text">{{ showPwd ? 'abc' : '...' }}</span>
                </div>
              </section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                  v-model="captcha"
                />
                <img
                  class="get_verification"
                  src="http://localhost:4000/captcha"
                  alt="captcha"
                  @click="getCaptcha"
                  ref="captcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <alert-tip
      :alertText="alertText"
      v-show="showAlert"
      @closeTip="closeTip"
    ></alert-tip>
  </section>
</template>

<script>
import AlertTip from '../../components/AlertTip/AlertTip.vue'
import { handleLogin, handleSendcode, handleLoginByPhoneN } from '../../api'
import { Base64 } from 'js-base64'
export default {
  components: { AlertTip },
  name: 'Login',
  data() {
    return {
      loginWay: true, // true代表短信登陆，false代表密码登录
      phone: '', //手机号
      checkTime: 0,
      code: '',
      showPwd: false,
      pwd: '',
      name: '',
      captcha: '',
      alertText: '',
      showAlert: false,
      intervalId: 0
    }
  },
  computed: {
    checkPhone() {
      const reg = /^1\d{10}$/
      return reg.test(this.phone)
    }
  },
  methods: {
    async getCode() {
      if (this.checkTime) return
      this.checkTime = 60
      this.intervalId = setInterval(() => {
        this.checkTime--
        if (this.checkTime <= 0) {
          clearInterval(this.intervalId)
        }
      }, 1000)
      // 发送ajax请求
      const result = await handleSendcode(this.phone)
      if (result.code === 1) {
        // 显示提示
        this.showAlerts(result.msg)
        // 停止倒计时
        if (this.checkTime) {
          this.checkTime = 0
          clearInterval(this.intervalId)
          this.intervalId = undefined
        }
      }
    },
    showAlerts(alertText) {
      this.showAlert = true
      this.alertText = alertText
    },
    async login() {
      let result
      if (this.loginWay) {
        if (!this.checkPhone) {
          //
          this.showAlerts('手机号不正确')
          return
        } else if (!/^\d{6}$/.test(this.code)) {
          //
          this.showAlerts('验证码必须是六位数字')
          return
        }
        // 发送短信登录
        result = await handleLoginByPhoneN(this.phone, this.code)
        // if (result.code === 0) {
        //   const user = result.data
        // } else {
        //   const msg = result.msg
        // }
      } else {
        if (!this.name) {
          //
          this.showAlerts('用户名不能为空')
          return
        } else if (!this.pwd) {
          //
          this.showAlerts('密码不能为空')
          return
        } else if (!this.captcha) {
          //
          this.showAlerts('验证码不能为空')
          return
        }

        // 发送短信登录
        result = await handleLogin({
          name: this.name,
          pwd: this.pwd,
          captcha: this.captcha
        })
        // if (result.code === 0) {
        //   const user = result.data
        // } else {
        //   const msg = result.msg
        // }
      }
      // 停止倒计时
      if (this.checkTime) {
        this.checkTime = 0
        clearInterval(this.intervalId)
        this.intervalId = undefined
      }
      if (result.code === 0) {
        const user = result.data
        // 保存数据
        this.$store.dispatch('recordUser', user)
        // 跳转页面
        this.$router.replace('/profile')
      } else {
        this.showAlerts(result.msg)
        this.getCaptcha()
      }
    },
    // 关闭警告框
    closeTip() {
      this.showAlert = false
      this.alertText = ''
    },
    // 获取新的图片验证码
    getCaptcha() {
      this.$refs.captcha.src =
        'http://localhost:4000/captcha?time=' + Date.now()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixins.styl"
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right_phone
                color black
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s,border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                transition transform .3s
                &.right
                 transform translateX(27px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
</style>
