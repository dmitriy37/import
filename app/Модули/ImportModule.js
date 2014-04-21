/**
 * 
 * @author Dmitriy
 * @module
 */
function ImportModule(aPath, aSeparator, aObj4Import) {
    var self = this, model = this.model;

    /*
     * fPath - путь файла
     * fSeparator - разделитель для текстового файла
     * fObj4Import - объект с типом сопоставления для импорта
     */
    var fPath = aPath;
    var fSeparator = aSeparator;
    var fObj4Import = aObj4Import;


    /*
     * функция создает массив импорта
     * возвращает массив импорта
     */
    self.createImpArr = function() {
        var filePath = fPath;
        var separator = fSeparator;
        var mappingObj = fObj4Import;
        var importArray = [];
        var ext = filePath.substring(filePath.lastIndexOf(".") + 1);
        for (var i = 0; i < mappingObj.length; i++) {
            importArray[i] = new Array();
        }
        for (var i = 0; i < mappingObj.length; i++) {
            if (mappingObj[i].isArray == true) {
                importArray[i][mappingObj[i].mapping] = new Array();
            }
        }
        if (ext == 'xlsx') {
            var fis = new java.io.FileInputStream(filePath);
            var OPCPack = new org.apache.poi.openxml4j.opc.OPCPackage.open(fis);
            var wb = new org.apache.poi.xssf.usermodel.XSSFWorkbook(OPCPack);
            var startSheet = 0;
            /*       for (var i = 0; i < mappingObj.length; i++) {
             importArray[i] = new Array();
             }
             for (var i = 0; i < mappingObj.length; i++) {
             if (mappingObj[i].isArray == true) {
             importArray[i][mappingObj[i].mapping] = new Array();
             }
             }*/
            for (var i = startSheet; i < wb.getNumberOfSheets(); i++) {
                readSheet(wb.getSheetAt(i), i, mappingObj, importArray);
            }
            return importArray;
        }
        else if (ext == 'txt') {
            var fis = new java.io.FileInputStream(filePath);
            var scanner = new java.util.Scanner(fis);
            if (separator) {
                var string = null;
                var stringArray = [];
                while (scanner.hasNext()) {
                    string = scanner.nextLine();
                    string = string.split(separator);
                    if (string.length > 1) {
                        stringArray.push(string);
                    }
                }
            }

            for (var i = 0; i < stringArray.length; i++) {
                var string = stringArray[i];
                for (var j = 0; j < mappingObj.length; j++) {
                    if (mappingObj[j].isArray == null) {
                        importArray[j][mappingObj[j].mapping] = string[mappingObj[j].cellNumber];
                    }
                    else
                        importArray[j][mappingObj[j].mapping][i] = string[mappingObj[j].cellNumber];
                }
            }
            return importArray;
        }
    };

    /*
     * функция читает лист
     * sheet - лист
     * sheetNum - номер листа
     * mappingObj - объект с типом сопоставления
     * importArray - массив импорта
     */
    function readSheet(sheet, sheetNum, mappingObj, importArray) {
        var rows = sheet.getPhysicalNumberOfRows();
        for (var rowNum = 0; rowNum < rows; rowNum++) {
            readRow(sheet, rowNum, sheetNum, mappingObj, importArray);
        }
    }

    /*
     * функция читает строку и заполняет массив импорта
     * sheet - лист
     * rowNum - номер строки
     * sheetNum - номер листа
     * mappingObj - объект с типом сопоставления
     * importArray - массив импорта
     */
    function readRow(sheet, rowNum, sheetNum, mappingObj, importArray) {
        var curRow = sheet.getRow(rowNum);
        var cellNum = curRow.getPhysicalNumberOfCells();
        for (var i = 0; i < mappingObj.length; i++) {
            if (mappingObj[i].isArray == null) {
                var cellNumber = mappingObj[i].cellNumber;
                var value = curRow.getCell(cellNumber);
                if (value != null) {
                    importArray[i][mappingObj[i].mapping] = value;
                }
            }
            else {
                var cellNumber = mappingObj[i].cellNumber;
                var value = curRow.getCell(cellNumber);
                importArray[i][mappingObj[i].mapping][rowNum] = value;
            }
        }
    }
}

