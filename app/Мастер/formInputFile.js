/**
 * 
 * @author Dmitriy
 */
function formInputFile() {
    var self = this, model = this.model, form = this;

    self.parent = null; 
    
  
    function btnOpenActionPerformed(evt) {//GEN-FIRST:event_btnOpenActionPerformed
        var FILE_CHOOSER = javax.swing.JFileChooser;
        var selectionMode = javax.swing.JFileChooser.FILES_AND_DIRECTORIES;
        self.textFilePath.text = '';
        var chooser = new FILE_CHOOSER();
        chooser.setFileSelectionMode(selectionMode);
        var result = chooser.showOpenDialog(null);
        if (result == FILE_CHOOSER.APPROVE_OPTION) {
            var selectedFile = chooser.getSelectedFile();
            var filePath = selectedFile.path;
            self.textFilePath.text = filePath;
            self.parent.btnNext.enabled = true;
            self.parent.filePath = self.textFilePath.text;
            if (self.textFilePath.text.substring(self.textFilePath.text.lastIndexOf(".") + 1) == 'txt')
                self.separator.editable = true;
            else
                self.separator.editable = false;
        }
        else {
            self.textFilePath.text = null;
            self.parent.btnNext.enabled = false;
            model.params.separatorID = null;
            self.separator.editable = false;
        }
    }//GEN-LAST:event_btnOpenActionPerformed

    function separatorOnSelect(aEditor) {//GEN-FIRST:event_separatorOnSelect
        
    }//GEN-LAST:event_separatorOnSelect

    function separatorOnRender(evt) {//GEN-FIRST:event_separatorOnRender
       
    }//GEN-LAST:event_separatorOnRender

    function separatorComponentShown(evt) {//GEN-FIRST:event_separatorComponentShown
       
    }//GEN-LAST:event_separatorComponentShown

    function separatorComponentHidden(evt) {//GEN-FIRST:event_separatorComponentHidden
       
    }//GEN-LAST:event_separatorComponentHidden

    function separatorMouseReleased(evt) {//GEN-FIRST:event_separatorMouseReleased
     
    }//GEN-LAST:event_separatorMouseReleased

    function separatorMousePressed(evt) {//GEN-FIRST:event_separatorMousePressed
      
    }//GEN-LAST:event_separatorMousePressed

    function separatorMouseExited(evt) {//GEN-FIRST:event_separatorMouseExited
     
    }//GEN-LAST:event_separatorMouseExited

    function separatorMouseEntered(evt) {//GEN-FIRST:event_separatorMouseEntered
      
    }//GEN-LAST:event_separatorMouseEntered

    function separatorMouseClicked(evt) {//GEN-FIRST:event_separatorMouseClicked
       
    }//GEN-LAST:event_separatorMouseClicked

    function separatorFocusGained(evt) {//GEN-FIRST:event_separatorFocusGained
    
    }//GEN-LAST:event_separatorFocusGained

    function separatorFocusLost(evt) {//GEN-FIRST:event_separatorFocusLost
       
    }//GEN-LAST:event_separatorFocusLost
}
