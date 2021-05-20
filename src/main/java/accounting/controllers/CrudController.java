package accounting.controllers;

import accounting.controllers.requests.EmployeeRequest;
import accounting.controllers.requests.ItemsRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import accounting.models.*;
import accounting.services.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CrudController {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private ItemService itemService;

    @PostMapping(value = "/add/employees")
    public ResponseEntity<?> addEmployee(@RequestBody EmployeeRequest request) {
        Employee employee = new Employee();
        employee.setName(request.getName());
        return ResponseEntity.ok(employeeService.add(employee));
    }

    @DeleteMapping(value = "/delete/employees")
    public ResponseEntity<?> deleteEmployee(@RequestBody String id) {
        Employee employee = employeeService.getOne(Long.parseLong(id));
        employeeService.delete(employee);
        return ResponseEntity.ok(HttpEntity.EMPTY);
    }

    @PutMapping(value = "/edit/employees")
    public ResponseEntity<?> editEmployee(@RequestBody ItemsRequest request) {
        Employee employee = employeeService.getOne(request.getEmployeeId());
        if (employee != null) {
            List<Item> items = new ArrayList<>();
            for (Long id : request.getItemIds()) {
                items.add(itemService.getOne(id));
            }
            employee.setItems(items);
            return ResponseEntity.ok(employeeService.save(employee));
        }
        return ResponseEntity.ok(HttpEntity.EMPTY);
    }
}
