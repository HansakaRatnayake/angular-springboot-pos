package com.devstack.pos.util;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StandardResponseDto {
    private Integer status;
    private String message;
    private Object data;
}
