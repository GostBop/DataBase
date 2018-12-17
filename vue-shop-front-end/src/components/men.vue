<template>
  <main class="capsule">
    <app-masthead img="banner-ppl" title="Men's" bkcolor="#474598"/>
    <div class="contain">
      <app-sidebar :pricerange.sync="highprice"/>
      <transition-group v-if="isBuyer" name="items" tag="section" class="content">
        <app-item
          v-for="(item, index) in mProducts"
          :key="index"
          :item="item"
          :index="index"
        />
      </transition-group>
      <transition-group v-else name="items" tag="section" class="content">
        <app-product
          v-for="(item, index) in mProducts"
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
  components: {
    AppMasthead,
    AppSidebar,
    AppItem,
    AppProduct
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
    mProducts () {
      return this.$store.getters.man.filter(el =>
        this.$store.state.available
          ? el.available
          : true
      )
    }
  }
}
</script>
