/**
 * 
 * @author Dmitriy
 */
function api() {
    var self = this, model = this.model, form = this;
    
    var apss = new readModule();


    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
        var buf = apss.make();
        var buf2 = buf.show();
        alert(buf2);
    }//GEN-LAST:event_buttonActionPerformed
}
