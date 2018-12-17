<template>
  <main class="capsule">
    <app-masthead img="banner-ppl-women" title="Women's" bkcolor="#e82319"/>
    <div class="contain">
      <app-sidebar :pricerange.sync="highprice"/>
      <transition-group v-if="isBuyer" name="items" tag="section" class="content">
        <app-item
          v-for="(item, index) in wProducts"
          :key="index"
          :item="item"
          :index="index"
        />
      </transition-group>
      <transition-group v-else name="items" tag="section" class="content">
        <app-product
          v-for="(item, index) in wProducts"
          :key="index"
          :item="item"
          :index="index"
        />
      </transition-group>
    </div>
  </main>
</template>

<script>
import AppSidebar from './AppSidebar.vue'
import AppMasthead from './AppMasthead.vue'
import AppItem from './AppItem.vue'
import AppProduct from './AppProduct.vue'

export default {
  components: {
    AppSidebar,
    AppMasthead,
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
    wProducts () {
      return this.$store.getters.woman.filter(el =>
        this.$store.state.available
          ? el.available
          : true
      )
    }
  }
}
</script>
