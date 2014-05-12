/**
 * 
 * @author Dmitriy
 */
function formWelcome() {
    var self = this, model = this.model, form = this;

    /* FormInputFile - форма для выбора файла
     * FormSetting - форма для настроек импорта
     * FormExtraSetting - форма доп. настроек ( не используется )
     * FormImportInfo - форма информации о импорте
     */
    var FormInputFile = new formInputFile();
    var FormSetting = new formSetting();
    var FormImpInfo = new formImpInfo();
 


    /* self.filePath - путь файла
     * self.separator - разделитель
     */
    self.filePath = [];
    self.separator = null;
    self.checkText = null;
    self.fileAPI = null;
    
    
    self.path4Import = null;


    /* FormInputFile.parent - доступ к форме выбора файла
     * FormSetting.parent - доступ к форме настроек импорта
     * FormExtraSetting.parent - доступ к форме доп. настроек ( не используется )
     */
    FormInputFile.parent = self;
    FormSetting.parent = self;
    FormImpInfo.parent = self;


    /*
     * устанавливаем visible
     */
    self.btnBack.visible = false;

    /*
     * устанавливаем форма на панели
     */
    FormInputFile.showOnPanel(self.panelInputFile);
    FormSetting.showOnPanel(self.panelSetting);
    FormImpInfo.showOnPanel(self.panelImpInfo);


    /* count - счетчик кликов
     * panelArray - массив панелей
     * check - проверка формы ( нужна для formSetting )
     * obj4Import - объект для передачи модулю импорта
     * impModule - модуль импорта
     */
    var count = null;
    var panelArray = [self.panelWelcome, self.panelInputFile,
        self.panelSetting, self.panelImpInfo];
    var check = null;
    var obj4Import = null;
    var impModule = null;


    /*
     * функция для отображения форм 
     * click - количество кликов
     */
    function show(click) {
        if (click == 0) {
            self.btnBack.visible = false;
            self.btnNext.enabled = true;
            FormInputFile.textFilePath.text = '';
            showPanel(click, panelArray);
        }
        else if (click == 1) {
            self.btnBack.visible = true;
            self.btnNext.enabled = false;
            toCheckFilePath(FormInputFile.textFilePath.text);
            showPanel(click, panelArray);
            FormInputFile.parent = self;
            FormInputFile.separator.enabled = false;
            check = true;
        }
        else if (click == 2) {
            self.btnNext.visible = true;
            showPanel(click, panelArray);
            FormSetting.toInitializeFile(self.filePath, FormInputFile.model.params.separatorID, check);
            self.btnNext.text = 'Вперед';
            FormImpInfo.textArea.text = '';
        }
        else if (click == 3) {
            showPanel(click, panelArray);
            check = false;
            obj4Import = FormSetting.makeImpObj();
            self.btnNext.text = 'Импорт';
        }
    }
    
    function startImport() {
           impModule = new ImportModule();
           impModule.setPath(self.path4Import);
           impModule.setMappingObj(FormSetting.makeImpObj());
           impModule.setSeparator(self.separator);
           impModule.setProgressIndicatorValue(FormImpInfo.progressBar);
           var x = impModule.import();
           FormImpInfo.show(x, obj4Import);
    }


    /*
     * функция для отображения панелей
     * number - номер панели для которой visible = true
     * array - массив панелей
     */
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

    /*
     * если файл выбран то btnNext активна
     */
    function toCheckFilePath(text) {
        if (text)
            self.btnNext.enabled = true;
        else
            self.btnNext.enabled = false;
    }

    function btnNextActionPerformed(evt) {//GEN-FIRST:event_btnNextActionPerformed
        if (count < 3) {
            count++;
            show(count);
        }
        else if(self.btnNext.text == 'Импорт')
            startImport();
            
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
