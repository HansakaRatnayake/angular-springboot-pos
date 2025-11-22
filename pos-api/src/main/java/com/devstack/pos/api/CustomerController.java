package com.devstack.pos.api;

import com.devstack.pos.dto.request.CustomerRequestDto;
import com.devstack.pos.service.impl.CustomerServiceImpl;
import com.devstack.pos.util.StandardResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/customers")
public class CustomerController {

    private final CustomerServiceImpl customerService;

    @GetMapping
    public ResponseEntity<StandardResponseDto> search(@RequestParam String searchText, @RequestParam int page, @RequestParam int size) {
        return new ResponseEntity<StandardResponseDto>(
                new StandardResponseDto(200, "Customer list", customerService.search(searchText,page,size)),
                HttpStatus.OK
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<StandardResponseDto> search(@PathVariable String id) {
        return new ResponseEntity<StandardResponseDto>(
                new StandardResponseDto(200, "Customer found", customerService.findById(id)),
                HttpStatus.OK
        );
    }

    @PostMapping
    public ResponseEntity<StandardResponseDto> saveCustomer(@RequestBody CustomerRequestDto customerRequestDto) {
        customerService.create(customerRequestDto);
        return new ResponseEntity<>(
                new StandardResponseDto(201, "Customer saved", customerRequestDto),
                HttpStatus.CREATED
        );
    }


    @PutMapping("/{id}")
    public ResponseEntity<StandardResponseDto> updateCustomer(@PathVariable String id, @RequestBody CustomerRequestDto customerRequestDto) {
        customerService.update(id,customerRequestDto);
        return new ResponseEntity<>(
                new StandardResponseDto(201, "Customer updated", customerRequestDto),
                HttpStatus.CREATED
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<StandardResponseDto> deleteCustomer(@PathVariable String id) {
        customerService.delete(id);
        return new ResponseEntity<>(
                new StandardResponseDto(204, "Customer deleted", null),
                HttpStatus.NO_CONTENT
        );
    }


}
