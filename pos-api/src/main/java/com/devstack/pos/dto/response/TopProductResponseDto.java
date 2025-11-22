package com.devstack.pos.dto.response;

import com.devstack.pos.model.Product;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TopProductResponseDto {

    private ProductResponseDto product;
    private Long salesUnits;
    private BigDecimal price;
    private Integer stock;

}
