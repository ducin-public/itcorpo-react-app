import { makeAutoObservable } from 'mobx';
import { Employee } from '../../contract-types/data-contracts';

class ViewedEmployeesStore {
  viewedEmployees: Employee[] = []

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