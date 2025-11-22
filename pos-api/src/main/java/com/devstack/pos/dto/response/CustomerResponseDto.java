package com.devstack.pos.dto.response;

import lombok.*;

import java.math.BigDecimal;


@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerResponseDto {

    private String customerId;

    private String customerName;

    private String customerAddress;

    private BigDecimal customerSalary;

}
