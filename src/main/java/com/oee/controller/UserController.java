package com.oee.controller;

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
    
    @GetMapping(value = {"/addPlanning"})
    public String addPlanning() {
        return "PlanningAdd";
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
    
    @GetMapping(value = {"/planning"})
    public String planning() {
        return "Planning";
    }
    
    @GetMapping(value = {"/inspection"})
    public String inspection() {
        return "Inspection";
    }
    
    @GetMapping(value = {"/dispatch"})
    public String dispatch() {
        return "Dispatch";
    }
    
    
    @GetMapping(value = {"/Equipment"})
    public String Equipment() {
        return "Equipment";
    }
    
    @GetMapping(value = {"/EquipmentAdd"})
    public String EquipmentAdd() {
        return "EquipmentAdd";
    }
    
    @GetMapping(value = {"/Item"})
    public String Item() {
        return "Item";
    }
    
    @GetMapping(value = {"/CycleTime"})
    public String CycleTime() {
        return "CycleTime";
    }
    
    @GetMapping(value = {"/ItemAdd"})
    public String ItemAdd() {
        return "ItemAdd";
    }
    @GetMapping(value = {"/CycleTimeAdd"})
    public String CycleTimeAdd() {
        return "CycleTimeAdd";
    }
    
    @GetMapping(value = {"/Operator"})
    public String Operator() {
        return "Operator";
    }
    @GetMapping(value = {"/OperatorAdd"})
    public String OperatorAdd() {
        return "OperatorAdd";
    }
    
    
    
    
    
    
}