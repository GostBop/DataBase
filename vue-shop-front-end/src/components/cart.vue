<template>
  <div class="capsule cart">

    <div v-if="cartTotal > 0">
      <h1>Cart</h1>
      <div class="cartitems"
           v-for="(item, index) in cart"
           :key="index">
        <div class="carttext">
          <h4>{{ item.name }}</h4>
          <p>{{ item.price | usdollar }} x {{ item.count }}</p>
          <p>
            <strong>SELLER:  {{ item.s_id }}</strong>
          </p>
        </div>
        <img class="cartimg" :src="`../../static/images/${item.img}`" :alt="`Image of ${item.name}`">
        <button class="delete" @click="deleteItem(item)">Delete good</button>
      </div>
      <div class="total">
        <h3>Total: {{ total | usdollar }}</h3>
      </div>
      <div class="message">{{ message }}</div>
      <button @click="purchase">Buy Now !</button>
    </div>

    <div v-else-if="cartTotal === 0 && success === false" class="empty">
      <h1>Cart</h1>
      <h3>Your cart is empty.</h3>
      <router-link to="/home"><button>Fill er up!</button></router-link>
    </div>

    <div v-else>
      <app-success @restartCart="success = false"/>
      <h2>Success!</h2>
      <p>Your order has been processed, it will be delivered shortly.</p>
    </div>

  </div>
</template>

<script>
import AppSuccess from './../components/AppSuccess'
import axios from 'axios'

export default {
  data () {
    return {
      success: false,
      message: ''
    }
  },
  components: {
    AppSuccess
  },
  computed: {
    cart () {
      return this.$store.state.cart
    },
    cartTotal () {
      return this.$store.state.cartTotal
    },
    total () {
      return Object.values(this.cart)
        .reduce((acc, el) => acc + (el.count * el.price), 0)
        .toFixed(2)
    }
  },
  methods: {
    purchase: function () {
      let user = this.$store.state.user
      let newBalance = user.balance - this.total
      if (newBalance > 0) {
        let me = this
        let postDatas = []
        for (let key in this.cart) {
          let item = this.cart[key]
          postDatas.push({
            p_id: item.p_id,
            s_id: item.s_id,
            b_id: user.name
          })
        }
        let requests = postDatas.map(function (data) {
          return axios.post('/api/buyer/buy', data)
        })
        axios.all(requests)
          .then(axios.spread(function () {
            me.$store.commit('updateBalance', newBalance)
            me.$store.commit('clearCartCount')
            me.$store.commit('clearCartContents')
            me.success = true
            me.$store.dispatch('getProducts')
          }))
      } else {
        this.$message.error('Your balance is insufficient')
      }
    },
    deleteItem: function (item) {
      let me = this
      axios.delete(`/api/buyer/trolley?p_id=${item.p_id}&s_id=${item.s_id}&b_id=${this.$store.state.user.name}`)
        .then(function (response) {
          if (response.data.code === '0') {
            me.$store.commit('deleteItemInCart', item)
          }
          console.log(response.data.message)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  filters: {
    usdollar: function (value) {
      return `$${value}`
    }
  }
}
</script>

<style scoped>
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
    margin-bottom: 15px;
  }

  .cartitems {
    padding: 30px;
    border-bottom: 1px solid #ccc;
    width: 500px;
  }

  .carttext {
    width: 250px;
    float: left;
  }

  .carttext p,
  .carttext h4 {
    padding: 5px;
  }

  .cartimg {
    width: 100px;
    border: 1px solid #ccc;
    float: right;
  }

  .total {
    margin: 20px 0;
  }

  .message {
    color: red;
  }
</style>
