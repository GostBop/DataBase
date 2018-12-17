<template>
  <div class="item">
    <p>{{ item.name }}</p>
    <span class="salepill" v-if="item.available">Stock</span>
    <img :src="`../../static/images/${item.img}`" :alt="`Image of ${item.name}`">
    <button @click="seeMore">See More</button>
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
    seeMore () {
      let me = this
      axios.get('/api/products/goods?p_id=' + this.item.p_id)
        .then(function (response) {
          if (response.data.code === '-1') {
            me.$message(response.data.message)
          } else {
            me.$store.commit('updateSeeMore', response.data.data)
            me.$router.push('good')
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
  .item {
    border-radius: 5px;
    padding: 20px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .salepill {
    background: rgb(232, 35, 25);
    color: white;
    font-family: 'Barlow', sans-serif;
    position: absolute;
    right: 30px;
    top: 60px;
    padding: 2px 10px 4px;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 700;
    border-radius: 1000px;
  }

  p {
    font-size: 18px;
  }
</style>
