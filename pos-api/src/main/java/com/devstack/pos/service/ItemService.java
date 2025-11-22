package com.devstack.pos.service;

import com.devstack.pos.dto.request.ItemRequestDto;
import com.devstack.pos.dto.response.ItemResponseDto;
import com.devstack.pos.dto.response.TopProductResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ItemService {

    public List<ItemResponseDto> search(String searchText, int page, int size);

    public ItemResponseDto findById(String id);

//    public void createAll(List<ItemRequestDto> dtos, Order order);

    public void update(String itemId, ItemRequestDto dto);

    public void delete(String itemId);

    public List<TopProductResponseDto> findTopSaleProducts();

}
