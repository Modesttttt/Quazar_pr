<template>
  <div class="fired-employees">
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
</template>

<script>
// Импорт компонента DataRow
import DataRow from '../components/DataRow.vue';

export default {
  // Регистрация компонента DataRow
  components: {
    DataRow,
  },
  // Прием данных сотрудников от родительского компонента
  props: {
    employees: Array,
  },
  // Вычисление списка уволенных сотрудников
  computed: {
    firedEmployees() {
      return this.employees.filter(employee => employee.fired);
    },
  },
};
</script>

  
  <style scoped>
 
  </style>