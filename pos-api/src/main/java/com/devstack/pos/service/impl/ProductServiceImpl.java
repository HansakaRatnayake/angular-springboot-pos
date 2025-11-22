package com.devstack.pos.service.impl;

import com.devstack.pos.dto.request.ProductRequestDto;
import com.devstack.pos.dto.response.ProductResponseDto;
import com.devstack.pos.dto.response.paginate.ProductPaginatedDto;
import com.devstack.pos.exception.EntryNotFoundException;
import com.devstack.pos.model.Product;
import com.devstack.pos.repository.ProductRepository;
import com.devstack.pos.service.ProductService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.UUID;


@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public ProductPaginatedDto search(String searchText, int page, int size) {
        return ProductPaginatedDto.builder()
                .dataList(productRepository.search(searchText, PageRequest.of(page,size)).map(this::toProductResponseDto).stream().toList())
                .count(productRepository.searchCount(searchText))
                .build();
    }

    @Override
    public ProductResponseDto findById(String id) {
        return productRepository.findById(id).map(this::toProductResponseDto).orElseThrow(() -> new EntryNotFoundException("Product not found"));
    }

    @Override
    public void create(ProductRequestDto dto) {
        productRepository.save(toProduct(dto));
    }

    @Override
    public void update(String productId, ProductRequestDto dto) {
        Product selectedProduct = productRepository.findById(productId).orElseThrow(() -> new EntryNotFoundException("Product not found"));

        selectedProduct.setDescription(dto.getDescription());
        selectedProduct.setQtyOnHand(dto.getQtyOnHand());
        selectedProduct.setUnitPrice(dto.getUnitPrice());

        productRepository.save(selectedProduct);

    }

    @Override
    public void delete(String productId) {
        if (!productRepository.existsById(productId)) {
            throw new EntityNotFoundException("Product not found");
        }else {
            productRepository.deleteById(productId);
        }
    }

    public Product toProduct(ProductRequestDto dto) {
        return Product.builder()
                .productId(UUID.randomUUID().toString())
                .description(dto.getDescription())
                .qtyOnHand(dto.getQtyOnHand())
                .unitPrice(dto.getUnitPrice())
                .build();
    }

    public ProductResponseDto toProductResponseDto(Product product) {
        return product == null ? null : ProductResponseDto.builder()
                .id(product.getProductId())
                .description(product.getDescription())
                .qtyOnHand(product.getQtyOnHand())
                .unitPrice(product.getUnitPrice())
                .build();
    }
}
