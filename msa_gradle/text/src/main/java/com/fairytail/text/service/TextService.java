package com.fairytail.text.service;

import com.fairytail.text.dto.TextDetailDto;
import com.fairytail.text.dto.TextDto;

public interface TextService {

    TextDto saveText(TextDto textDto);

    TextDetailDto getTextDetail(Long postId);

}
