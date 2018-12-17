<template>
  <aside>
    <div class="sidearea callout">
      <h4>Personal Infomation</h4>
      <!--<img class="cartimg" :src="`/${img}`" :alt="`Image of ${name}`" />-->
      <div class="">
        <p>NAME: {{ user.name }}</p>
        <p>BALANCE: {{ user.balance | usdollar }}</p>
        <p>ADDRESS: {{ user.address }}</p>
        <p>PHONE: {{ user.phone }}</p>
      </div>
    </div>

    <div class="sidearea callout">
      <h4>Contact Us</h4>
      <p>Questions? Call us at 1-888-555-SHOP, we're happy to be of service.</p>
    </div>
  </aside>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  filters: {
    usdollar: function (value) {
      return `$${value}`
    }
  }
}
</script>

<style lang="scss" scoped>
  aside {
    background: white;
    float: left;
    padding: 20px;
  }
  .saleimg .ppl-banner {
    height: 105%;
  }
  .sidearea {
    border-bottom: 1px solid #ccc;
    &:last-of-type {
      border: none;
    }
  }

  .cartimg {
    margin: 5px;
    width: 100px;
    border: 1px solid #ccc;
  }
  .callout {
    padding: 20px 0;
    h4 {
      padding-bottom: 10px;
    }
  }

  label {
    font-family: 'Playfair Display', serif;
    padding: 15px 0;
    text-align: center;
  }

  /*--input range--*/
  .sidearea:first-of-type {
    padding-bottom: 40px;
  }

  label {
    font-family: 'Playfair Display', serif;
    padding: 15px 0;
    text-align: center;
  }

  span {
    font-family: 'Barlow', sans-serif;
  }

  .max {
    font-size: 12px;
    float: right;
    color: #565656;
  }

  .min {
    float: left;
    font-size: 12px;
    color: #565656;
  }
</style>
