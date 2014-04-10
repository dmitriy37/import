/**
 * 
 * @author Dmitriy
 */
function Form2() {
    var self = this, model = this.model, form = this;
    
    self.parent = null;
    self.pr = null;
   
    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
           self.parent.param = 'hhh'; 
           alert(self.pr);
    }//GEN-LAST:event_buttonActionPerformed
}
