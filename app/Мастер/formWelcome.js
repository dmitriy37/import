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
    var FormExtraSetting = new formExtraSetting();
    var FormImportInfo = new formImportInfo();


    /* self.filePath - путь файла
     * self.separator - разделитель
     */
    self.filePath = [];
    self.separator = null;
    self.checkText = null;
    self.fileAPI = null;


    /* FormInputFile.parent - доступ к форме выбора файла
     * FormSetting.parent - доступ к форме настроек импорта
     * FormExtraSetting.parent - доступ к форме доп. настроек ( не используется )
     */
    FormInputFile.parent = self;
    FormSetting.parent = self;
    FormExtraSetting.parent = self;


    /*
     * устанавливаем visible
     */
    self.btnBack.visible = false;

    /*
     * устанавливаем форма на панели
     */
    FormInputFile.showOnPanel(self.panelInputFile);
    FormSetting.showOnPanel(self.panelSetting);
    FormExtraSetting.showOnPanel(self.panelExtraSetting);
    FormImportInfo.showOnPanel(self.panelImportInfo);

    /* count - счетчик кликов
     * panelArray - массив панелей
     * check - проверка формы ( нужна для formSetting )
     * obj4Import - объект для передачи модулю импорта
     * impModule - модуль импорта
     */
    var count = null;
    var panelArray = [self.panelWelcome, self.panelInputFile,
        self.panelSetting, self.panelExtraSetting, self.panelImportInfo];
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
         //   form.resizable = false;
            self.btnBack.visible = true;
            self.btnNext.enabled = false;
            toCheckFilePath(FormInputFile.textFilePath.text);
            showPanel(click, panelArray);
            FormInputFile.parent = self;
            FormInputFile.separator.enabled = false;
            //    self.btnNext.enabled = true;
            check = true;
        }
        else if (click == 2) {
          //  form.resizable = true;
            self.btnNext.visible = true;
            showPanel(click, panelArray);
            FormSetting.toInitializeFile(self.filePath, FormInputFile.model.params.separatorID, check);
        }
        else if (click == 3) {
            showPanel(click, panelArray);
            check = false;
            obj4Import = FormSetting.makeImpObj();
            impModule = new ImportModule(self.filePath, self.separator, obj4Import, self.fileAPI);
            var obj = impModule.createImpArr();
            FormExtraSetting.impInfo(obj, obj4Import);
        }
        else if (click == 4) {
            showPanel(click, panelArray);
        }
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
