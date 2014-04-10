/**
 * 
 * @author Dmitriy
 */
function Form1() {
    var self = this, model = this.model, form = this;

    var form2 = new Form2;
    form2.parent = self;
    self.param = null;

    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
        form2.pr = 'qqq';
        form2.show();
    }//GEN-LAST:event_buttonActionPerformed

    function button1ActionPerformed(evt) {//GEN-FIRST:event_button1ActionPerformed
       alert(self.param);
    }//GEN-LAST:event_button1ActionPerformed
}


