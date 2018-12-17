<template>
  <div class="item">
    <h4>{{ item.name }}</h4>
    <img :src="`../../static/images/${item.img}`" :alt="`Image of ${item.name}`">
    <p>{{ item.price | usdollar }}</p>
    <button class="add" @click="addItem">Stock</button>
  </div>
</template>

<script>
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
    addItem () {
      this.$store.commit('updateStockItem', this.item)
      this.$router.push('stock')
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

  p {
    font-size: 18px;
  }
</style>
