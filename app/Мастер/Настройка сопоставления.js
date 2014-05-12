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

    


    /**
     * функция для отображения содержимого файла
     * @param {type} fPath - путь файла
     * @param {type} fSeparator - разделитель для текстового файла
     * @param {type} checkForm - проверяет форму, если переход сделан с предыдущей формы то true
     * @returns {undefined}
     */
    self.toInitializeFile = function(fPath, fSeparator, checkForm) {
        fileArray = fPath;
        model.separator.beforeFirst();
        model.separator.scrollTo(model.separator.findById(fSeparator));
        var fSeparator = model.separator.separator;
        self.parent.separator = fSeparator;
        self.labelFileName.text = fileArray[0] + '     ';
        self.labelFileCount.text = fileCount + 1;
        self.labelFileLength.text = fPath.length + '  ';
        self.labelIs.text = ' из ';
        if (checkForm == true) {
            model.readFile.deleteAll();
            API = new ImportAPI(fPath, fSeparator);
            workFile = API.openFile();
            showScrollFile(workFile.getData());
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
                model.readFile.insert(model.readFile.schema.cellNum, array[i].cellNumber + 1,
                        model.readFile.schema.cellData, array[i].cellData);
        }
        while(array.length < model.readFile.length) {
            model.readFile.cellData = '';
            model.readFile.next();
            array.length++;
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
                model.editMapping.scrollTo(model.editMapping.findById(mappingId));
                var mappingTitle = model.editMapping.coder_title;
                var cellNum = model.readFile.cellNum - 1;
                var isArr = model.readFile.isArray;
                res[i] = {mapping: mappingTitle,
                    cellNumber: cellNum,
                    isArray: isArr};
                i++;
            }
        }
        return res;
    };



    function btnUpActionPerformed(evt) {//GEN-FIRST:event_btnUpActionPerformed
        /*
         * скролл вверх
         */
        if (workFile.getPrev()) {
            var dataObj = workFile.getData();
            showScrollFile(dataObj);
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
                    if (model.addImport.title == msg) {
                        var reWrire = true;
                        var idVarImp = model.addImport.imp_impcatalog_id;
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
                    model.addImport.insert(model.addImport.schema.title, msg);
                    idMap = model.addImport.imp_impcatalog_id;
                }

                model.readFile.beforeFirst();
                model.addImpVariant.last();
                while (model.readFile.next()) {
                    model.addImpVariant.insert(model.addImpVariant.schema.cellnumber, model.readFile.cellNum,
                            model.addImpVariant.schema.id_catalogofimp, idMap,
                            model.addImpVariant.schema.mappingcatalog_id, model.readFile.mappingId);
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
        if (workFile.getNext()) {
            var dataObj = workFile.getData();
            showScrollFile(dataObj);
        }
    }//GEN-LAST:event_btnDownActionPerformed

    function btnRightActionPerformed(evt) {//GEN-FIRST:event_btnRightActionPerformed
        if (API.nextFile()) {
            model.readFile.beforeFirst();
            workFile = API.openFile();
            showScrollFile(workFile.getData());
            fileCount++;
            self.labelFileName.text = fileArray[fileCount] + '     ';
        }
    }//GEN-LAST:event_btnRightActionPerformed

    function btnLeftActionPerformed(evt) {//GEN-FIRST:event_btnLeftActionPerformed
        if (API.getPrev()) {
            workFile = API.openFile();
            showScrollFile(workFile.getData());
            fileCount--;
            self.labelFileName.text = fileArray[fileCount] + '     ';
        }
    }//GEN-LAST:event_btnLeftActionPerformed

    function MappingTypeOnRender(evt) {//GEN-FIRST:event_MappingTypeOnRender
      
    }//GEN-LAST:event_MappingTypeOnRender

    function paramsOnChanged(evt) {//GEN-FIRST:event_paramsOnChanged
        toShowVariant();
    }//GEN-LAST:event_paramsOnChanged
}