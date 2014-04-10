/**
 * 
 * @author Dmitriy
 */
function FormWelcome() {
    var self = this, model = this.model, form = this;

    var formInputFile = new FormInputFile();
    var formSetting = new FormSetting();
    var formExtraSetting = new FormExtraSetting();
    var formImportInfo = new FormImportInfo();
    var importModule = new ImpModule();

    formSetting.parent = self;
    formInputFile.parent = self;
    self.count = 0;
    formInputFile.showOnPanel(self.panelInputFile);
    formSetting.showOnPanel(self.panelSetting);
    formExtraSetting.showOnPanel(self.panelExtraSetting);
    formImportInfo.showOnPanel(self.panelImportInfo);
    self.panelInputFile.visible = false;
    self.panelSetting.visible = false;
    self.panelExtraSetting.visible = false;
    self.panelImportInfo.visible = false;
    self.btnBack.visible = false;
    self.btnImport.visible = false;
    self.impObject = [];
    self.filePath = null;
    formSetting.chech = null;

    function show(click) {
        switch (click) {
            case 0:
                self.btnBack.visible = false;
                self.panelWelcome.visible = true;
                self.panelInputFile.visible = false;
                self.panelSetting.visible = false;
                self.btnNext.visible = true;
                break;
            case 1:
                //    formInputFile.textFilePath.text = '';
                
                self.btnBack.visible = true;
                self.btnNext.visible = false;
                checkFilePath(formInputFile.textFilePath.text);
                self.panelWelcome.visible = false;
                self.panelInputFile.visible = true;
                self.panelSetting.visible = false;
                self.panelImportInfo.visible = false;
                self.panelExtraSetting.visible = false;
                formSetting.chech = true;
                break;
            case 2:
                //   model.readFile.deleteAll();
                self.panelWelcome.visible = false;
                self.panelInputFile.visible = false;
                self.panelSetting.visible = true;
                self.panelImportInfo.visible = false;
                self.panelExtraSetting.visible = false;
                self.btnNext.visible = true;
                self.btnImport.visible = false;
                formSetting.fPath = self.filePath;
                formSetting.toShowFile(formInputFile.filePath, formSetting.chech, formInputFile.modelCombo.value);
                break;
            case 3:
                self.panelWelcome.visible = false;
                self.panelInputFile.visible = false;
                self.panelSetting.visible = false;
                self.panelImportInfo.visible = false;
                self.panelExtraSetting.visible = true;
                self.btnNext.visible = false;
                self.btnImport.visible = true;
                formSetting.makeImpObj();
                alert(self.impObject.length);
                formSetting.chech = false;
                importModule.makeImport(self.impObject, self.filePath);

                break;
            case 4:
                self.panelWelcome.visible = false;
                self.panelInputFile.visible = false;
                self.panelSetting.visible = false;
                self.panelExtraSetting.visible = false;
                self.panelImportInfo.visible = true;
                break;
        }
    }

    function checkFilePath(text) {
        if (text)
            self.btnNext.visible = true;
        else
            self.btnNext.visible = false;
    }

    function btnNextActionPerformed(evt) {//GEN-FIRST:event_btnNextActionPerformed
        if (self.count < 4) {
            self.count++;
            show(self.count);
        }
    }//GEN-LAST:event_btnNextActionPerformed


    function btnBackActionPerformed(evt) {//GEN-FIRST:event_btnBackActionPerformed
        if (self.count > 0) {
            self.count--;
            show(self.count);
        }
    }//GEN-LAST:event_btnBackActionPerformed

    function btnCloseActionPerformed(evt) {//GEN-FIRST:event_btnCloseActionPerformed
        form.close();
    }//GEN-LAST:event_btnCloseActionPerformed

    function btnImportActionPerformed(evt) {//GEN-FIRST:event_btnImportActionPerformed
        importModule.makeImport(self.impObject, self.filePath);
    }//GEN-LAST:event_btnImportActionPerformed
}
