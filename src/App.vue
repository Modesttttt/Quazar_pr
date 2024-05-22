<template>
  <div class="app-wrapper">
    <Sidebar />
    <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';

export default {
  components: { Sidebar },
};
</script>
 

<style>
button {
  background: #2d9c9c;
  color: #fff;
  border-radius: 10px;
  border: 2px solid #81728f;
  padding: 10px 15px;
  margin-left: 20px;
  cursor: pointer;
  transition: transform 500ms ease;
  margin-bottom: 20px;
}
.app-wrapper {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #183b58;
  margin-top: 60px;
}
</style>
