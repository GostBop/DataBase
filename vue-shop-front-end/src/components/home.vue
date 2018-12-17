<template>
  <div>
    <div class="wrapper">
      <app-navigation/>
      <router-view></router-view>
      <div class="clear"></div>
      <div class="push"></div>
    </div>
    <app-footer class="footer"/>
  </div>
</template>

<script>
import AppNavigation from './AppNavigation'
import AppFooter from './AppFooter'
import { getCookie } from '../assets/cookie.js'

export default {
  name: 'Home',
  mounted: function () {
    let uname = getCookie('username')
    /* 如果cookie不存在，则跳转到登录页 */
    if (uname === '') {
      this.$router.push('/')
    } else {
      if (this.$store.state.isBuyer) {
        this.$store.dispatch('getBuyer', uname)
        this.$store.dispatch('getBuyerCart')
        this.$store.dispatch('getBuyerOrders')
      } else {
        this.$store.dispatch('getSeller', uname)
        this.$store.dispatch('getSellerOrders')
      }
      this.$store.dispatch('getProducts')
    }
  },
  components: {
    AppNavigation,
    AppFooter
  }
}
</script>

<style scoped>
  .clear {
    clear: both;
  }

  /* sticky footer stuff */
  .wrapper {
    min-height: 100vh;
    margin-bottom: -60px;
  }

  .footer,
  .push {
    height: 50px;
    margin-top: 10px;
  }
</style>
