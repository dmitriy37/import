/**
 * 
 * @author Dmitriy
 */
function formSetting() {
    var self = this, model = this.model, form = this;


    /* ext - расширение файла
     * sepseparator - разделитель для текстового файла
     * API - API для файла
     * workworkFile - для работы с API файла
     * checkPanel - проверка панели, если переход был сделан с предыдущей панели то true
     * self.parent - взаимодействие с formWelcome
     */

    var ext = null;
    var separator = null;
    var API = null;
    var workFile = null;
    var checkPanel = null;
    var fileCount = 0;
    var fileArray = [];

    self.parent = null;

    var fPathq = 0


    /**
     * функция для отображения содержимого файла
     * @param {type} fPath - путь файла
     * @param {type} fSeparator - разделитель для текстового файла
     * @param {type} checkForm - проверяет форму, если переход сделан с предыдущей формы то true
     * @returns {undefined}
     */
    self.toInitializeFile = function(fPath, fSeparator, checkForm) {
        fPathq = fPath;
        fileArray = fPath;
        model.separator.beforeFirst();
        model.separator.scrollTo(model.separator.findById(fSeparator));
        var fSeparator = model.separator.SEPARATOR;
        self.parent.separator = fSeparator;
        self.labelFileName.text = fileArray[0] + '     ';
        self.labelFileCount.text = fileCount + 1;
        self.labelFileLength.text = fPath.length + '  ';
        self.labelIs.text = ' из ';
        if (checkForm == true) {
            model.readFile.deleteAll();
            API = new ImportAPI(fPath, fSeparator);
            workFile = API.openFile;
            self.parent.fileAPI = fPath;
            if (workFile[0].getData.length > 0) {
                showScrollFile(workFile[0].getData);
            }
        }
    };
    /**
     * функция для скрола файла
     * @param {type} array - объект с данными из файла либо из новой строки либо из предыдущей
     * @returns {undefined}
     */
    function showScrollFile(array) {
        model.readFile.first();
        for (var i in array) {
            if (model.readFile.length > i) {
                model.readFile.cellData = array[i].cellData;
                model.readFile.next();
            } else
                model.readFile.insert(model.readFile.schema.cellNum, array[i].cellNum + 1,
                        model.readFile.schema.cellData, array[i].cellData);
        }
        if (array.length < model.readFile.length) {
            model.readFile.cellData = '';
            model.readFile.next();

        }
    }

    /**
     * функция отображения варианта сопоставления
     * @returns {undefined}
     */
    function toShowVariant() {

        model.readFile.beforeFirst();
        while (model.readFile.next()) {
            model.readFile.mappingId = '';
        }
        model.readFile.last();
        model.addImpVariant.last();
        var cellsCount = model.addImpVariant.cellnumber;
        var lastCell = model.readFile.cellNum + 1;
        model.addImpVariant.first();
        if (model.addImpVariant.length > model.readFile.length) {
            for (var i = lastCell; i <= cellsCount; i++) {
                model.readFile.insert(model.readFile.schema.cellNum, i);
            }
        }
        model.readFile.beforeFirst();
        while (model.readFile.next()) {
            if (model.readFile.cellNum == model.addImpVariant.cellnumber) {
                model.readFile.mappingId = model.addImpVariant.mappingcatalog_id;
                model.addImpVariant.next();
            }
        }
        model.addImpVariant.beforeFirst();
    }


    /**
     * функция создает объект для импорта 
     * @returns {Array} - возвращяет обхект для импорта
     */
    self.makeImpObj = function() {
        var res = [];
        var i = 0;
        model.readFile.beforeFirst();
        while (model.readFile.next()) {
            if (model.readFile.mappingId) {
                var mappingId = model.readFile.mappingId;
                res[i] = {  mapping: model.editMapping.findById(mappingId).coder_title,
                            cellNumber: model.readFile.cellNum - 1,
                            isArray: model.readFile.isArray};
                i++;
            }
        }
        return res;
    };



    function btnUpActionPerformed(evt) {//GEN-FIRST:event_btnUpActionPerformed
        /*
         * скролл вверх
         */
        var dataObject = workFile[fileCount].getPrev();
        if (dataObject) {
            showScrollFile(dataObject);
        }
    }//GEN-LAST:event_btnUpActionPerformed

    function btnDelImpVarActionPerformed(evt) {//GEN-FIRST:event_btnDelImpVarActionPerformed
        /**
         * для удаления варианта импорта
         */
        if (model.params.ImpVariant_ID) {
            var msg = confirm('Удалить вариант импорта', 'Внимание');
            if (msg) {
                model.addImpVariant.deleteAll();
                model.addImport.scrollTo(model.addImport.findById(model.params.ImpVariant_ID));
                model.addImport.deleteRow();
                model.params.ImpVariant_ID = null;
                model.save();
            }
        }
        else
            alert('Не выбран вариант импорта', 'Внимание');
    }//GEN-LAST:event_btnDelImpVarActionPerformed

    function btnSaveImpVarActionPerformed(evt) {//GEN-FIRST:event_btnSaveImpVarActionPerformed
        /**
         * для сохранения нового варианта импорта ( добавить перезапись текущего варианта )
         */
        model.readFile.beforeFirst();
        while (model.readFile.next()) {
            if (model.readFile.mappingId) {
                var chekMapping = true;
                break;
            }
            else
                chekMapping = false;
        }
        if (chekMapping) {
            var msg = prompt('Введите название варианта импорта', '', 'Внимание');
            if (msg) {
                model.addImport.beforeFirst();
                while (model.addImport.next()) {
                    if (model.addImport.TITLE == msg) {
                        var reWrire = true;
                        var idVarImp = model.addImport.IMP_IMPCATALOG_ID;
                        break;
                    }
                    else
                        reWrire = false;
                }
                if (reWrire) {
                    var idMap = idVarImp;
                    model.addImpVariant.params.ImpVariant_ID = idVarImp;
                    model.addImpVariant.deleteAll();
                }
                else {
                    model.addImport.insert(model.addImport.schema.TITLE, msg);
                    idMap = model.addImport.IMP_IMPCATALOG_ID;
                }
                model.readFile.beforeFirst();
                model.addImpVariant.last();
                while (model.readFile.next()) {
                    model.addImpVariant.insert(model.addImpVariant.schema.CELLNUMBER, model.readFile.cellNum,
                            model.addImpVariant.schema.ID_CATALOGOFIMP, idMap,
                            model.addImpVariant.schema.MAPPINGCATALOG_ID, model.readFile.mappingId);
                }
                model.save();
                model.requery();
            }
        }
        else
            alert("Выберите тип сопоставления", 'Внимание');
    }//GEN-LAST:event_btnSaveImpVarActionPerformed

    function btnDownActionPerformed(evt) {//GEN-FIRST:event_btnDownActionPerformed
        /*
         * скролл вниз
         */
        var dataObj = workFile[fileCount].getNext();
        if (dataObj) {
            showScrollFile(dataObj);
        }
    }//GEN-LAST:event_btnDownActionPerformed

    function btnRightActionPerformed(evt) {//GEN-FIRST:event_btnRightActionPerformed
        if (fileCount < workFile.length - 1) {
            fileCount++;
            workFile[fileCount].setCursor(0);
            showScrollFile(workFile[fileCount].getData);
            self.labelFileName.text = fileArray[fileCount] + '     ';
        }
    }//GEN-LAST:event_btnRightActionPerformed

    function btnLeftActionPerformed(evt) {//GEN-FIRST:event_btnLeftActionPerformed
        if (fileCount > 0) {
            fileCount--;
            workFile[fileCount].setCursor(0);
            showScrollFile(workFile[fileCount].getData);
            self.labelFileName.text = fileArray[fileCount] + '     ';
        }   
    }//GEN-LAST:event_btnLeftActionPerformed

    function MappingTypeOnRender(evt) {//GEN-FIRST:event_MappingTypeOnRender
      
    }//GEN-LAST:event_MappingTypeOnRender

    function paramsOnChanged(evt) {//GEN-FIRST:event_paramsOnChanged
        toShowVariant();
       
    }//GEN-LAST:event_paramsOnChanged
}