package com.devstack.pos.api;

import com.devstack.pos.dto.request.ProductRequestDto;
import com.devstack.pos.service.impl.ProductServiceImpl;
import com.devstack.pos.util.StandardResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductServiceImpl productService;

    @GetMapping
    public ResponseEntity<StandardResponseDto> search(@RequestParam String searchText, @RequestParam int page, @RequestParam int size) {
        return new ResponseEntity<StandardResponseDto>(
                new StandardResponseDto(200, "Product list", productService.search(searchText,page,size)),
                HttpStatus.OK
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<StandardResponseDto> findProductById(@PathVariable String id) {
        return new ResponseEntity<StandardResponseDto>(
                new StandardResponseDto(200, "Product found", productService.findById(id)),
                HttpStatus.OK
        );
    }

    @PostMapping
    public ResponseEntity<StandardResponseDto> saveProduct(@RequestBody ProductRequestDto productRequestDto) {
        productService.create(productRequestDto);
        return new ResponseEntity<>(
                new StandardResponseDto(201, "Product saved", productRequestDto),
                HttpStatus.CREATED
        );
    }


    @PutMapping("/{id}")
    public ResponseEntity<StandardResponseDto> updateProduct(@PathVariable String id, @RequestBody ProductRequestDto productRequestDto) {
        productService.update(id,productRequestDto);
        return new ResponseEntity<>(
                new StandardResponseDto(201, "Product updated", productRequestDto),
                HttpStatus.CREATED
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<StandardResponseDto> deleteProduct(@PathVariable String id) {
        productService.delete(id);
        return new ResponseEntity<>(
                new StandardResponseDto(204, "Product deleted", null),
                HttpStatus.NO_CONTENT
        );
    }
}
