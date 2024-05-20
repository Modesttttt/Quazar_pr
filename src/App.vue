<template>
  <div id="app">
    <h1>Список сотрудников</h1>
    <table>
      <thead>
      </thead>
      <tbody> 
        <data-row 
          v-for="employee in employees"
          :key="employee.name" 
          :employee="employee"
        />
      </tbody> 
    </table> 
  </div> 
</template>

<script> 
import DataRow from './components/DataRow.vue'
import { employees } from './data/employees.js'

export default {
  components: { DataRow },
  data() { 
    return { employees: employees }; 
  }
}; 
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
