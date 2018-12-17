<template>
  <main class="capsule">
    <app-masthead/>
    <div class="contain">
      <app-sidebar :pricerange.sync="highprice"/>
      <transition-group v-if="isBuyer" name="items" tag="section" class="content">
        <app-item
          v-for="(item, index) in products"
          :key="index"
          :item="item"
          :index="index"
        />
      </transition-group>
      <transition-group v-else name="items" tag="section" class="content">
        <app-product
          v-for="(item, index) in products"
          :key="index"
          :item="item"
          :index="index"
        />
      </transition-group>
    </div>
  </main>
</template>

<script>
import AppMasthead from './AppMasthead'
import AppSidebar from './AppSidebar'
import AppItem from './AppItem'
import AppProduct from './AppProduct'

export default {
  name: 'index',
  components: {
    AppProduct,
    AppItem,
    AppSidebar,
    AppMasthead
  },
  data () {
    return {
      highprice: 300
    }
  },
  computed: {
    isBuyer () {
      return this.$store.state.isBuyer
    },
    products () {
      return this.$store.state.products.filter(el =>
        this.$store.state.available
          ? el.available
          : true
      )
    }
  }
}
</script>

<style scoped>
  /* no grid support */
  aside {
    float: left;
    width: 19.1489%;
  }

  .content {
    /*no grid support*/
    float: right;
    width: 79.7872%;
    /* grid */
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    padding: 0 !important;
  }

  @supports (display: grid) {
    .capsule > * {
      width: auto;
      margin: 0;
    }
  }
</style>
