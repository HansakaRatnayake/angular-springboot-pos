package com.devstack.pos.dto.request;

import jakarta.persistence.Column;
import lombok.*;

import java.math.BigDecimal;


@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequestDto {

    private String description;
    private BigDecimal unitPrice;
    private int qtyOnHand;
}
