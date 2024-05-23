import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

import MainPage from './pages/MainPage.vue';
import EmployeeList from './pages/EmployeeList.vue';
import AddEmployee from './pages/AddEmployee.vue';
import FiredEmployees from './pages/FiredEmployees.vue';
import NotFound from './pages/NotFound.vue';
import EmployeeDetails from './pages/EmployeeDetails.vue';
import { employees } from './data/employees';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  { path: '/', component: MainPage },
  { path: '/employee-list', name: 'EmployeeList', component: EmployeeList, props: true },
  { path: '/add-employee', name: 'AddEmployee', component: AddEmployee },
  { path: '/fired-employees', name: 'FiredEmployees', component: FiredEmployees, props : {employees : employees, fired : true}},
  { path: '/404', name: '404', component: NotFound },
  { path: '*', redirect: '/404' },
  { path: '/employee-details/:id', name: 'employee-details', component: EmployeeDetails, props: (route) => ({ employee: employees[parseInt(route.params.id)], id : parseInt(route.params.id), employees : employees})}
];

const router = new VueRouter({
  routes,
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');