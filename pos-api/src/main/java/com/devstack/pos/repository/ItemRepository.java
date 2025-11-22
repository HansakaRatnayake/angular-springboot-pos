package com.devstack.pos.repository;

import com.devstack.pos.dto.response.converters.TopProductConvertor;
import com.devstack.pos.model.Item;
import com.devstack.pos.model.TopProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, String> {


    @Query(value = "SELECT product_id AS productId, COUNT(*) AS totalItems " +
            "FROM item GROUP BY product_id ORDER BY totalItems DESC",
            nativeQuery = true)
    public List<TopProductConvertor> getTop5ProductCounts();

}
