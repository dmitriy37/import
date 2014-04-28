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
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

//    var fPath = aPath;
//    var fis = null, OPCPack = null;
//    var wb = null, sheet = null, row = null;
//    var rowNum = null, length = null;
//    var firstColumn = false, lastColumn = false;
//
//    initialize(fPath);
//    self.readRow = readRow;
//    self.getLength = getLength;
//    self.first = readRow;
//    self.next = getNext;
//    self.prev = getPrev;
//    self.last = getLast;
//    
//    self.setFirstAndLastColums = function(aFirst, aLast) {
//        firstColumn = aFirst;
//        lastColumn = aLast;
//    };
//    
///**
// * функция инициализирует файл
// * @param {type} filePath - путь к файлу
// * @returns {undefined}
// */
//    function initialize(filePath) {
//        fis = new java.io.FileInputStream(filePath);
//        OPCPack = new org.apache.poi.openxml4j.opc.OPCPackage.open(fis);
//        wb = new org.apache.poi.xssf.usermodel.XSSFWorkbook(OPCPack);
//        sheet = wb.getSheetAt(0);
//        getFirst();
//    }
//    
//    function nextSheet() {
//        
//    }
//    function prevSheet() {
//        
//    }
//
///**
// * функция читает текущую строку из файла
// * @returns {Array} - возвращает объект с данными из строки
// */
////    function readRow() {
////        try {
////            var rowData = [];
////            row = sheet.getRow(rowNum);
////            for (var j = firstColumn ? firstColumn : 0;
////                     j < lastColumn ? lastColumn : row.getLastCellNum(); j++)
////                rowData[j + 1] = row.getCell(j);
////            return  rowData;
////        } catch (e) {
////            Logger.warning("Ошибка чтения строки " + rowNum + " из файла " + aPath + "\n" + e);
////            return false;
////        }
////    }
//
///**
// * функция возвращает последнюю строку из файла
// * @returns {Array} - возвращает объект с данными из строки
// */
////    function getLast() {
////        rowNum = sheet.getPhysicalNumberOfRows() - 1;        
////    }
//
///**
// * фунция возвращает длинну файла ( кол-во занятых строк )
// * @returns {unresolved} - длинна файла
// * todo: Добавить проход по всем листам текущей книги
// */
////    function getLength() {
////        length = sheet.getPhysicalNumberOfRows();
////        return length;
////    }
//
///**
// * функция читает следующую строку файла 
// * @returns {Array} - возвращает объект с данными из строки
// */
//    function getNext() {
//        if (rowNum < getLength() - 1) {
//            rowNum++;
//            return true;
//        } else
//            return false;
//    }
//
///**
// * функция читате предыдущую строку файла 
// * @returns {Array} - возвращает объект с данными из строки
// */
//    function getPrev() {
//        if (rowNum > 0) {
//            rowNum--;
//            return true;
//        } else {
//            return false;
//        }
//    }; 
//}
