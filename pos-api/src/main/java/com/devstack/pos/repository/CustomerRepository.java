package com.devstack.pos.repository;

import com.devstack.pos.model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CustomerRepository extends JpaRepository<Customer, String> {

    @Query(value = "SELECT * from customer where customer_name LIKE %?1% or customer_address LIKE %?1%", nativeQuery = true)
    public Page<Customer> search(String searchText, Pageable pageable);

    @Query(value = "SELECT COUNT(*) FROM customer WHERE customer_name LIKE %?1% OR customer_address LIKE %?1%" , nativeQuery = true)
    public Integer searchCount(String searchText);

}
