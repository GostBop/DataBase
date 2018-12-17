<template>
  <div class="good">
    <h4>{{ item.name }}</h4>
    <img :src="`../../static/images/${item.img}`" :alt="`Image of ${item.name}`">
    <p>{{ item.price | usdollar }}</p>
    <p>Seller:{{ item.s_id }}</p>
    <button class="add" @click="addGood">Add Good</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  filters: {
    usdollar: function (value) {
      return `$${value}`
    }
  },
  methods: {
    addGood () {
      let me = this
      axios.post('/api/buyer/trolley', {
        p_id: this.item.p_id,
        s_id: this.item.s_id,
        b_id: this.$store.state.user.name
      })
        .then(function (response) {
          if (response.data.code === '-1') {
            me.$message(response.data.message)
          } else {
            me.$store.commit('addItem', me.item)
            me.$message({
              message: 'Add item to cart successfully',
              type: 'success',
              duration: 2000
            })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  .good {
    border-radius: 5px;
    padding: 20px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  p {
    font-size: 18px;
  }
</style>
