<template>
  <div class="app-wrapper" v-if="!loading">
    <router-view></router-view>
    <h1>Список сотрудников</h1>

    <!-- Кнопка для переключения формы фильтра -->
    <button @click="toggleFilterForm">Показать/Скрыть фильтр</button>
    <!-- Кнопка для увольнения выбранных сотрудников -->
    <button @click="deleteEmployees">Уволить выбранных</button>
    <div style="margin-bottom: 15px;">{{ filteredEmployees.length }} из {{ employees.length }} сотрудников</div> 

    <!-- Форма фильтра, отображаемая при необходимости -->
    <filter-form v-if="showFilterForm" @apply-filter="applyFilter" />

    <table class="table">
      <thead>
        <tr>
          <!-- Колонка для выбора всех сотрудников -->
          <!--<th><input type="checkbox" @click="selectAll"></th>-->
          <!-- Колонки для отображения информации о сотрудниках -->
          <th> Имя</th>
          <th> Пол</th>
          <th> Дата рождения</th>
          <th> Организация</th>
          <th> Должность</th>
        </tr>
      </thead>
      <tbody>
        <!-- Компонент DataRow для отображения информации о каждом сотруднике -->
        <data-row
          v-for="employee in (filteredEmployees != null ? filteredEmployees : employees)"
          :key="employee.id"
          :employee="employee"
          @update-fired="updateFired"
          
        />
      </tbody>
    </table>
    <button @click="prevPage()" >Предыдущая</button>
    <button @click="nextPage()" >Следующая</button>
    </div>
    
    <LoaderComponent v-else :loading="loading"></LoaderComponent>
   </template>
   
<script>
// Импорт необходимых компонентов
import DataRow from '../components/DataRow.vue'
import FilterForm from '../components/FilterForm.vue'
import LoaderComponent from '../components/Loader.vue'
export default {
  // Регистрация компонентов для использования в шаблоне
  components: { 
    DataRow,  
    FilterForm,
    LoaderComponent 
  },
  data() {
    return {
      // Массив для хранения всех сотрудников
      employees: [],
      // Флаг для отображения формы добавления сотрудника
      showForm: false,
      // Флаг для отображения формы фильтра
      showFilterForm: false,
      // Массив для хранения отфильтрованных сотрудников
      filteredEmployees: [],
      loading : true,
      currentPage : 1,
      viewedItems : 20,
    };
  },
  created() {
    this.loadingPage()
  },

  methods: {
    // Метод для увольнения выбранных сотрудников
    deleteEmployees() {
      const selectedEmployees = this.filteredEmployees.filter(employee => employee.selected);
      this.employees = this.employees.filter(employee => !selectedEmployees.includes(employee));
      this.filteredEmployees = this.employees;
    },
    // Метод для выбора всех сотрудников
    selectAll() {
      this.filteredEmployees.forEach(employee => (employee.selected = true));
    },
    // Метод для переключения формы добавления сотрудника
    showAddEmployeeForm() {
      this.showForm = !this.showForm;
    },
    // Метод для обработки добавления нового сотрудника
    onEmployeeAdded(newEmployee) {
      this.employees.push(newEmployee);
      this.filteredEmployees.push(newEmployee);
      this.showForm = false;
    },
    // Метод для обновления статуса увольнения сотрудника
    updateFired(employee) {
      const index = this.employees.findIndex(e => e.name === employee.name);
      this.employees[index].fired = true;
      this.$router.push({ name: 'FiredEmployees' });
    },
    // Метод для переключения формы фильтра
    toggleFilterForm() {
      this.showFilterForm = !this.showFilterForm;
    },
    // Метод для применения фильтра к сотрудникам
    applyFilter(filter) {

    this.filteredEmployees = this.employees.filter(employee => {
      let matches = true;

      if (filter.name && !employee.name.toLowerCase().includes(filter.name.toLowerCase())) {
        matches = false;
      }

      if (filter.gender.length > 0 && !filter.gender.includes(employee.sex.toString())) {
        matches = false;
      }

      if (filter.organisation && !employee.organisation.toLowerCase().includes(filter.organisation.toLowerCase())) {
        matches = false;
      }

      if (filter.job_title && !employee.job_title.toLowerCase().includes(filter.job_title.toLowerCase())) {
        matches = false;
      }

      if (filter.isFired && !employee.fired) {
        matches = false;
      }
      

      return matches;
    });


    },
    nextPage(){
        this.currentPage++
        this.loadEmployees()
    },
    prevPage(){
        this.currentPage--
        this.loadEmployees()
    },
    loadingPage(){
      setTimeout(() => {
                this.loadEmployees()
            }, 2000);
    },

    loadEmployees(){
      const params = ``
      const axios = require('axios')
      axios.get(`http://localhost:3000/employees${params}`)
      .then((response)=> {
        this.employees = response.data;
        this.filteredEmployees = response.data;
        this.loading = false;
 
      })
      .catch((error) => {
        console.error('Ошибка при получении данных:', error);
        this.loading = false;
      });
    },
//?_page=${this.currentPage}&_per_page=${this.viewedItems}
    },
    
   };
   </script>
   
  
  <style>
  table {
    margin-top: 20px;
  }
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
  