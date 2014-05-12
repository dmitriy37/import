/**
 * 
 * @author Dmitriy
 */
function formEditMapping() {
    var self = this, model = this.model, form = this;
    
    // TODO : place your code here

    function btnExitActionPerformed(evt) {//GEN-FIRST:event_btnExitActionPerformed
       form.close();
    }//GEN-LAST:event_btnExitActionPerformed

    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
        model.editMapping.insert(model.editMapping.schema.coder_title,self.textCoder.text,
        model.editMapping.schema.user_title,self.textUser.text);
        model.save();
        model.requery();
    }//GEN-LAST:event_buttonActionPerformed

    function button1ActionPerformed(evt) {//GEN-FIRST:event_button1ActionPerformed
        model.editMapping.deleteRow();
        model.save();
        model.requery();
    }//GEN-LAST:event_button1ActionPerformed
}
