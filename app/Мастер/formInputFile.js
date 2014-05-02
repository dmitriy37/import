/**
 * 
 * @author Dmitriy
 */
function formInputFile(check) {
    var self = this, model = this.model, form = this;

    self.parent = null;
    var checkText = false;
    var isTxt = false;
    var fHaveAllExt = false;
    var chForm = false;



  
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
                for (var i = 0; i < getFilePath.length - 1; i++) {
                    var ext = getFilePath[i].substring(getFilePath[i].lastIndexOf(".") + 1);
                    var ext2 = getFilePath[i + 1].substring(getFilePath[i + 1].lastIndexOf(".") + 1);
                    if (ext == ext2) {
                        self.parent.btnNext.enabled = true;
                        if (ext == 'txt')
                            self.separator.enabled = true;
                        else
                            self.separator.enabled = false;
                    }
                    else {
                        self.parent.btnNext.enabled = false;
                    }
                }
                self.textFilePath.text = path;
                self.parent.filePath = getFilePath;
            }
            else {
                var getFilePath = [];
                getFilePath.push(selectedFile.path);
                var ext = getFilePath[0].substring(getFilePath[0].lastIndexOf(".") + 1);
                if (getFilePath) {
                    self.parent.filePath = getFilePath;
                    fHaveAllExt = true;
                    self.parent.btnNext.enabled = true;
                    self.textFilePath.text = selectedFile.path;
                    if (ext == 'txt')
                        self.separator.enabled = true;
                    else
                        self.separator.enabled = false;
                }
                else {
                    self.parent.btnNext.enabled = false;
                    self.parent.separator.enabled = false;
                }
            }
        }
        else {
            self.parent.btnNext.enabled = false;
            self.separator.enabled = false;
        }
    }//GEN-LAST:event_btnOpenActionPerformed
}
