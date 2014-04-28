/**
 * 
 * @author Dmitriy
 */
function formInputFile() {
    var self = this, model = this.model, form = this;

    self.parent = null;
    var checkText = false;
    
    

  
    function btnOpenActionPerformed(evt) {//GEN-FIRST:event_btnOpenActionPerformed
        var FILE_CHOOSER = javax.swing.JFileChooser;
        var selectionMode = javax.swing.JFileChooser.FILES_AND_DIRECTORIES;
        self.textFilePath.text = '';
        var chooser = new FILE_CHOOSER();
        chooser.setFileSelectionMode(selectionMode);
        var result = chooser.showOpenDialog(null);
        
        if (result == FILE_CHOOSER.APPROVE_OPTION) {
            var selectedFile = chooser.getSelectedFile();           
            if (selectedFile.isDirectory()) {
                var path = selectedFile.path;
                var files = new java.io.File(selectedFile).list();
                var getFilePath = [];
                for (var i = 0; i < files.length; i++) {
                    getFilePath[i] = path + '\\' + files[i];
                }
                self.textFilePath.text = path;
                self.parent.filePath = getFilePath;
                
                for(var i = 0 ; i < getFilePath.length - 1 ; i++) {
                    var ext = getFilePath[i].substring(getFilePath[i].lastIndexOf(".") + 1);
                    if(ext == 'txt'){
                        self.separator.editable = true;
                        checkText = true;
                        self.parent.checkText = checkText;
                    }
                    var ext2 = getFilePath[i + 1].substring(getFilePath[i + 1].lastIndexOf(".") + 1);
                    if(ext == ext2)
                        var fHaveAllExt = true;
                    else {
                        fHaveAllExt = false;
                    break;}
                }                
            }
            else {
                var getFilePath = [];
                getFilePath.push(selectedFile.path);
                self.parent.filePath = getFilePath;
                self.textFilePath.text = selectedFile.path;
            }
            if(fHaveAllExt == false) {
                alert('в директории файлы разного типа');
                self.parent.btnNext.enabled = false;
            }
            else
                self.parent.btnNext.enabled = true;
        }
        else {
            self.textFilePath.text = null;
         //   self.parent.btnNext.enabled = false;
        }
    }//GEN-LAST:event_btnOpenActionPerformed

    function separatorOnRender(evt) {//GEN-FIRST:event_separatorOnRender
       
    }//GEN-LAST:event_separatorOnRender
}
