<template>
    <div class="app-wrapper">
      <router-view></router-view>
      <h1>Список сотрудников</h1>
      <button @click="toggleFilterForm">Показать/Скрыть фильтр</button>
      <div style="margin-bottom: 15px;">{{ filteredEmployees.length }} из {{ employees.length }} сотрудников</div>
      <filter-form v-if="showFilterForm" @apply-filter="applyFilter" />
      <table>
        <thead>
          <tr>
            <th> Имя</th>
            <th> Пол</th>
            <th> Дата рождения</th>
            <th> Организация</th>
            <th> Должность</th>
          </tr>
        </thead>
        <tbody> 
          <data-row 
            v-for="employee in filteredEmployees"
            :key="employee.name" 
            :employee="employee"
            :id="employee.id"
            @update-fired="updateFired"
          />
        </tbody> 
      </table>
      <new-employee-form :show-form="showForm" @employee-added="onEmployeeAdded" />
    </div>
   </template>
   
   <script>
  
   import DataRow from '../components/DataRow.vue'
   import NewEmployeeForm from '../components/NewEmployeeForm.vue'
   import FilterForm from '../components/FilterForm.vue'
   import { employees } from '../data/employees.js'
   employees.forEach((employee, index=0) => {
    employee.id = index + 1; 
   });
   export default {
    components: { DataRow, NewEmployeeForm, FilterForm},
    data() {
     return {
       employees: employees,
       showForm: false,
       showFilterForm: false,
       filteredEmployees:[],
     };
     
    },
    created() {
    if (this.$route.params.newEmployee) {
      const newEmployee = this.$route.params.newEmployee;
      this.employees.push(newEmployee);
    }
    },
    methods: {
      showAddEmployeeForm() {
        this.showForm = !this.showForm; 
      },
      onEmployeeAdded(newEmployee) {
        this.employees.push(newEmployee); 
        this.filteredEmployees.push(newEmployee);
        this.showForm = false; 
      },
      updateFired(employee) {
        const index = this.employees.findIndex(e => e.name === employee.name);
        this.employees[index].fired = true;
        this.$router.push({ name: 'FiredEmployees' });
      },
      
      toggleFilterForm() {
      this.showFilterForm = !this.showFilterForm;
      },
      applyFilter(filter) {
      const { name, gender, organisation, job_title, isFired } = filter;
  
      this.filteredEmployees = this.employees.filter(employee => { 
      let matches = true;
  
      if (name && !employee.name.toLowerCase().includes(name.toLowerCase())) { 
      matches = false;
      }
  
      if (gender.length > 0 && !gender.includes(employee.sex.toString())) { 
      matches = false;
      }
  
      if (organisation && !employee.organisation.toLowerCase().includes(organisation.toLowerCase())) { 
      matches = false; 
      }
  
      if (job_title && ! employee.job_title.toLowerCase().includes(job_title.toLowerCase())) { 
      matches = false; 
      }
  
      if (isFired && !employee.fired) { 
      matches = false; 
      }
  
      return matches; 
      });
      },
    }
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
  