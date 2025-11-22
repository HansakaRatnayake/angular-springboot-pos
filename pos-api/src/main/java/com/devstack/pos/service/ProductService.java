package com.devstack.pos.service;

import com.devstack.pos.dto.request.ProductRequestDto;
import com.devstack.pos.dto.response.ProductResponseDto;
import com.devstack.pos.dto.response.paginate.ProductPaginatedDto;
import org.springframework.stereotype.Service;

@Service
public interface ProductService {

    public ProductPaginatedDto search(String searchText, int page, int size);

    public ProductResponseDto findById(String id);

    public void create(ProductRequestDto dto);

    public void update(String productId, ProductRequestDto dto);

    public void delete(String productId);



}
