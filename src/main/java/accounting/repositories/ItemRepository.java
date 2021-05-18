package accounting.repositories;

import accounting.models.Employee;
import accounting.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findAllByEmployee(Employee employee);
}
