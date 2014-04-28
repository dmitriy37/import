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
        var fSeparator = model.separator.SEPARATOR;
        self.labelFileName.text = fileArray[0] + '     ';
        self.labelSpace.text = '   ';
        self.labelSpace2.text = '   ';
        self.labelFileCount.text = fileCount + 1;
        self.labelSpace3.text = '   ';
        self.labelFileLength.text = fPath.length + '  ';
        self.labelIs.text = ' из ';
        if (checkForm == true) {
            model.readFile.deleteAll();
            API = new ImportAPI(fPath, fSeparator);
            workFile = API.openFile;
         //   self.parent.fileAPI = API;
            self.parent.fileAPI = workFile;
            var data = workFile.getData;
            if(data.length > 0){
                showScrollFile(data);
            }
        }


        /*
         model.params.ImpVariant_ID = null;
         model.readFile.deleteAll();
         ext = fPath.substring(fPath.lastIndexOf(".") + 1);
         model.separator.scrollTo(model.separator.findById(fSeparator));
         separator = model.separator.SEPARATOR;
         self.parent.separator = separator;          
         API = new ImportAPI(fPath, separator);
         workFile = API.openFile;
         workFile.initializeFile;
         var data = workFile.getData;
         for (var i in data) {
         model.readFile.insert(model.readFile.schema.cellNum, data[i].cellNum,
         model.readFile.schema.cellData, data[i].cellData);
         }
         model.readFile.first();
         }
         model.separator.beforeFirst(); */
    };

    function toShowFile(data) {
        for (var i in data) {
            model.readFile.insert(model.readFile.schema.cellNum, data[i].cellNum,
                    model.readFile.schema.cellData, data[i].cellData);

        }
    }

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
            //to do Очистить все что дальше есть
        }
//        else if (model.readFile.length > array.length) {
//            model.readFile.first();
//            for (var i = 0; i < model.readFile.length; i++) {
//                if (array.length > i) {
//                    model.readFile.cellData = array[i].cellData;
//                    model.readFile.next();
//                }
//                else {
//                    model.readFile.cellData = '';
//                    model.readFile.next();
//                }
//            }
//        }
    }

    /**
     * функция отображения варианта сопоставления
     * @returns {undefined}
     */
    function showVariant() {
        model.readFile.beforeFirst();
        while (model.readFile.next()) {
            model.readFile.mappingId = '';
        }
        model.addImpVariant.last();
        var cellsCount = model.addImpVariant.CELLNUMBER;
        var lastCell = model.readFile.cellNum + 1;
        if (model.addImpVariant.length > model.readFile.length) {
            for (var i = lastCell; i <= cellsCount; i++) {
                model.readFile.insert(model.readFile.schema.cellNum, i);
            }
        }
        model.readFile.beforeFirst();
        model.addImpVariant.first();
        while (model.readFile.next()) {
            var impVariantCell = model.addImpVariant.find(model.addImpVariant.schema.cellnumber,
                                                          model.readFile.cellNum);
            if (impVariantCell.length > 0) {
                model.readFile.mappingId = impVariantCell[0].mappingcatalog_id;
            }
        }
        model.readFile.first();
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
                var mapping = model.editMapping.findById(mappingId);
                
                var mappingTitle = mapping.CODER_TITLE;
                var cellNum = model.readFile.cellNum - 1;
                var isArr = model.readFile.isArray;
                res[i] = {  mapping: mappingTitle,
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
        var dataObject = workFile.getPrev();
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
            var msg = prompt('Введите название варианта импорта', '', 'Внимание');
            if (!!msg) model.addImport.insert(model.addImport.schema.TITLE, msg);
            model.readFile.beforeFirst();
            while (model.readFile.next()) {
                if (model.readFile.mappingId) {
                    var mapping = model.readFile.mappingId;
                    model.addImpVariant.insert(model.addImpVariant.schema.CELLNUMBER, model.readFile.cellNum,
                            model.addImpVariant.schema.MAPPINGCATALOG_ID, mapping,
                            model.addImpVariant.schema.ID_CATALOGOFIMP, model.addImport.IMP_IMPCATALOG_ID);
                }
            }
            model.save();
    }//GEN-LAST:event_btnSaveImpVarActionPerformed

    function btnDownActionPerformed(evt) {//GEN-FIRST:event_btnDownActionPerformed
        /*
         * скролл вниз
         */
        var dataObject = workFile.getNext();
        if (dataObject) {
            showScrollFile(dataObject);
        }
    }//GEN-LAST:event_btnDownActionPerformed

    function btnRightActionPerformed(evt) {//GEN-FIRST:event_btnRightActionPerformed
        if(fileCount < fileArray.length - 1) {
            fileCount++;        
        showScrollFile(workFile.getNextFile()); 
        self.labelFileName.text = fileArray[workFile.numOfFile()] + '     ';
        self.labelFileCount.text = fileCount + 1;
    }
    }//GEN-LAST:event_btnRightActionPerformed

    function btnLeftActionPerformed(evt) {//GEN-FIRST:event_btnLeftActionPerformed
        if (fileCount > 0) {
            fileCount--;
            showScrollFile(workFile.getPrevFile());         
            self.labelFileName.text = fileArray[workFile.numOfFile()] + '     ';
            self.labelFileCount.text = fileCount + 1;
        }
    }//GEN-LAST:event_btnLeftActionPerformed

    function MappingTypeOnRender(evt) {//GEN-FIRST:event_MappingTypeOnRender
      
    }//GEN-LAST:event_MappingTypeOnRender

    function paramsOnChanged(evt) {//GEN-FIRST:event_paramsOnChanged
        showVariant();
    }//GEN-LAST:event_paramsOnChanged
}