package com.devstack.pos.repository;

import com.devstack.pos.dto.response.paginate.ProductPaginatedDto;
import com.devstack.pos.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, String> {

    @Query(value = "SELECT * FROM product WHERE description LIKE %?1% OR product_id LIKE %?1%", nativeQuery = true)
    public Page<Product> search(String searchText, Pageable pageable);

    @Query(value = "SELECT COUNT(*) FROM product WHERE description LIKE %?1% OR product_id LIKE %?1%", nativeQuery = true)
    public Integer searchCount(String searchText);

    @Modifying
    @Query("UPDATE Product p SET p.qtyOnHand = p.qtyOnHand - :quantity WHERE p.productId = :productId AND p.qtyOnHand >= :quantity")
    int decreaseQuantity(@Param("productId") String productId, @Param("quantity") int quantity);


}
