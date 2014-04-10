/**
 * 
 * @author Dmitriy
 */
function FormInputFile() {
    var self = this, model = this.model, form = this;

    var FILE_CHOOSER = javax.swing.JFileChooser;
    var selectionMode = javax.swing.JFileChooser.FILES_AND_DIRECTORIES;
    self.selectedFile = null;
    self.filePath = null;
    self.parent = null;   
    
    
    function btnSelectActionPerformed(evt) {//GEN-FIRST:event_btnSelectActionPerformed
        self.textFilePath.text = '';
        var chooser = new FILE_CHOOSER();
        chooser.setFileSelectionMode(selectionMode);
        var result = chooser.showOpenDialog(null);        
        if (result == FILE_CHOOSER.APPROVE_OPTION) {
            self.selectedFile = chooser.getSelectedFile();
            self.filePath = self.selectedFile.path;
            self.parent.filePath = self.filePath;
            self.textFilePath.text = self.filePath;         
            
        }        
        else {
            self.filePath = null;              
            self.textFilePath.text = self.filePath;
        }
        if(self.textFilePath.text)
            self.parent.btnNext.visible = true;
        else
            self.parent.btnNext.visible = false;

    }//GEN-LAST:event_btnSelectActionPerformed

    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
        alert(self.modelCombo.value);
    }//GEN-LAST:event_buttonActionPerformed
}
