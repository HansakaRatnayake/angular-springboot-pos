package com.devstack.pos.dto.response;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ItemResponseDto {

    private String id;
    private int qty;
    private BigDecimal unitPrice;
    private ProductResponseDto product;

}
