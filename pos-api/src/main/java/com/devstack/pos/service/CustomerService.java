package com.devstack.pos.service;

import com.devstack.pos.dto.request.CustomerRequestDto;
import com.devstack.pos.dto.response.CustomerResponseDto;
import com.devstack.pos.dto.response.paginate.CustomerPaginatedDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CustomerService {

    public CustomerPaginatedDto search(String searchText, int page, int size);

    public CustomerResponseDto findById(String id);

    public void create(CustomerRequestDto dto);

    public void update(String customerId, CustomerRequestDto dto);

    public void delete(String customerId);

}
