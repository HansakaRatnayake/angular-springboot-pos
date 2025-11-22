package com.devstack.pos.dto.response.paginate;

import com.devstack.pos.dto.response.CustomerResponseDto;
import com.devstack.pos.dto.response.ProductResponseDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductPaginatedDto {
    private long count;
    private List<ProductResponseDto> dataList;
}