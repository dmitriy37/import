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
  
  



    initialize(fPath);
    self.getData = getData();
    //self.getLength = getLength();
  //  self.getFirst = getFirst();
  //  self.getFirst = self.getData;
    self.getLast = getLast;
    //   self.getLast = getLast();


    function initialize(filePath) {        
        fis = new java.io.FileInputStream(filePath[fileCount]);
        wb = new org.apache.poi.hssf.usermodel.HSSFWorkbook(fis);
    }
    
    function getData() {      
        var readFileArray = [];
        sheet = wb.getSheetAt(0);
        row = sheet.getRow(rowCount);
        for (var j = 0; j < row.getLastCellNum(); j++) {
            readFileArray[j] = {cellNum: j, cellData: row.getCell(j)};
        }
        return  readFileArray;
    }

    self.getFirst = function () {
        rowCount = 0;
        return getData();
    }

     function getLast() {
        rowCount = sheet.getPhysicalNumberOfRows() - 1;
        return getData();
    }

    self.getLength = function () {
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
    
        self.numOfFile = function () {
        return fileCount;
    }
    

    self.getNextFile = function() {
        rowCount = 0;
        if(fileCount == fPath.length - 1) {
            fileCount = - 1;
        }     
      if (fileCount < fPath.length - 1) {           
            fileCount++;
            initialize(fPath);
            return getData();
        }
        else
            return false;
    };


    self.getPrevFile = function() {
        rowCount = 0;
         if (fileCount > 0) {
            fileCount--;
            initialize(fPath);
            return getData();
        }
        else
            return false;
    };
    
    
    self.nullAllParam = function () {
        fileCount = 0;
        initialize(fPath);
    };
    
      self.numOfFile = function () {
        return fileCount;
    }
}
