import { makeAutoObservable } from 'mobx';
import { Employee } from '../../contract-types/data-contracts';
import { ViewedEmployee } from './viewedEmployee';

class ViewedEmployeesStore {
  private viewedEmployees = new Map<Employee['id'], ViewedEmployee>();

  getViewedEmployees() {
    return Array.from(this.viewedEmployees.values());
  }

  constructor() {
    makeAutoObservable(this);
  }

  addViewedEmployee(employee: ViewedEmployee) {
    this.viewedEmployees.set(employee.id, employee);
  }

  clearViewedEmployees() {
    this.viewedEmployees.clear();
  }
}

export const viewedEmployeesStore = new ViewedEmployeesStore();
