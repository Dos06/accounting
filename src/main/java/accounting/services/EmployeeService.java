package accounting.services;

import accounting.models.Employee;

import java.util.List;

public interface EmployeeService {
    List<Employee> getAll();
    Employee getOne(Long id);
    Employee add(Employee employee);
    Employee save(Employee employee);
    void delete(Employee employee);
}
