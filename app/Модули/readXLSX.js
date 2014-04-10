/**
 * 
 * @author Dmitriy
 * @module
 */
function readXLSX(aFilePath) {
    var self = this, model = this.model;

    var fis = null;
    var OPCPack = null;
    var wb = null;

    self.readFile = function(fPath) {
        fis = new java.io.FileInputStream(fPath);
        OPCPack = new org.apache.poi.openxml4j.opc.OPCPackage.open(fis);
        wb = new org.apache.poi.xssf.usermodel.XSSFWorkbook(OPCPack);
    };

    self.readFirstRow = function() {
        var readFileArray = [];
        var sheet = wb.getSheetAt(0);
        var row = sheet.getRow(0);
        for (var j = 0; j < row.getLastCellNum(); j++) {
            readFileArray[j] = {cellNum: j + 1, cellTitle: row.getCell(j)};
        }
        return  readFileArray;
    };

    self.numberOfRows = function() {
        var sheet = wb.getSheetAt(0);
        var rows = sheet.getPhysicalNumberOfRows();
        return rows;
    };

    self.scroll = function(count) {
        var sheet = wb.getSheetAt(0);
        var row = sheet.getRow(count);
        var readFileArray = [];
        for (var i = 0; i < row.getLastCellNum(); i++) {
            readFileArray[i] = {cellNum: i + 1, cellTitle: row.getCell(i)};
        }
        return readFileArray;
    };

}
