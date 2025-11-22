package com.devstack.pos.api;


import com.devstack.pos.service.impl.ItemServiceImpl;
import com.devstack.pos.service.impl.ProductServiceImpl;
import com.devstack.pos.util.StandardResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/items/top")
public class ItemController {

    private final ItemServiceImpl itemService;

    @GetMapping
    public ResponseEntity<StandardResponseDto> getTopProductItems() {
        return new ResponseEntity<StandardResponseDto>(
                new StandardResponseDto(200, "Top 5 product item list", itemService.findTopSaleProducts()),
                HttpStatus.OK
        );
    }
}
