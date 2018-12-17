<template>
  <div id="login">
    <input v-model="username" type="text" placeholder="Username"/>
    <br>
    <input v-model="password" type="password" placeholder="Password"/>
    <br>
    <button @click="login">Login</button>
    <div id="register-switch" v-on:click="on_click()">No account? Register now.</div>
  </div>
</template>

<script>
import axios from 'axios'
import { setCookie, getCookie } from '../assets/cookie.js'

export default {
  data: function () {
    return {
      username: '',
      password: '',
      message: ''
    }
  },
  mounted () {
    /* 页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录 */
    if (getCookie('username')) {
      this.$router.push('home')
    }
  },
  props: {
    category: {
      type: String,
      required: true
    }
  },
  methods: {
    on_click () {
      this.$emit('change-to-register')
    },
    login () {
      let postData = {
        name: this.username,
        password: this.password
      }
      if (this.category === 'buyer') {
        let me = this
        axios.post('/api/buyer/login', postData)
          .then(function (response) {
            if (response.data.code === '-1') {
              me.$message.error(response.data.message)
            } else {
              me.$notify({
                title: 'Success',
                message: 'Login successfully!',
                type: 'success',
                center: true,
                duration: 2000
              })
              me.$store.commit('updateUser', response.data.data)
              me.$store.commit('updateUserType', 'buyer')
              setCookie('username', me.username, 1000 * 60)
              setTimeout(function () {
                me.$router.push('home')
              }, 1000)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      } else {
        let me = this
        axios.post('/api/seller/login', postData)
          .then(function (response) {
            if (response.data.code === '-1') {
              me.$message.error(response.data.message)
            } else {
              me.$notify({
                title: 'Success',
                message: 'Login successfully!',
                type: 'success',
                center: true,
                duration: 2000
              })
              me.$store.commit('updateUser', response.data.data)
              me.$store.commit('updateUserType', 'seller')
              setCookie('username', me.username, 1000 * 60)
              setTimeout(function () {
                me.$router.push('home')
              }, 1000)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
}
</script>

<style scoped>
  #login input{
    height: 30px;
    width: 300px;
    margin:10px 20px 10px 20px;
    border-radius: 5px;
    padding-left: 4px;
    border:1px gray solid;
  }

  #register-switch {
    width: 208px;
    margin-left: 66px;
    color: #9564EA;
    padding-bottom: 10px;
    cursor: pointer;
  }

  .message {
    height: 16px;
    color: red;
  }
</style>
