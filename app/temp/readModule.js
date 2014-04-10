/**
 * 
 * @author Dmitriy
 * @module
 */ 
function readModule() {
    var self = this, model = this.model;
    
    var apiMod = new checkAPIModule();
    
    self.make = function () {
        return apiMod;
    };
  
  }