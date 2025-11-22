package com.devstack.pos.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;


@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Customer {

    @Id
    @Column(nullable = false)
    private String customerId;

    @Column(nullable = false, length = 50)
    private String customerName;

    @Column(nullable = false, length = 100)
    private String customerAddress;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal customerSalary;

    @JsonIgnore
    @OneToMany(mappedBy = "customer")
    private List<Order> orders;

}

