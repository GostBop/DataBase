<template>
  <div id="register">
    <input v-model="username" type="text" placeholder="Username">
    <br>
    <input v-model="password" type="password" placeholder="Password"/>
    <br>
    <input v-model="telephone" type="text" placeholder="Telephone"/>
    <br>
    <input v-model="address" type="text" placeholder="Address"/>
    <br>
    <button @click="register">Register</button>
    <div id="login-switch" v-on:click="on_click()">Account available? Login now.</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      username: '',
      password: '',
      telephone: '',
      address: '',
      message: ''
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
      this.$emit('change-to-login')
    },
    register () {
      let postData = {
        name: this.username,
        address: this.address,
        password: this.password,
        phone: this.telephone
      }
      if (this.category === 'buyer') {
        let me = this
        axios.post('/api/buyer/signup', postData)
          .then(function (response) {
            if (response.data.code === '-1') {
              me.$message.error({
                message: response.data.message,
                center: true
              })
            } else {
              me.$notify({
                title: 'Success',
                message: 'Register successfully!',
                type: 'success',
                duration: 1500
              })
              me.$emit('change-to-login')
            }
          })
      } else {
        let me = this
        axios.post('/api/seller/signup', postData)
          .then(function (response) {
            if (response.data.code === '-1') {
              me.$message.error({
                message: response.data.message,
                center: true
              })
            } else {
              me.$notify({
                title: 'Success',
                message: 'Register successfully!',
                type: 'success',
                duration: 1500
              })
              me.$emit('change-to-login')
            }
          })
      }
    }
  }
}
</script>

<style scoped>
  #register input {
    height: 30px;
    width: 300px;
    margin:10px 20px 10px 20px;
    border-radius: 5px;
    padding-left: 4px;
    border:1px gray solid;
  }

  #login-switch {
    width: 240px;
    margin-left: 50px;
    color: #9564EA;
    padding-bottom: 10px;
    cursor: pointer;
  }

  .message {
    height: 16px;
    color: red;
  }
</style>
