/**
 * @name mappingType
 * @author Dmitriy
 */
function mappingType() {
    var self = this, model = this.model, form = this;
       
    self.pr = null;
    self.prr = 'ddd';
    
    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
        var buf = self.textField.text;
        var buf2 = self.textField2.text;
        model.addMappingName.insert(model.addMappingName.schema.NAME,buf,model.addMappingName.schema.PROGRNAME,buf2);
        self.textField.text = '';
        self.textField2.text = '';
        model.save();
        model.requery();
    }//GEN-LAST:event_buttonActionPerformed

    function button1ActionPerformed(evt) {//GEN-FIRST:event_button1ActionPerformed
        model.addMappingName.deleteRow();
        model.save();
        model.requery();
    }//GEN-LAST:event_button1ActionPerformed

    function button3ActionPerformed(evt) {//GEN-FIRST:event_button3ActionPerformed
       var gText = self.textField1.text;
       var gText2 = self.textField3.text;
       model.addMoreTypeName.insert(model.addMoreTypeName.schema.NAME,gText, model.addMoreTypeName.schema.PROGRNAME,gText2);
       self.textField1.text = '';
       self.textField3.text = '';
       model.save();
       model.requery();
    }//GEN-LAST:event_button3ActionPerformed

    function button2ActionPerformed(evt) {//GEN-FIRST:event_button2ActionPerformed
       self.close(settingFields.prr = 'ddd');
    }//GEN-LAST:event_button2ActionPerformed

    function button4ActionPerformed(evt) {//GEN-FIRST:event_button4ActionPerformed
      model.addMoreTypeName.deleteRow();
      model.save();
      model.requery();
    }//GEN-LAST:event_button4ActionPerformed

    function button5ActionPerformed(evt) {//GEN-FIRST:event_button5ActionPerformed
        alert(self.pr);
    }//GEN-LAST:event_button5ActionPerformed
}
