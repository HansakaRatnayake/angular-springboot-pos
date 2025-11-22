package com.devstack.pos.repository;

import com.devstack.pos.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, String> {

    @Query(value = "SELECT * FROM order_details WHERE order_id LIKE %?1%", nativeQuery = true)
    public Page<Order> search(String searchText, Pageable pageable);

    @Query(value = "SELECT COUNT(*) FROM order_details WHERE order_id LIKE %?1%", nativeQuery = true)
    public Integer searchCount(String searchText);

    @Query(value = "SELECT SUM(o.nett) FROM Order o")
    public Double findTotalSales();

    public List<Order> findTop5ByOrderByDateDesc();



}
