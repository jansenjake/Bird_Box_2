<template>
  <div>
    <NavBar />
    <router-view />
    <FooterComponent />
    <HomeView />
    <ProductsVue />

  </div>
</template>

<script>
import NavBar from '../src/components/NavBar.vue'
import FooterComponent from '../src/components/FooterComponent.vue'
export default {
  name: 'App',
  components: { NavBar, FooterComponent }
}
</script>

<style>
body {
  background: url(./assets/bg_copy.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  height: 720px;
}
</style>
