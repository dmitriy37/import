/**
 * 
 * @author Dmitriy
 */
function dopOpc() {
    var self = this, model = this.model, form = this;
    
    self.tShow = function (par) {
        model.params.Param1 = par;
    }
    

    function button2ActionPerformed(evt) {//GEN-FIRST:event_button2ActionPerformed
      form.close(model.revert());
    }//GEN-LAST:event_button2ActionPerformed

    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
        var text = self.textField.text;
   /*     model.addMoreTypeName.insert(model.addMoreTypeName.schema.NAME,text,
        model.addMoreTypeName.schema.MAPTYPE_ID,model.params.Param1);*/
        model.search.insert(model.search.schema.NAME,text,
        model.search.schema.MAPTYPE_ID,model.params.Param1);
        model.save();
        model.requery();
        self.textField.text = '';
       
    }//GEN-LAST:event_buttonActionPerformed
}
