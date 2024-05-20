<template>
  <tr>
    <td>{{ employee.name }}</td>
    <td>{{ formatGender(employee.sex) }}</td>
    <td>{{ formatDate(employee.birth_date) }}</td>
    <td>{{ employee.organisation }}</td>
    <td>{{ employee.job_title }}</td>
    <td>
      <span v-if="employee.fired">уволен</span>
    </td>
  </tr>
</template>

<script>
import dayjs from 'dayjs';

export default {
  props: {
    employee: Object
  },
  methods: {
    formatDate(value) {
      const date = dayjs.unix(value);
      return date.format('DD.MM.YYYY');
    },
    formatGender(gender) {
      return gender ? 'женский' : 'мужской';
    }
  }
};
</script>


<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
