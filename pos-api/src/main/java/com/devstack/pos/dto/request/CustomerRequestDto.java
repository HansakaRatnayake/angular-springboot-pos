package com.devstack.pos.dto.request;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerRequestDto {
    private String customerName;
    private String customerAddress;
    private BigDecimal customerSalary;
}
