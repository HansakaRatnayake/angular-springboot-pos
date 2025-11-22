package com.devstack.pos.service.impl;

import com.devstack.pos.dto.request.CustomerRequestDto;
import com.devstack.pos.dto.response.CustomerResponseDto;
import com.devstack.pos.dto.response.paginate.CustomerPaginatedDto;
import com.devstack.pos.exception.EntryNotFoundException;
import com.devstack.pos.model.Customer;
import com.devstack.pos.repository.CustomerRepository;
import com.devstack.pos.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;


    @Override
    public CustomerPaginatedDto search(String searchText, int page, int size) {
        return CustomerPaginatedDto.builder()
                .dataList(customerRepository.search(searchText, PageRequest.of(page,size)).map(this::toCustomerResponseDto).stream().toList())
                .count(customerRepository.count())
                .build();
    }

    @Override
    public CustomerResponseDto findById(String id) {
        return toCustomerResponseDto(customerRepository.findById(id).orElseThrow(() -> new EntryNotFoundException("Customer not found")));
    }

    @Override
    public void create(CustomerRequestDto dto) {
        customerRepository.save(toCustomer(dto));
    }

    @Override
    public void update(String customerId, CustomerRequestDto dto) {
        Customer selectedCustomer = customerRepository.findById(customerId).orElseThrow(() -> new EntryNotFoundException("Customer not found"));

        selectedCustomer.setCustomerName(dto.getCustomerName());
        selectedCustomer.setCustomerAddress(dto.getCustomerAddress());
        selectedCustomer.setCustomerSalary(dto.getCustomerSalary());

        customerRepository.save(selectedCustomer);
    }

    @Override
    public void delete(String id) {
       if (customerRepository.existsById(id)) {
           customerRepository.deleteById(id);
       }else {
           throw new RuntimeException("Customer not found");
       }
    }


    private Customer toCustomer(CustomerRequestDto dto) {
        return Customer.builder()
                .customerId(UUID.randomUUID().toString())
                .customerName(dto.getCustomerName())
                .customerAddress(dto.getCustomerAddress())
                .customerSalary(dto.getCustomerSalary())
                .build();
    }

    private CustomerResponseDto toCustomerResponseDto(Customer customer) {
        return customer == null ? null : CustomerResponseDto.builder()
                .customerId(customer.getCustomerId())
                .customerName(customer.getCustomerName())
                .customerAddress(customer.getCustomerAddress())
                .customerSalary(customer.getCustomerSalary())
                .build();
    }
}
