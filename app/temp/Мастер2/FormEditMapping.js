/**
 * 
 * @author Dmitriy
 */
function FormEditMapping() {
    var self = this, model = this.model, form = this;

    // TODO : place your code here

    function btnCloseActionPerformed(evt) {//GEN-FIRST:event_btnCloseActionPerformed
        form.close();
    }//GEN-LAST:event_btnCloseActionPerformed

    function btnUserAddActionPerformed(evt) {//GEN-FIRST:event_btnUserAddActionPerformed
        var userText = self.textUser.text;
        var progText = self.textProg.text;
        model.editMapping.insert(model.editMapping.schema.USER_TITLE, userText,
                model.editMapping.schema.CODER_TITLE, progText);
        model.save();
        model.requery();
        self.textUser.text = '';
        self.textProg.text = '';
        
    }//GEN-LAST:event_btnUserAddActionPerformed

    function btnRequeryActionPerformed(evt) {//GEN-FIRST:event_btnRequeryActionPerformed
        model.save();
        model.requery();
    }//GEN-LAST:event_btnRequeryActionPerformed
}
