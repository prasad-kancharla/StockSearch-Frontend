<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark kotakcherry">
      <router-link to="/" class="navbar-brand">Cherry (By Kotak)</router-link>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style>
.kotakcherry {
  background: #eb242b;
}
</style>
