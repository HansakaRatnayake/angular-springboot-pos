package com.devstack.pos.dto.response;

import lombok.*;

import java.math.BigDecimal;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponseDto {

    private String id;
    private String description;
    private BigDecimal unitPrice;
    private int qtyOnHand;
}
