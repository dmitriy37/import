/**
 *
 * @author Dmitriy
 * @module
 */
function readXLS(aParent, aPath) {
  var self = this, model = this.model;

    var fPath = aPath;
    var fis = null;
    var OPCPack = null;
    var wb = null;
    var count = null;
    var sheet = null;
    var row = null;



    self.initialize = initialize(fPath);
    self.getData = getData();
    self.getLength = getLength();
 //   self.getFirst = getFirst();
    self.getFirst = self.getData;
    self.getLast = getLast();

    /*    self.getData = {};
     self.getFirst = {};
     self.getLast = {};
     self.getLength = {};
     self.setPosition = {};
     self.getPosition = {};
     */
    function initialize(filePath) {
        fis = new java.io.FileInputStream(filePath);
        OPCPack = new org.apache.poi.openxml4j.opc.OPCPackage.open(fis);
        wb = new org.apache.poi.xssf.usermodel.XSSFWorkbook(OPCPack);
    }

    function getData() {
        var readFileArray = [];
        sheet = wb.getSheetAt(0);
        row = sheet.getRow(0);
        for (var j = 0; j < row.getLastCellNum(); j++) {
            readFileArray[j] = {cellNum: j + 1, cellData: row.getCell(j)};
        }
        return  readFileArray;
    }

/*    function getFirst() {
        var readFileArray = [];
        var sheet = wb.getSheetAt(0);
        var row = sheet.getRow(0);
        for (var j = 0; j < row.getLastCellNum(); j++) {
            readFileArray[j] = {cellNum: j + 1, cellData: row.getCell(j)};
        }
        return  readFileArray;
    }*/

    function getLast() {
        var readFileArray = [];
       // var sheet = wb.getSheetAt(0);
        var rows = sheet.getPhysicalNumberOfRows();        
        var row = sheet.getRow(rows - 1);        
        for (var j = 0; j < row.getLastCellNum(); j++) {
            readFileArray[j] = {cellNum: j + 1, cellData: row.getCell(j)};
        }
        return  readFileArray;
    }

    function getLength() {
        var sheet = wb.getSheetAt(0);
        var rows = sheet.getPhysicalNumberOfRows();
        return rows;
    }

    self.getNext = function() {
        if (count < getLength() - 1) {
            count++;
         //   var sheet = wb.getSheetAt(0);
            var row = sheet.getRow(count);
            var readFileArray = [];
            for (var i = 0; i < row.getLastCellNum(); i++) {
                readFileArray[i] = {cellNum: i + 1, cellData: row.getCell(i)};
            }
            return readFileArray;
        }
    };

    self.getPrev = function() {
        if (count > 0) {
            count--;
          //  var sheet = wb.getSheetAt(0);
            var row = sheet.getRow(count);
            var readFileArray = [];
            for (var i = 0; i < row.getLastCellNum(); i++) {
                readFileArray[i] = {cellNum: i + 1, cellData: row.getCell(i)};
            }
            return readFileArray;
        }
    }; 
}
