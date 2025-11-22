package com.devstack.pos.api;

import com.devstack.pos.dto.request.CustomerRequestDto;
import com.devstack.pos.dto.request.OrderRequestDto;
import com.devstack.pos.service.impl.CustomerServiceImpl;
import com.devstack.pos.service.impl.OrderServiceImpl;
import com.devstack.pos.util.StandardResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/orders")
public class OrderController {

    private final OrderServiceImpl orderService;

    @GetMapping
    public ResponseEntity<StandardResponseDto> search(@RequestParam String searchText, @RequestParam int page, @RequestParam int size) {
        return new ResponseEntity<StandardResponseDto>(
                new StandardResponseDto(200, "Order list", orderService.search(searchText,page,size)),
                HttpStatus.OK
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<StandardResponseDto> findOrderById(@PathVariable String id) {
        return new ResponseEntity<StandardResponseDto>(
                new StandardResponseDto(200, "Order found", orderService.findById(id)),
                HttpStatus.OK
        );
    }

    @PostMapping
    public ResponseEntity<StandardResponseDto> saveOrder(@RequestBody OrderRequestDto orderRequestDto) {
        orderService.create(orderRequestDto);
        return new ResponseEntity<>(
                new StandardResponseDto(201, "Order saved", orderRequestDto),
                HttpStatus.CREATED
        );
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<StandardResponseDto> deleteOrder(@PathVariable String id) {
        orderService.delete(id);
        return new ResponseEntity<>(
                new StandardResponseDto(204, "Order deleted", null),
                HttpStatus.NO_CONTENT
        );
    }

    @GetMapping("/totalsales")
    public ResponseEntity<StandardResponseDto> getTotalSales() {
        return new ResponseEntity<StandardResponseDto>(
                new StandardResponseDto(200,"Total Sales", this.orderService.getTotalSales()),
                HttpStatus.OK
        );
    }

    @GetMapping("/top5Orders")
    public ResponseEntity<StandardResponseDto> getTop5Orders() {
        return new ResponseEntity<StandardResponseDto>(
                new StandardResponseDto(200,"Recent 5 Orders", this.orderService.findTop5Order()),
                HttpStatus.OK
        );
    }

    @GetMapping("/monthlySales")
    public ResponseEntity<StandardResponseDto> getMonthlySales() {
        return new ResponseEntity<StandardResponseDto>(
                new StandardResponseDto(200,"Monthly sales", this.orderService.findSalesByOrderDate()),
                HttpStatus.OK
        );
    }
}
