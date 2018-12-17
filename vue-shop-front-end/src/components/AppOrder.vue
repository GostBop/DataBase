<template>
  <div class="order">
    <div>
      <h3>{{ order.name }}</h3>
      <h4>{{ order.price | usdollar }}</h4>
      <img class="orderimg" :src="`../../static/images/${order.img}`" :alt="`Image of ${order.name}`"/>
      <h4>Order Id: {{ order.id }}</h4>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    order: {
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
  }
}
</script>

<style scoped="">
  .order {
    border-radius: 5px;
    padding: 20px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    text-align: center;
  }

  p {
    font-size: 18px;
  }
</style>
