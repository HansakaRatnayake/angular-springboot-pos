package com.devstack.pos.dto.request;

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
public class OrderRequestDto {

    private String date;
    private BigDecimal nett;
    private String customer;
    private List<ItemRequestDto> items;
}
