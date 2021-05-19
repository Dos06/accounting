package accounting.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import accounting.models.*;
import accounting.services.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CrudController {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private ItemService itemService;

    @PostMapping(value = "/add/employees")
    public ResponseEntity<?> addCategory(@RequestBody String name) {
        Employee employee = new Employee();
        employee.setName(name);
        return ResponseEntity.ok(employeeService.add(employee));
    }

    @DeleteMapping(value = "/delete/employees")
    public ResponseEntity<?> deleteCategory(@RequestBody String id) {
        Employee employee = employeeService.getOne(Long.parseLong(id));
        employeeService.delete(employee);
        return ResponseEntity.ok(HttpEntity.EMPTY);
    }
}
