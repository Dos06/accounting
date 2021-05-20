package accounting.controllers.requests;

import accounting.models.Item;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemsRequest {
    private Long employeeId;
    private List<Item> items;
}
