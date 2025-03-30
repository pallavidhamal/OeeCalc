package com.jobcard.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class UserController {

	
	@GetMapping(value = {"/","/login"})
    public String login() {
        return "login";
    }
    
    @GetMapping(value = {"/index"})
    public String index() {
        return "login";
    }
    
    @GetMapping(value = {"/purchaseorder"})
    public String purchaseOrder() {
        return "PurchaseOrder";
    }
    
    @GetMapping(value = {"/addpurchaseorder"})
    public String addPurchaseOrder() {
        return "AddPurchaseOrder";
     //   return "BillingAdd";
    }
    
    
    
    @GetMapping(value = {"/usermaster"})
    public String userMaster() {
        return "UserMaster";
    }
    
    @GetMapping(value = {"/rmpurchase"})
    public String rmpurchase() {
        return "RMPurchase";
    }
    
    @GetMapping(value = {"/subcontractorforward"})
    public String subcontractorforward() {
        return "SubContractorForward";
    }
    @GetMapping(value = {"/production"})
    public String production() {
        return "Production";
    }
    
    @GetMapping(value = {"/inspection"})
    public String inspection() {
        return "Inspection";
    }
    
    @GetMapping(value = {"/dispatch"})
    public String dispatch() {
        return "Dispatch";
    }
}