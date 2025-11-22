package com.devstack.pos.service;

import com.devstack.pos.dto.request.OrderRequestDto;
import com.devstack.pos.dto.response.OrderResponseDto;
import com.devstack.pos.dto.response.paginate.OrderPaginatedDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface OrderService {

    public OrderPaginatedDto search(String searchText, int page, int size);

    public OrderResponseDto findById(String id);

    public void create(OrderRequestDto dto);

//    public void update(String orderId, OrderRequestDto dto);

    public void delete(String orderId);

    public Double getTotalSales();

    public List<OrderResponseDto> findTop5Order();

    public Map<String,Integer> findSalesByOrderDate();



}
