<template>
  <main class="capsule">
    <div class="saleimg">
      <app-masthead title="Personal" />
    </div>
    <div class="contain">
      <app-personbar/>
      <transition-group name="Orders" tag="section" class="content">
        <app-order
          v-for="(item, index) in orders"
          :key="index"
          :order="item"
          :index="index"
        />
      </transition-group>
    </div>
  </main>
</template>

<script>
import AppPersonbar from './../components/AppPersonbar.vue'
import AppMasthead from './../components/AppMasthead.vue'
import AppOrder from './../components/AppOrder.vue'

export default {
  mounted: function () {
    if (this.$store.state.isBuyer) {
      this.$store.dispatch('getBuyerOrders')
    } else {
      this.$store.dispatch('getSellerOrders')
    }
  },
  components: {
    AppMasthead,
    AppPersonbar,
    AppOrder
  },
  computed: {
    orders () {
      return this.$store.state.orders
    }
  }
}
</script>

<style>

</style>
