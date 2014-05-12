/**
 *
 * @author Dmitriy
 * @module
 */
function readXLS(aPath) {
    var self = this, model = this.model;

    var fPath = aPath;
    var fis = null;
    var OPCPack = null;
    var wb = null;
    var count = null;
    var sheet = null;
    var row = null;
    var fileCount = 0;
    var rowCount = 0;
    var sheetCount = 0;
    var selectedFields = null;





    initializeFile(fPath);


    function initializeFile(filePath) {
        fis = new java.io.FileInputStream(filePath);
        wb = new org.apache.poi.hssf.usermodel.HSSFWorkbook(fis);
    }

    self.setCursor = function(num) {
        rowCount = num;
    };

    self.getCursor = function() {
        return rowCount;
    }

    self.getData = function() {
        var readFileArray = [];
        sheet = wb.getSheetAt(0);
        row = sheet.getRow(rowCount);
        if (selectedFields) {
            for (var i in selectedFields) {
                readFileArray[i] = {cellNumber: j, cellData: row.getCell(selectedFields[i])};
            }
        }
        else {
            for (var j = 0; j < row.getLastCellNum(); j++) {
                readFileArray[j] = {cellNumber: j, cellData: row.getCell(j)};
            }
        }
        return  readFileArray;
    };

    self.getFirst = function() {
        rowCount = 0;
        return self.getData();
    }

    function getLast() {
        rowCount = sheet.getPhysicalNumberOfRows() - 1;
        return self.getData();
    }

    self.getLength = function() {
        var sheet = wb.getSheetAt(0);
        var rows = sheet.getPhysicalNumberOfRows();
        return rows;
    };


    self.getNext = function() {
        if (rowCount < self.getLength() - 1) {
            rowCount++;
            return true;
        }
        else
            return false;
    };

    self.getPrev = function() {
        if (rowCount > 0) {
            rowCount--;
            return true;
        }
        else
            return false;
    };

    self.setSelectedFields = function(aFields) {
        selectedFields = aFields;
    };

    self.beforeFirst = function() {
        rowCount = -1;
    };

}
