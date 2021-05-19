package accounting.services.impl;

import accounting.models.Item;
import accounting.repositories.ItemRepository;
import accounting.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {
    @Autowired
    private ItemRepository repository;

    @Override
    public List<Item> getAll() {
        return repository.findAll();
    }

    @Override
    public Item getOne(Long id) {
        return repository.getOne(id);
    }

    @Override
    public Item add(Item item) {
        return repository.save(item);
    }

    @Override
    public Item save(Item item) {
        return repository.save(item);
    }

    @Override
    public void delete(Item item) {
        repository.delete(item);
    }
}
