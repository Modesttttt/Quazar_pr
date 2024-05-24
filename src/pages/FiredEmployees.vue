<template>
  <div class="fired-employees" v-if="!loading">
    <!-- Заголовок -->
    <h1>Уволенные сотрудники</h1>
    <!-- Таблица с информацией о сотрудниках -->
    <table>
      <thead>
        <tr>
          <!-- Заголовки столбцов -->
          <th>Имя</th>
          <th>Пол</th>
          <th>Дата рождения</th>
          <th>Организация</th>
          <th>Должность</th>
        </tr>
      </thead>
      <tbody>
        <!-- Компонент DataRow для отображения информации о каждом сотруднике -->
        <data-row
          v-for="employee in firedEmployees"
          :key="employee.name"
          :employee="employee"
        />
      </tbody>
    </table>
  </div>
  <LoaderComponent v-else :loading="loading"></LoaderComponent>
</template>

<script>
// Импорт компонента DataRow
import DataRow from '../components/DataRow.vue';
import LoaderComponent from '../components/Loader.vue'

import axios from 'axios';

export default {
  components: {
    DataRow,
    LoaderComponent,
  },
  data() {
    return {
      firedEmployees: [], // Массив для хранения уволенных сотрудников
      loading : true,
    };
  },
  created() {
    this.loading = true;
    // Получение списка уволенных сотрудников с сервера
    axios.get('http://localhost:3000/employees?fired=true')
      .then(response => {
        this.firedEmployees = response.data;
        setTimeout(() => {
          this.loading = false;
        }, 2000); 
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
        this.loading = false;
      });
  },
};
</script>

  
  <style scoped>
 
  </style>