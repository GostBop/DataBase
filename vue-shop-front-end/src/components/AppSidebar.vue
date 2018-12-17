<template>
  <aside>
    <div class="sidearea">
      <label for="pricerange">Highest Price: <span>${{ pricerange }}</span></label>
      <input
        class="slider"
        id="pricerange"
        type="range"
        :value="pricerange"
        :min="min"
        :max="max"
        step="0.1"
        @input="$emit('update:pricerange', $event.target.value)"
      />
      <span class="min">${{ min }}</span>
      <span class="max">${{ max }}</span>
    </div>
    <app-switch v-if="isBuyer" />
    <div class="sidearea callout">
      <h4>Attention</h4>
      <p>The profits we earn from these items will be donated to save a programmer</p>
    </div>
    <div class="sidearea callout">
      <h4>Contact Us</h4>
      <p>Questions? Call us at 1-888-555-SHOP, we're happy to be of service.</p>
    </div>
  </aside>
</template>

<script>
import AppSwitch from './AppSwitch'
export default {
  props: {
    available: {
      type: Boolean,
      default: false
    },
    pricerange: {
      type: [Number, String],
      default: 300
    }
  },
  data () {
    return {
      min: 0,
      max: 9999
    }
  },
  components: {
    AppSwitch
  },
  computed: {
    isBuyer () {
      return this.$store.state.isBuyer
    }
  }
}
</script>

<style scoped lang="scss">
  aside {
    background: white;
    float: left;
    padding: 20px;
  }

  .sidearea {
    border-bottom: 1px solid #ccc;
  &:last-of-type {
     border: none;
   }
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
