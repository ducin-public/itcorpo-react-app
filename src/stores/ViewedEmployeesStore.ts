import { makeAutoObservable } from 'mobx';
import { Employee } from '../types';
import { generateEmployee } from '../mock-utils/mockData';

class ViewedEmployeesStore {
  viewedEmployees: Employee[] = Array.from({ length: 5 }).map(generateEmployee)

  constructor() {
    makeAutoObservable(this);
  }

  addViewedEmployee(employee: Employee) {
    if (!this.viewedEmployees.find(e => e.id === employee.id)) {
      this.viewedEmployees.push(employee);
    }
  }

  clearViewedEmployees() {
    this.viewedEmployees = [];
  }
}

export const viewedEmployeesStore = new ViewedEmployeesStore();