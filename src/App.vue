<template>
  <div id="app">
    <router-view />
    <footer-guide v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import FooterGuide from '@/components/FooterGuide/FooterGuide'
import { mapActions } from 'vuex'
export default {
  mounted() {
    this.getAddress()
    this.getUserInfo()
  },
  name: 'App',

  methods: {
    ...mapActions(['getAddress', 'getUserInfo'])
  },
  components: {
    FooterGuide
  }
}
</script>

<style lang="css">
#app {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  position: relative;
}
* {
  touch-action: pan-y;
}
</style>
