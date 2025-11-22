package com.devstack.pos.service.impl;

import com.devstack.pos.dto.request.ItemRequestDto;
import com.devstack.pos.dto.response.ItemResponseDto;
import com.devstack.pos.dto.response.TopProductResponseDto;
import com.devstack.pos.dto.response.converters.TopProductConvertor;
import com.devstack.pos.exception.EntryNotFoundException;
import com.devstack.pos.model.Item;
import com.devstack.pos.model.Order;
import com.devstack.pos.model.Product;
import com.devstack.pos.model.TopProduct;
import com.devstack.pos.repository.ItemRepository;
import com.devstack.pos.repository.OrderRepository;
import com.devstack.pos.repository.ProductRepository;
import com.devstack.pos.service.ItemService;
import com.devstack.pos.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static org.hibernate.internal.util.collections.ArrayHelper.forEach;

@Service
@Transactional
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    private final ProductServiceImpl productService;

    @Override
    public List<ItemResponseDto> search(String searchText, int page, int size) {
        return List.of();
    }

    @Override
    public ItemResponseDto findById(String id) {
        Item selectedItem = itemRepository.findById(id).orElseThrow(() -> new EntryNotFoundException("Item not found"));

        return ItemResponseDto.builder()
                .id(selectedItem.getId())
                .qty(selectedItem.getQty())
                .unitPrice(selectedItem.getUnitPrice())
                .build();
    }

//    @Override
//    public void createAll(List<ItemRequestDto> dtos, Order order) {
//        itemRepository.saveAll(dtos.stream().map(itemRequestDto -> toItem(itemRequestDto,order)).collect(Collectors.toList()));
//
//        dtos.forEach(item -> {
//            productRepository.decreaseQuantity(item.getProductId(),item.getQty());
//        });
//    }


    @Override
    public void update(String itemId, ItemRequestDto dto) {

    }

    @Override
    public void delete(String itemId) {

    }

    @Override
    public List<TopProductResponseDto> findTopSaleProducts() {
        List<TopProductConvertor> top5ProductsDetails= itemRepository.getTop5ProductCounts();
        return top5ProductsDetails.stream().map(item -> {
            Product selectedProduct = this.productRepository.findById(item.getProductId()).orElseThrow(() -> new EntryNotFoundException("product not found"));
            return TopProductResponseDto.builder()
                    .product(this.productService.toProductResponseDto(selectedProduct))
                    .salesUnits(item.getTotalItems())
                    .price(selectedProduct.getUnitPrice().multiply(BigDecimal.valueOf(item.getTotalItems())))
                    .stock(selectedProduct.getQtyOnHand())
                    .build();
        }).collect(Collectors.toList());
    }

//    public Item toItem(ItemRequestDto dto) {
//        Product selectedProduct = productRepository.findById(dto.getProductId()).orElseThrow(() -> new EntryNotFoundException("Product not Found"));
//
//        return Item.builder()
//                .id(UUID.randomUUID().toString())
//                .order(orderRepository.findById(dto.getOrderId()).orElseThrow(() -> new EntryNotFoundException("Order not found")))
//                .product(selectedProduct)
//                .qty(dto.getQty())
//                .unitPrice(selectedProduct.getUnitPrice())
//                .build();
//    }


    public Item toItem(ItemRequestDto dto, Order order) {
        Product selectedProduct = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new EntryNotFoundException("Product not Found"));

        return Item.builder()
                .id(UUID.randomUUID().toString())
                .order(order) // Assign the already saved order
                .product(selectedProduct)
                .qty(dto.getQty())
                .unitPrice(selectedProduct.getUnitPrice())
                .build();
    }



    public ItemResponseDto toItemResponseDto(Item item) {
        return ItemResponseDto.builder()
                .id(item.getId())
                .qty(item.getQty())
                .unitPrice(item.getUnitPrice())
                .product(productService.toProductResponseDto(item.getProduct()))
                .build();
    }
}
