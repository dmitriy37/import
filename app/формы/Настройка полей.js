/**
 * @name settingFields
 * @author Dmitriy
 */
function settingFields() {
    var self = this, model = this.model, form = this;

    var MappingType = new mappingType;
    var dPar = new dopOpc;
    var prr = MappingType.button2;

    self.toShow = function(readFile, cellNumber, param) {
        alert(param);
        for (var i = 0; i < cellNumber; i++) {
            model.readFromFile.insert(model.readFromFile.schema.number, readFile.number, model.readFromFile.schema.name, readFile.name);
            model.readFromFile.next();
            readFile.next();
        }
        model.readFromFile.first();
        
    };
    self.toShowVariant = function(parValue) {

        model.params.Param1 = parValue;
        model.addNewImport.beforeFirst();
        while (model.addNewImport.next()) {
            var iName = model.addNewImport.CELLNAME;
            var iNumber = model.addNewImport.CELLNUMBER;
            var mapID = model.addNewImport.MAPPINGTYPE_ID;
            model.params.Param2 = mapID;
            var moreID = model.search.MORETYPE_ID;
            model.readFromFile.insert(model.readFromFile.schema.name, iName,
                    model.readFromFile.schema.number, iNumber,
                    model.readFromFile.schema.mappingID, mapID,
                    model.readFromFile.schema.moreMappinID,moreID);

        }
    };
 
    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
        model.params.Param1 = 139377966337798;
        model.readFromFile.insert(model.readFromFile.schema.mappingID,2222334);
        model.save();
    }//GEN-LAST:event_buttonActionPerformed

    function button1ActionPerformed(evt) {//GEN-FIRST:event_button1ActionPerformed
        
    }//GEN-LAST:event_button1ActionPerformed

    function button2ActionPerformed(evt) {//GEN-FIRST:event_button2ActionPerformed
        MappingType.pr = 'hello';
        
        MappingType.showModal();
    }//GEN-LAST:event_button2ActionPerformed

    function button4ActionPerformed(evt) {//GEN-FIRST:event_button4ActionPerformed
        
        alert(prr);
    }//GEN-LAST:event_button4ActionPerformed

    function dopParOnSelect(aEditor) {//GEN-FIRST:event_dopParOnSelect
        dPar.tShow(model.params.Param2);
        dPar.showModal();
     
     
    }//GEN-LAST:event_dopParOnSelect

    function mapTypeOnRender(evt) {//GEN-FIRST:event_mapTypeOnRender
      
    }//GEN-LAST:event_mapTypeOnRender

    function modelGridMouseClicked(evt) {//GEN-FIRST:event_modelGridMouseClicked
        
    }//GEN-LAST:event_modelGridMouseClicked

    function button3ActionPerformed(evt) {//GEN-FIRST:event_button3ActionPerformed
 
    }//GEN-LAST:event_button3ActionPerformed
}
