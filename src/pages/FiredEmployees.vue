<template>
    <div class="fired-employees">
      <h1>Уволенные сотрудники</h1>
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Пол</th>
            <th>Дата рождения</th>
            <th>Организация</th>
            <th>Должность</th>
          </tr>
        </thead>
        <tbody>
          <data-row v-for="employee in firedEmployees" :key="employee.name" :employee="employee" />
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import DataRow from '../components/DataRow.vue';
  
  export default {
    components: {
      DataRow
    },
    props: {
      employees: Array,
    },
    computed: {
      firedEmployees() {
        return this.employees.filter(employee => employee.fired);
      }
    }
  };
  </script>
  
  <style scoped>
 
  </style>