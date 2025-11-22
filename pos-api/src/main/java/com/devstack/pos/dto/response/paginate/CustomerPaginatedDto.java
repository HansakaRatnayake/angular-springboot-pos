package com.devstack.pos.dto.response.paginate;

import com.devstack.pos.dto.response.CustomerResponseDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CustomerPaginatedDto {
    private long count;
    private List<CustomerResponseDto> dataList;
}