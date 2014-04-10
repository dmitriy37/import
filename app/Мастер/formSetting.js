/**
 * 
 * @author Dmitriy
 */
function formSetting() {
    var self = this, model = this.model, form = this;

    var ext = null;
    var separator = null;
    var stringArray = [];
    var cellArray = null;
    var fileController = null;
    var workFile = null;
    var rowLength = null;
    var count = 0;
    var checkPanel = false;
    var stringCount = 0;



    self.toShowFile = function(fPath, fSeparator, checkForm) {
        if (checkForm == true) {
            checkPanel = true;
            model.readFile.deleteAll();
            ext = fPath.substring(fPath.lastIndexOf(".") + 1);
            model.separator.scrollTo(model.separator.findById(fSeparator));
            separator = model.separator.SEPARATOR;
            alert(separator);
            fileController = new readFileController();
            workFile = fileController.read(fPath);
            workFile.readFile(fPath);
            if (ext == 'txt') {
                var string = workFile.readFirstRow(separator);
                if (string.length > 1) {
                    cellArray = string;
                    stringArray.push(string);
                }
                else
                    cellArray = null;
            }
            else {
                cellArray = workFile.readFirstRow();
                rowLength = workFile.numberOfRows();
            }
            for (var i in cellArray) {
                model.readFile.insert(model.readFile.schema.cellNum, cellArray[i].cellNum,
                        model.readFile.schema.cellTitle, cellArray[i].cellTitle);
            }
        }
        model.readFile.first();
    }

    function showScrollFile(array) {
        if (array.length > model.readFile.length) {
            model.readFile.first();
            for (var i in array) {
                if (model.readFile.length > i) {
                    model.readFile.cellTitle = array[i].cellTitle;
                    model.readFile.next();
                }
                else
                    model.readFile.insert(model.readFile.schema.cellNum, array[i].cellNum + 1, model.readFile.schema.cellTitle, array[i].cellTitle);
            }
        }
        else if (array.length == model.readFile.length) {
            model.readFile.first();
            for (var i in array) {
                model.readFile.cellTitle = array[i].cellTitle;
                model.readFile.next();
            }
        }
        else if (model.readFile.length > array.length) {
            model.readFile.first();
            for (var i = 0; i < model.readFile.length; i++) {
                if (array.length > i) {
                    model.readFile.cellTitle = array[i].cellTitle;
                    model.readFile.next();
                }
                else {
                    model.readFile.cellTitle = '';
                    model.readFile.next();
                }
            }
        }
    }
    function toShowVariant() {
        model.readFile.beforeFirst();
        while (model.readFile.next()) {
            model.readFile.mappingId = '';
        }
        model.readFile.first();

        model.addImpVariant.last();
        var lastCell = model.addImpVariant.CELLNUMBER;
        model.readFile.last();
        var first = model.readFile.cellNum + 1;
        if (model.addImpVariant.length > model.readFile.length) {
            for (var i = first; i <= lastCell; i++) {
                model.readFile.insert(model.readFile.schema.cellNum, i);
            }
            model.readFile.beforeFirst();
            model.addImpVariant.first();
            while (model.readFile.next()) {
                if (model.readFile.cellNum == model.addImpVariant.CELLNUMBER) {

                    model.readFile.mappingId = model.addImpVariant.MAPPINGCATALOG_ID;
                    model.addImpVariant.next();
                }

            }
        }
        else {
            model.readFile.beforeFirst();
            model.addImpVariant.first();
            while (model.readFile.next()) {
                if (model.readFile.cellNum == model.addImpVariant.CELLNUMBER) {

                    model.readFile.mappingId = model.addImpVariant.MAPPINGCATALOG_ID;
                    model.addImpVariant.next();

                }
            }
        }
        model.readFile.first();
    }

    self.makeImpObj = function() {
        var mas = [];
        var i = 0;
        model.readFile.beforeFirst();
        while (model.readFile.next()) {
            if (model.readFile.mappingId) {
                var mappingId = model.readFile.mappingId;
                model.editMapping.scrollTo(model.editMapping.findById(mappingId));
                var mappingTitle = model.editMapping.CODER_TITLE;
                var cellNum = model.readFile.cellNum - 1;
                var isArr = model.readFile.isArray;
                mas[i] = {mapping: mappingTitle,
                    cellNumber: cellNum,
                    isArray: isArr};
                i++;
            }
        }
        return mas;
    };


    function btnDownActionPerformed(evt) {//GEN-FIRST:event_btnDownActionPerformed
        if (ext == 'txt') {
            if (count < stringCount) {
                cellArray = stringArray[count];
                showScrollFile(cellArray);
                count++;
            }
            else {
                var string = workFile.getString(separator);
                if (string.length > 0) {
                    stringArray.push(string);
                    stringCount++;
                    cellArray = string;
                    showScrollFile(cellArray);
                }
            }
        }
        else {
            if (count < rowLength - 1) {
                count++;
                cellArray = workFile.scroll(count);
                showScrollFile(cellArray);
            }
        }
        
    }//GEN-LAST:event_btnDownActionPerformed

    function btnUpActionPerformed(evt) {//GEN-FIRST:event_btnUpActionPerformed
        if (ext == 'txt') {
            if (count > 0) {
                count--;
                cellArray = stringArray[count];
                showScrollFile(cellArray);
            }
        }
        else {
            if (count > 0) {
                count--;
                cellArray = workFile.scroll(count);
                showScrollFile(cellArray);
            }
        }
        
    }//GEN-LAST:event_btnUpActionPerformed

    function selectImportOnRender(evt) {//GEN-FIRST:event_selectImportOnRender
        if (checkPanel) {
            toShowVariant();
        }
    }//GEN-LAST:event_selectImportOnRender

    function MappingTypeOnRender(evt) {//GEN-FIRST:event_MappingTypeOnRender
        // TODO Добавьте свой код:
    }//GEN-LAST:event_MappingTypeOnRender
}

