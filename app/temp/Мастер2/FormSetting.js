/**
 * 
 * @author Dmitriy
 */
function FormSetting() {
    var self = this, model = this.model, form = this;


    var impModule = new ImpModule();
    var makeImpArr = [];

    impModule.parent = self;
    self.arrLength = null;
    self.count = 0;
    self.fPath = 0;
    self.rowsLength = 0;
    self.parent = null;
    var ident = null;
    self.check = null;



// показываем содержимое файла
    self.toShowFile = function(fPath, check, separat) {
        //   model.readFile.deleteAll();
        fPath = self.fPath;
        self.fPath = fPath;
        if (check == true) {
            model.readFile.deleteAll();
            self.fPath = fPath;
            var ext = fPath.substring(fPath.lastIndexOf(".") + 1);

            if (ext == 'xlsx') {
                var fis = new java.io.FileInputStream(fPath);
                var OPCPack = new org.apache.poi.openxml4j.opc.OPCPackage.open(fis);
                var wb = new org.apache.poi.xssf.usermodel.XSSFWorkbook(OPCPack);
                var sheet = wb.getSheetAt(0);
                var rows = sheet.getPhysicalNumberOfRows();
                self.rowsLength = rows;
                for (var i = 0; i < 1; i++) {
                    var row = sheet.getRow(i);
                    var cellNumber = row.getPhysicalNumberOfCells();
                    for (var j = 0; j < row.getLastCellNum(); j++) {
                        model.readFile.insert(model.readFile.schema.cellNum, j + 1, model.readFile.schema.cellTitle, row.getCell(j));
                    }
                }
                model.readFile.first();
            }
            /* СКРОЛ ТЕКСТОВОГО ФАЙЛА
            else if (ext == 'rtf' || ext == 'txt') {
                var c = 0;
                model.separator.scrollTo(model.separator.findById(separat));
                var separ = model.separator.SEPARATOR;
                var fis = new java.io.FileInputStream(fPath);
                var sc = new java.util.Scanner(fis);
                var fr = new java.io.FileReader(fPath);
                var bf = new java.io.BufferedReader(fr);
                while (bf.readLine()) {
                    c++;
                }
                self.rowsLength = c;

                var buf = sc.nextLine();                
                var msg = buf.split(separ);

                for (var i = 0; i < msg.length; i++) {
                    model.readFile.insert(model.readFile.schema.cellNum, i + 1, model.readFile.schema.cellTitle, msg[i]);
                }

            }
            else if (ext == 'xls') {
                var fis = new java.io.FileInputStream(fPath);
                var wb = new org.apache.poi.hssf.usermodel.HSSFWorkbook(fis);
                var sheet = wb.getSheetAt(0);
                for (var i = 0; i < 1; i++) {
                    var row = sheet.getRow(i);
                    for (var j = 0; j < row.getLastCellNum(); j++) {
                        model.readFile.insert(model.readFile.schema.cellNum, j + 1, model.readFile.schema.cellTitle, row.getCell(j));
                    }

                }

            }

            model.readFile.first();
        }*/
        }
    };

// показываем выбранный вариант импорта
    function toShowVariant() {
        /*
         model.readFile.deleteAll();
         model.addImpVariant.beforeFirst();
         while (model.addImpVariant.next()) {
         var cellNum = model.addImpVariant.CELLNUMBER;
         var mappingID = model.addImpVariant.MAPPINGCATALOG_ID;
         var extraID = model.addImpVariant.EXTRACATALOG_ID;
         var cellOrder = model.addImpVariant.CELLORDER;
         model.readFile.insert(model.readFile.schema.cellNum, cellNum,
         model.readFile.schema.mappingId, mappingID,
         model.readFile.schema.extraId, extraID,
         model.readFile.schema.cellOrder, cellOrder);
         model.readFile.next();
         }
         model.readFile.first();
         */


        /////////////////////////////////////////
        /*     model.readFile.beforeFirst();
         while (model.readFile.next()) {
         if (model.readFile.cellNum == model.addImpVariant.CELLNUMBER) {
         
         model.readFile.mappingId = model.addImpVariant.MAPPINGCATALOG_ID;
         model.addImpVariant.next();
         }
         }
         model.readFile.first();
         model.addImpVariant.first();*/
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
    }


// скрываем выбранный вариант импорта
    function deleteVatiant() {
        //     model.readFile.beforeFirst();
        //     while (model.readFile.next()) {
        //         if (model.readFile.cellNum == model.addImpVariant.CELLNUMBER) {
        //             model.readFile.mappingId = '';
        //              model.addImpVariant.next();
        //         }
        //     }
        //     model.readFile.first();
        //    model.addImpVariant.first();
        model.readFile.beforeFirst();
        while (model.readFile.next()) {
            model.readFile.mappingId = '';
        }
        model.readFile.first();
    }
    // пролистываем файл
    function scroll(count, filePath, param) {
        var ext = filePath.substring(filePath.lastIndexOf(".") + 1);
        if (ext == 'xls' || ext == 'xlsx') {
            var beforeNum = null;
            var fis = new java.io.FileInputStream(filePath);
            var OPCPack = new org.apache.poi.openxml4j.opc.OPCPackage.open(fis);
            var wb = new org.apache.poi.xssf.usermodel.XSSFWorkbook(OPCPack);
            var sheet = wb.getSheetAt(0);
            var rows = sheet.getPhysicalNumberOfRows();
            var row = sheet.getRow(count);


            //   var cellNumber = row.getPhysicalNumberOfCells(); 
            /*    for (var j = 0; j < row.getLastCellNum(); j++) {
             // model.readFile.insert(model.readFile.schema.cellNum, j + 1, model.readFile.schema.cellTitle, row.getCell(j));
             model.readFile.cellTitle = row.getCell(j);
             model.readFile.next();
             
             }*/
            if (sheet.getRow(count).getLastCellNum() > model.readFile.length) {
                model.readFile.first();
                for (var i = 0; i < model.readFile.length; i++) {
                    model.readFile.cellTitle = row.getCell(i);
                    model.readFile.next();
                }
                for (var i = model.readFile.length; i < sheet.getRow(count).getLastCellNum(); i++) {
                    model.readFile.insert(model.readFile.schema.cellNum, i + 1, model.readFile.schema.cellTitle, row.getCell(i));
                }
            }
            else if (model.readFile.length == sheet.getRow(count).getLastCellNum()) {
                model.readFile.first();
                for (var i = 0; i < sheet.getRow(count).getLastCellNum(); i++) {
                    model.readFile.cellTitle = row.getCell(i);
                    model.readFile.next();
                }
            }
            else if (model.readFile.length > sheet.getRow(count).getLastCellNum()) {
                model.readFile.first();
                for (var i = 0; i < sheet.getRow(count).getLastCellNum(); i++) {
                    model.readFile.cellTitle = row.getCell(i);
                    model.readFile.next();
                }
                for (var i = sheet.getRow(count).getLastCellNum(); i < model.readFile.length; i++) {
                    model.readFile.cellTitle = '';
                    model.readFile.next();
                }
            }
            model.readFile.first();
        }
        else if (ext == 'txt' || ext == 'rtf') {
            var fis = new java.io.FileInputStream(filePath);
            var sc = new java.util.Scanner(fis);
            var fr = new java.io.FileReader(filePath);
            var bf = new java.io.BufferedReader(fr);
            sc.hasNextInt(count);
            var msg = sc.nextLine();
            if (msg.length > model.readFile.length) {
                model.readFile.first();
                for (var i = 0; i < model.readFile.length; i++) {
                    model.readFile.cellTitle = msg[i];
                    model.readFile.next();
                }
                for (var i = model.readFile.length; i < msg.length; i++) {
                    model.readFile.insert(model.readFile.schema.cellNum, i + 1, model.readFile.schema.cellTitle, msg[i]);
                }
            }
            else if (model.readFile.length == msg.length) {
                model.readFile.first();
                for (var i = 0; i < msg.length; i++) {
                    model.readFile.cellTitle = msg[i];
                    model.readFile.next();
                }
            }
            else if (model.readFile.length > msg.length) {
                model.readFile.first();
                for (var i = 0; i < msg.length; i++) {
                    model.readFile.cellTitle = msg[i];
                    model.readFile.next();
                }
                for (var i = msg.length; i < model.readFile.length; i++) {
                    model.readFile.cellTitle = '';
                    model.readFile.next();
                }
            }
            model.readFile.first();

        }
    }


// перезаписываем вариант импорта
    function reWrite(id) {
        model.params.ImpVariant_ID = id;
        model.addImpVariant.beforeFirst();
        while (model.addImpVariant.next()) {
            model.addImpVariant.deleteAll();
        }
        model.readFile.beforeFirst();
        while (model.readFile.next()) {
            if (model.readFile.mappingId) {
                var mp = model.readFile.mappingId;
                var cl = model.readFile.cellNum;
                model.addImpVariant.insert(model.addImpVariant.schema.CELLNUMBER, cl,
                        model.addImpVariant.schema.MAPPINGCATALOG_ID, mp,
                        model.addImpVariant.schema.ID_CATALOGOFIMP, id);
            }

        }
        model.save();
        model.params.ImpVariant_ID = '';
    }

// сохраняем вариант импорта
    function saveImport(impTitle) {
        model.addImport.insert(model.addImport.schema.TITLE, impTitle);
        model.addImport.last();
        var id = model.addImport.IMP_IMPCATALOG_ID;
        model.readFile.beforeFirst();
        while (model.readFile.next()) {
            if (model.readFile.mappingId) {
                var mp = model.readFile.mappingId;
                var cl = model.readFile.cellNum;
                model.addImpVariant.insert(model.addImpVariant.schema.CELLNUMBER, cl,
                        model.addImpVariant.schema.MAPPINGCATALOG_ID, mp,
                        model.addImpVariant.schema.ID_CATALOGOFIMP, id);

            }
        }
        model.save();
        model.readFile.first();

    }
// создаем объект для отправки его в модуль импорта
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
        self.parent.impObject = mas;


    };
    
    function checkBoxActionPerformed(evt) {//GEN-FIRST:event_checkBoxActionPerformed
        if (self.checkBox.selected)
        {
            model.params.ImpVariant_ID = self.modelCombo.value;
            toShowVariant();
        }
        else
            deleteVatiant();
    }//GEN-LAST:event_checkBoxActionPerformed

    function btnDownActionPerformed(evt) {//GEN-FIRST:event_btnDownActionPerformed
        if (self.count > 0) {
            self.count--;
            scroll(self.count, self.fPath, ident);
            ident = 'up';
        }
        
    }//GEN-LAST:event_btnDownActionPerformed

    function btnUpActionPerformed(evt) {//GEN-FIRST:event_btnUpActionPerformed
        if (self.count < self.rowsLength - 1) {
            self.count++;
            scroll(self.count, self.fPath, ident);
            ident = 'down';
        }
        
    }//GEN-LAST:event_btnUpActionPerformed

    function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
        var impVar = prompt('Input import title');
        model.addImport.beforeFirst();
        while (model.addImport.next()) {
            if (impVar == model.addImport.TITLE) {
                var mappingId = model.addImport.IMP_IMPCATALOG_ID;
                break;

            }
        }

        if (mappingId)
            reWrite(mappingId);
        else
            saveImport(impVar);
    }//GEN-LAST:event_btnSaveActionPerformed

    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
        alert(model.readFile.isArray);
    }//GEN-LAST:event_buttonActionPerformed

    function modelComboOnRender(evt) {//GEN-FIRST:event_modelComboOnRender
        alert('+');
    }//GEN-LAST:event_modelComboOnRender
}
