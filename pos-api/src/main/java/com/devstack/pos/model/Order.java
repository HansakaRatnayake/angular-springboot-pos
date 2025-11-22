package com.devstack.pos.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "order_details")
public class Order {

    @Id
    @Column(nullable = false, length = 50)
    private String orderId;

    @Column(nullable = false,  columnDefinition = "TIMESTAMP")
    private LocalDateTime date;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal nett;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn( name = "customer_id", nullable = false)
    private Customer customer;

    @OneToMany(mappedBy = "order" , cascade = CascadeType.ALL)
    private List<Item> items;

}
