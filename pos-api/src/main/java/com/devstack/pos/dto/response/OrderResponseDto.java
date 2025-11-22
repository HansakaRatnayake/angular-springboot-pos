package com.devstack.pos.dto.response;

import com.devstack.pos.model.Customer;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDto {

    private String orderId;
    private String date;
    private BigDecimal nett;
    private Customer customer;
    private List<ItemResponseDto> items;
}
