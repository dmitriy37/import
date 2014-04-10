/**
 * 
 * @author Dmitriy
 */
function formWelcome() {
    var self = this, model = this.model, form = this;

// создаем формы
    var FormInputFile = new formInputFile();
    var FormSetting = new formSetting();
    var FormExtraSetting = new formExtraSetting();
    var FormImportInfo = new formImportInfo();

// собираем информацию    
    self.fileArray = null;
    self.filePath = null;
    self.impObject = null;

// определяем доступ к другим формам    
    FormInputFile.parent = self;
    FormSetting.parent = self;
    FormExtraSetting.parent = self;

// устанавливаем visible   
    self.btnBack.visible = false;

// устанавливаем форму на панель
    FormInputFile.showOnPanel(self.panelInputFile);
    FormSetting.showOnPanel(self.panelSetting);
    FormExtraSetting.showOnPanel(self.panelExtraSetting);
    FormImportInfo.showOnPanel(self.panelImportInfo);

// прочее
    var count = null; // счетчик кликов
    var panelArray = [self.panelWelcome, self.panelInputFile,
        self.panelSetting, self.panelExtraSetting, self.panelImportInfo];   // массив для панелей
    var check = null;
    var arrayForImport = null;
// функция контроля отображения кнопок и панелей
    function show(click) {
        if (click == 0) {
            self.btnBack.visible = false;
            self.btnNext.visible = true;
            showPanel(click, panelArray);
        }
        else if (click == 1) {
            self.btnBack.visible = true;
            self.btnNext.enabled = false;
            showPanel(click, panelArray);
            toCheckFilePath(FormInputFile.textFilePath.text);
            FormInputFile.parent = self;
            check = true;
        }
        else if (click == 2) {
            self.btnNext.visible = true;
            showPanel(click, panelArray);
            FormSetting.toShowFile(self.filePath, FormInputFile.model.params.separatorID, check);
        }
        else if (click == 3) {
            showPanel(click, panelArray);
            arrayForImport = FormSetting.makeImpObj();
            check = false;
        }
        else if (click == 4) {
            showPanel(click, panelArray);
        }
    }


// функция для отображения панелей
    function showPanel(number, array) {
        for (var i = 0; i < array.length; i++) {
            if (i == number) {
                array[i].visible = true;
            }
            else {
                array[i].visible = false;
            }
        }
    }

    // если путь файла указан то кнопка вперед - видна
    function toCheckFilePath(text) {
        if (text)
            self.btnNext.enabled = true;
        else
            self.btnNext.enabled = false;
    }

    function btnNextActionPerformed(evt) {//GEN-FIRST:event_btnNextActionPerformed
        if (count < 4) {
            count++;
            show(count);
        }
    }//GEN-LAST:event_btnNextActionPerformed

    function btnBackActionPerformed(evt) {//GEN-FIRST:event_btnBackActionPerformed
        if (count > 0) {
            count--;
            show(count);
        }
    }//GEN-LAST:event_btnBackActionPerformed

    function btnExitActionPerformed(evt) {//GEN-FIRST:event_btnExitActionPerformed
        form.close();
    }//GEN-LAST:event_btnExitActionPerformed
}
