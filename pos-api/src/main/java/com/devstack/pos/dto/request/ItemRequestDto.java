package com.devstack.pos.dto.request;

import lombok.*;
import org.springframework.stereotype.Service;

@Getter
@Setter
@Service
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ItemRequestDto {
    private int qty;
    private String orderId;
    private String productId;
}
