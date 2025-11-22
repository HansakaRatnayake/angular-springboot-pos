package com.devstack.pos.service.impl;

import com.devstack.pos.dto.request.OrderRequestDto;
import com.devstack.pos.dto.response.OrderResponseDto;
import com.devstack.pos.dto.response.paginate.OrderPaginatedDto;
import com.devstack.pos.exception.EntryNotFoundException;
import com.devstack.pos.model.Item;
import com.devstack.pos.model.Order;
import com.devstack.pos.model.Product;
import com.devstack.pos.repository.CustomerRepository;
import com.devstack.pos.repository.ItemRepository;
import com.devstack.pos.repository.OrderRepository;
import com.devstack.pos.repository.ProductRepository;
import com.devstack.pos.service.ItemService;
import com.devstack.pos.service.OrderService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final CustomerRepository customerRepository;
    private final ItemServiceImpl itemService;
    private final ItemRepository itemRepository;


    @Override
    public OrderPaginatedDto search(String searchText, int page, int size) {

        return OrderPaginatedDto.builder()
                .dataList(orderRepository.search(searchText, PageRequest.of(page, size)).map(this::toOrderResponseDto).stream().toList())
                .count(orderRepository.count())
                .build();
    }

    @Override
    public OrderResponseDto findById(String id) {
        Order selectedOrder = orderRepository.findById(id).orElseThrow(() -> new EntryNotFoundException("Order not found"));

        return toOrderResponseDto(selectedOrder);
    }

    @Override
    public void create(OrderRequestDto dto) {
//        orderRepository.save(toOrder(dto));
//        itemService.createAll(dto.getItems());

        Order order = toOrder(dto);
        order.setItems(null);
        orderRepository.save(order);

        List<Item> items = dto.getItems().stream()
                .map(itemRequestDto -> {
                    itemRequestDto.setOrderId(order.getOrderId());
                    return itemService.toItem(itemRequestDto, order);
                })
                .collect(Collectors.toList());

        itemRepository.saveAll(items);

        items.forEach(item -> productRepository.decreaseQuantity(item.getProduct().getProductId(), item.getQty()));

        order.setItems(items);
        orderRepository.save(order);


    }


    @Override
    public void delete(String orderId) {
        orderRepository.findById(orderId).orElseThrow(() -> new EntryNotFoundException("Order not found"));
        orderRepository.deleteById(orderId);
    }

    @Override
    public Double getTotalSales() {
        return orderRepository.findTotalSales();
    }

    @Override
    public List<OrderResponseDto> findTop5Order() {
        return this.orderRepository.findTop5ByOrderByDateDesc().stream().map(this::toOrderResponseDto).collect(Collectors.toList());
    }

    @Override
    public Map<String,Integer> findSalesByOrderDate() {
        List<Order> orderList = this.orderRepository.findAll();
        HashMap<String, Integer> sales = new HashMap<>();

        sales.put("January",0);
        sales.put("February",0);
        sales.put("March",0);
        sales.put("April",0);
        sales.put("May",0);
        sales.put("June",0);
        sales.put("July",0);
        sales.put("August",0);
        sales.put("September",0);
        sales.put("October",0);
        sales.put("November",0);
        sales.put("December",0);

        orderList.forEach(order -> {
            switch (order.getDate().getMonth()){
                case JANUARY:sales.replace("January",(sales.get("January") +1));break;
                case FEBRUARY:sales.replace("February",(sales.get("February") +1));break;
                case MARCH:sales.replace("March",(sales.get("March") +1));break;
                case APRIL:sales.replace("April",(sales.get("April") +1));break;
                case MAY:sales.replace("May",(sales.get("May") +1));break;
                case JUNE:sales.replace("June",(sales.get("June") +1));break;
                case JULY:sales.replace("July",(sales.get("July") +1));break;
                case AUGUST:sales.replace("August",(sales.get("August") +1));break;
                case SEPTEMBER:sales.replace("September",(sales.get("September") +1));break;
                case OCTOBER:sales.replace("October",(sales.get("October") +1));break;
                case NOVEMBER:sales.replace("November",(sales.get("November") +1));break;
                case DECEMBER:sales.replace("December",(sales.get("December") +1));break;
            }
        });

        return sales;

    }

    private OrderResponseDto toOrderResponseDto(Order order) {
        return OrderResponseDto.builder()
                .orderId(order.getOrderId())
                .nett(order.getNett())
                .customer(order.getCustomer())
                .date(order.getDate().toString())
                .items(order.getItems().stream().map(itemService::toItemResponseDto).collect(Collectors.toList()))
                .build();
    }

    private Order toOrder(OrderRequestDto dto) {
        System.out.println(dto.getCustomer());
        String orderID = UUID.randomUUID().toString();

        return Order.builder()
                .orderId(orderID)
                .date(LocalDateTime.now())
                .nett(dto.getNett())
                .customer(customerRepository.findById(dto.getCustomer()).orElseThrow(() -> new EntryNotFoundException("Customer not found")))
                .items(null)
                .build();
    }

}
