import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartTotal: 0,
    isBuyer: true,
    cart: [],
    available: false,
    stockItem: {},
    user: {},
    goods: [],
    orders: [],
    products: []
  },
  getters: {
    woman: state => filter(state.products, 'category', 'woman'),
    man: state => filter(state.products, 'category', 'man'),
    available: state => filter(state.products, 'available', false)
  },
  mutations: {
    updateUserType: (state, type) => {
      state.isBuyer = type === 'buyer'
    },
    switchSale: state => {
      state.available = !state.available
    },
    clearCartCount: state => {
      state.cartTotal = 0
    },
    clearCartContents: state => {
      state.cart = []
    },
    addItem: (state, item) => {
      state.cartTotal++
      let stateItem = Object.assign({}, item)
      stateItem.count = 1
      state.cart.push(stateItem)
    },
    deleteItemInCart: (state, item) => {
      state.cartTotal--
      let index = state.cart.indexOf(item)
      if (index > -1) {
        state.cart.splice(index, 1)
      }
    },
    updateProducts: (state, products) => {
      for (let key in products) {
        products[key].available = products[key].onStock === 1
      }
      // copy
      state.products = products.slice(0)
    },
    updateUser: (state, user) => {
      state.user = Object.assign({}, user)
    },
    updateSeeMore: (state, goods) => {
      // copy
      state.goods = goods.slice(0)
    },
    updateOrders: (state, orders) => {
      state.orders = orders.slice(0)
    },
    updateStockItem: (state, item) => {
      state.stockItem = Object.assign({}, item)
    },
    updateBalance: (state, balance) => {
      state.user.balance = balance
    },
    resetAvailable: state => {
      state.available = false
    },
    resetApp: state => {
      state.cartTotal = 0
      state.isBuyer = true
      state.cart = []
      state.available = false
      state.stockItem = {}
      state.user = {}
      state.goods = []
      state.orders = []
      state.products = []
    }
  },
  actions: {
    getBuyer: async (context, name) => {
      axios.get('/api/buyer?name=' + name)
        .then(function (response) {
          if (response.data.code === '-1') {
            console.log(response.data.message)
          } else {
            context.commit('updateUser', response.data.data)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getSeller: async (context, name) => {
      axios.get('/api/seller?name=' + name)
        .then(function (response) {
          if (response.data.code === '-1') {
            console.log(response.data.message)
          } else {
            context.commit('updateUser', response.data.data)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getProducts: async (context) => {
      axios.get('/api/products')
        .then(function (response) {
          if (response.data.code === '-1') {
            console.log(response.data.message)
          } else {
            context.commit('updateProducts', response.data.data)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getBuyerCart: async (context) => {
      axios.get('/api/buyer/trolley?b_id=' + context.state.user.name)
        .then(function (response) {
          if (response.data.code === '-1') {
            console.log(response.data.message)
          } else {
            let items = response.data.data
            for (let key in items) {
              context.commit('addItem', items[key])
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getBuyerOrders: async (context) => {
      axios.get(`/api/buyer/purchase?b_id=${context.state.user.name}`)
        .then(function (response) {
          if (response.data.code === '-1') {
            console.log(response.data.message)
          } else {
            context.commit('updateOrders', response.data.data)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getSellerOrders: async (context) => {
      axios.get(`/api/seller/purchase?s_id=${context.state.user.name}`)
        .then(function (response) {
          if (response.data.code === '-1') {
            console.log(response.data.message)
          } else {
            context.commit('updateOrders', response.data.data)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
})

// helper
const filter = (array, key, value) => array.filter(item => item[key] === value)
