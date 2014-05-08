/**
 * 
 * @author Dmitriy
 * @module
 */
function readXLSX(aPath) {
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


    initialize(fPath);
    self.getData = getData();
    self.getLast = getLast;

    function initialize(filePath) {
        fis = new java.io.FileInputStream(filePath);
        OPCPack = new org.apache.poi.openxml4j.opc.OPCPackage.open(fis);
        wb = new org.apache.poi.xssf.usermodel.XSSFWorkbook(OPCPack);
    }

    function getData() {
        var readFileArray = [];
        sheet = wb.getSheetAt(0);
        row = sheet.getRow(rowCount);
        if (selectedFields) {
            for (var i in selectedFields) {
                readFileArray[i] = {cellNumber: j, cellData: row.getCell(selectedFields[i])};
            }
        }
        for (var j = 0; j < row.getLastCellNum(); j++) {
            readFileArray[j] = {cellNumber: j, cellData: row.getCell(j)};
        }
        return  readFileArray;
    }

    self.getFirst = function() {
        rowCount = 0;
        return getData();
    };

    self.getCursor = function() {
        return rowCount;
    };

    self.setCursor = function(num) {
        rowCount = num;
    };

    function getLast() {
        rowCount = sheet.getPhysicalNumberOfRows() - 1;
        return getData();
    }

    self.getLength = function() {
        var sheet = wb.getSheetAt(0);
        var rows = sheet.getPhysicalNumberOfRows();
        return rows;
    };


    self.getNext = function() {
        if (rowCount < self.getLength() - 1) {
            rowCount++;
            return getData();
        }
    };

    self.getPrev = function() {
        if (rowCount > 0) {
            rowCount--;
            return getData();
        }
    };

    self.setSelectedFields = function(aFields) {
        selectedFields = aFields;
    };
}

 