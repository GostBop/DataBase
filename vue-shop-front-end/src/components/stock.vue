<template>
  <div class="capsule cart">
    <div v-if="!success">
      <h1>Stock</h1>
      <h4>{{ item.name }}</h4>
      <img :src="`../../static/images/${item.img}`" :alt="`Image of ${item.name}`">
      <input class="stock-form" type="text" v-model="name" placeholder="set name"/>
      <input class="stock-form" type="number" v-model="price" placeholder="set price"/>
      <div class="total">
        <h3>Total: {{ item.price | usdollar }}</h3>
      </div>
      <button @click="stock"> Stock Now !</button>
    </div>
    <div v-else>
      <app-success @restartCart="success = false"/>
      <h2>Success!</h2>
      <p>You have stocked successfully!</p>
    </div>
  </div>
</template>

<script>
import AppSuccess from './../components/AppSuccess.vue'
import axios from 'axios'

export default {
  data () {
    return {
      success: false,
      name: '',
      price: ''
    }
  },
  components: {
    AppSuccess
  },
  computed: {
    item () {
      return this.$store.state.stockItem
    }
  },
  filters: {
    usdollar: function (value) {
      return `$${value}`
    }
  },
  methods: {
    stock () {
      let user = this.$store.state.user
      let newBalance = user.balance - this.item.price
      if (newBalance > 0) {
        let me = this
        this.name = this.name === '' ? this.item.name : this.name
        this.price = this.price === '' ? this.item.price : this.price
        let postData = {
          p_id: me.item.p_id,
          price: me.price,
          name: me.name,
          s_id: user.name
        }
        axios.post('/api/seller/goods', postData)
          .then(function (response) {
            if (response.data.code === '-1') {
              me.$message(response.data.message)
            } else {
              me.success = true
              me.$store.commit('updateBalance', newBalance)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      } else {
        this.$message.error({
          message: 'Your balance is insufficient'
        })
      }
    }
  }
}
</script>

<style scoped="">
  .cart > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    padding: 50px;
    background: white;
    border-radius: 3px;
    margin-top: 10px;
    padding-bottom: 80px;
  }

  .cart.empty h1,
  .cart.empty h3 {
    margin-bottom: 10px;
  }

  .stock-form {
    border: 1px solid #DADADA;
    color: #888;
    height: 30px;
    margin-bottom: 16px;
    margin-top: 2px;
    outline: 0 none;
    padding: 3px 3px 3px 5px;
    width: 150px;
    font-size: 12px;
    line-height:15px;
    border-radius: 5px;
    box-shadow: inset 0 1px 4px #ECECEC;
    -moz-box-shadow: inset 0 1px 4px #ECECEC;
    -webkit-box-shadow: inset 0 1px 4px #ECECEC;
  }

  .carttext p,
  .carttext h4 {
    padding: 10px;
  }

  .total {
    margin: 20px 0;
  }
</style>
