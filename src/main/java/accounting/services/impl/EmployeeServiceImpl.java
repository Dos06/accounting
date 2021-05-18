package accounting.services.impl;

import accounting.models.Employee;
import accounting.repositories.EmployeeRepository;
import accounting.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeRepository repository;

    @Override
    public List<Employee> getAll() {
        return repository.findAll();
    }

    @Override
    public Employee getOne(Long id) {
        return repository.getOne(id);
    }

    @Override
    public Employee add(Employee employee) {
        return repository.save(employee);
    }

    @Override
    public Employee save(Employee employee) {
        return repository.save(employee);
    }

    @Override
    public void delete(Employee employee) {
        repository.delete(employee);
    }
}
