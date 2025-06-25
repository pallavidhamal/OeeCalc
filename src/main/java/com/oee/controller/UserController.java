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
    
    @GetMapping(value = {"/addProduction"})
    public String addProduction() {
        return "AddProduction";
     //   return "BillingAdd";
    }
    
    @GetMapping(value = {"/addPlanning"})
    public String addPlanning() {
        return "PlanningAdd";
     //   return "BillingAdd";
    }
    
    @GetMapping(value = {"/editPlanning"})
    public String editPlanning() {
        return "PlanningEdit";
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
    
    
    @GetMapping(value = {"/station"})
    public String Station() {
        return "Station";
    }
    
    @GetMapping(value = {"/stationAdd"})
    public String StationAdd() {
        return "StationAdd";
    }
    
    @GetMapping(value = {"/Item"})
    public String Item() {
        return "Item";
    }
    
    @GetMapping(value = {"/SetUp"})
    public String SetUp() {
        return "SetUp";
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