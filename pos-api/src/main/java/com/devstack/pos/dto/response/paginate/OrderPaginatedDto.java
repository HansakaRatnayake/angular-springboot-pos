package com.devstack.pos.dto.response.paginate;

import com.devstack.pos.dto.response.OrderResponseDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderPaginatedDto {
    private long count;
    private List<OrderResponseDto> dataList;
}