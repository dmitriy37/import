/**
 * 
 * @author Dmitriy
 */
function formEditSeparator() {
    var self = this, model = this.model, form = this;
    
    // TODO : place your code here

    function btnExitActionPerformed(evt) {//GEN-FIRST:event_btnExitActionPerformed
       form.close();
    }//GEN-LAST:event_btnExitActionPerformed

    function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
        var separator = self.textSeparate.text;
        model.separator.insert(model.separator.schema.separator, separator);
        model.save();
        model.requery();
        self.textSeparate.text = '';
    }//GEN-LAST:event_btnAddActionPerformed

    function btnDellActionPerformed(evt) {//GEN-FIRST:event_btnDellActionPerformed
        model.separator.deleteRow();
    }//GEN-LAST:event_btnDellActionPerformed
}
