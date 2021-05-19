package accounting.services;

import accounting.models.Item;

import java.util.List;

public interface ItemService {
    List<Item> getAll();
    Item getOne(Long id);
    Item add(Item item);
    Item save(Item item);
    void delete(Item item);
}
