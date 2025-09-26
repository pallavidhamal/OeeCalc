package com.oee;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.resource.ResourceUrlEncodingFilter;

@Configuration
public class WebConfig {
    @Bean
    public FilterRegistrationBean<ResourceUrlEncodingFilter> resourceUrlEncodingFilter() {
        FilterRegistrationBean<ResourceUrlEncodingFilter> filter =
                new FilterRegistrationBean<>(new ResourceUrlEncodingFilter());
        filter.setOrder(Integer.MIN_VALUE);
        return filter;
    }
}