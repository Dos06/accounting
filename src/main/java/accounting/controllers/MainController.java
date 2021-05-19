package accounting.controllers;

import accounting.models.Employee;
import accounting.models.Item;
import accounting.services.EmployeeService;
import accounting.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MainController {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private ItemService itemService;

    @GetMapping(value = "/employees")
    public ResponseEntity<?> getEmployees() {
        List<Employee> employees = employeeService.getAll();
        return ResponseEntity.ok(Objects.requireNonNullElse(employees, HttpEntity.EMPTY));
    }

    @GetMapping(value = "/items")
    public ResponseEntity<?> getItems() {
        List<Item> items = itemService.getAll();
        return ResponseEntity.ok(Objects.requireNonNullElse(items, HttpEntity.EMPTY));
    }

    @GetMapping(value = "/employees/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeService.getOne(id);
        return ResponseEntity.ok(Objects.requireNonNullElse(employee, HttpEntity.EMPTY));
    }
}
