<template>
  <div class="fired-employees" v-if="!loading">
    <h1>Медосмотры</h1>
    <!-- Таблица с информацией о медосмотрах -->
    <table>
      <thead>
        <tr>
          <th>Доктор</th>
          <th>Сотрудник</th>
          <th>Температура</th>
          <th>Верхнее давление</th>
          <th>Нижнее давление</th>
        </tr>
      </thead>
      <tbody>
        <!-- Компонент DataRow для отображения информации о каждом сотруднике -->
        <data-row-2
        v-for="medexam in medexams"
          :key="medexam.id"
          :medexam="medexam"
        />
      </tbody>
    </table>
  </div>
  <LoaderComponent v-else :loading="loading"></LoaderComponent>
</template>
<script>
import DataRow2 from '../components/DataRow2.vue'

import LoaderComponent from '../components/Loader.vue'
export default {
  // Регистрация компонентов для использования в шаблоне
  components: { 
    LoaderComponent,
    DataRow2 
  },
  data() {
    return {
      // Массив для хранения всех сотрудников
      employees: [],
      medexams: [],
      loading : true,
      currentPage : 1,
      viewedItems : 20,
    };
  },
  created() {
    this.loadingPage()
  },
  methods: {
    loadingPage(){
      setTimeout(() => {
                this.loadEmployees()
            }, 2000);
    },

    loadEmployees() {
        const axios = require('axios');
        axios.get('http://localhost:3000/employees')
            .then((response) => {
                this.employees = response.data;
                this.loadMedexams(); 
            })
            .catch((error) => {
                console.error('Ошибка при получении данных:', error);
                this.loading = false;
            });
    },
    loadMedexams() {
        const axios = require('axios');
        axios.get('http://localhost:3000/medexams')
            .then((response) => {
                this.medexams = response.data;
                setTimeout(() => {
                    this.loading = false;
            }, 2000);
            })
            .catch((error) => {
                console.error('Ошибка при получении данных:', error);
                this.loading = false;
            });
    },
    getEmployeeById(employeeID) {
        return this.employees.find(employee => employee.id === employeeID);
    }

}}
</script>
<style>
tr{
    text-align: center;
}
</style>