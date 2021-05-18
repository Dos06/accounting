package accounting.services;

import accounting.models.Employee;
import accounting.models.Item;

import java.util.List;

public interface ItemService {
    List<Item> getAll();
    List<Item> getAllByEmployee(Employee employee);
    Item getOne(Long id);
    Item add(Item item);
    Item save(Item item);
    void delete(Item item);
}
