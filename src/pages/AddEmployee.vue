<template>
    <div class="app-wrapper">
      <router-view></router-view>
      <h1>Добавление сотрудника</h1>
      <NewEmployeeForm :showForm="true" @employee-added="onEmployeeAdded" />
    </div>
  </template>
  
  <script>
  import NewEmployeeForm from '../components/NewEmployeeForm.vue';
  
  export default {
    components: {NewEmployeeForm },
    methods: {
      onEmployeeAdded(newEmployee) {
        this.$router.push({ name: 'EmployeeList', params: { newEmployee } });
      },
    },
  };
  </script>
  
  <style>

  </style>