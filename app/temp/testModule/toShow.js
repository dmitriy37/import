/**
 * 
 * @author Dmitriy
 */
function toShow() {
    var self = this, model = this.model, form = this;
    
    var FILE_CHOOSER = javax.swing.JFileChooser;
    var selectionMode = javax.swing.JFileChooser.FILES_AND_DIRECTORIES;
    self.selectedFile = null;
    self.filePath = null;
    self.parent = null;  
    var control = new readFileController();

    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
     //   self.textFilePath.text = '';
        var chooser = new FILE_CHOOSER();
        chooser.setFileSelectionMode(selectionMode);
        var result = chooser.showOpenDialog(null);        
        if (result == FILE_CHOOSER.APPROVE_OPTION) {
            self.selectedFile = chooser.getSelectedFile();
            self.filePath = self.selectedFile.path;          
        }

    }//GEN-LAST:event_buttonActionPerformed
}
