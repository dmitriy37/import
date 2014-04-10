/**
 * 
 * @author Dmitriy
 * @module
 */
function ImpModule() {
    var self = this, model = this.model;

    var impArray = [];
    
    self.parent = null;
    var impDataArray = [];
    var count = 0;

var k = 0;
    /* self.makeImport = function(fPath, fieldArray) {

        var fis = new java.io.FileInputStream(fPath);
        var OPCPack = new org.apache.poi.openxml4j.opc.OPCPackage.open(fis);
        var wb = new org.apache.poi.xssf.usermodel.XSSFWorkbook(OPCPack);
        var startSheet = 0;
        for (var i = startSheet; i < wb.getNumberOfSheets(); i++) {
            readSheet(wb.getSheetAt(i), i, fieldArray);
        }
        self.parent.arrLength = impArray;
    }

    function readSheet(sheet, sheetNum, fieldArray) {
        var rows = sheet.getPhysicalNumberOfRows();
        for (var rowNum = 0; rowNum < rows; rowNum++) {
            readRow(sheet, rowNum, sheetNum, fieldArray);
        }
    }

    function readRow(sheet, rowNum, sheetNum, fieldArray) {
        var curRow = sheet.getRow(rowNum);
        var k = 0;
        var cellNum = curRow.getPhysicalNumberOfCells();
        for(var i = 0 ; i < cellNum; i++) {
            for(var j = 0 ; j < fieldArray.length ; j++) {
                if(i == fieldArray[j].cellNumber - 1)
                {
                    var mp = fieldArray[j].property.mappind;
                    var cl = curRow.getCell(i);
                    var buffer = {value:cl, mapping:mp};
                    impArray.push(buffer);
                }
                
            }
        }     
    
    }*/
    
    self.makeImport = function (array, filePath) {
        var mas = [];
        var fis = new java.io.FileInputStream(filePath);
        var OPCPack = new org.apache.poi.openxml4j.opc.OPCPackage.open(fis);
        var wb = new org.apache.poi.xssf.usermodel.XSSFWorkbook(OPCPack);
        var startSheet = 0;
        for(var i = 0 ; i < array.length ; i++) {
            mas[i] = new Array();
        }
        for(var i = 0 ; i < array.length ; i++) {
            if(array[i].isArray == true) {
                mas[i][array[i].mapping] = new Array();
            }
        }
        
        for (var i = startSheet; i < wb.getNumberOfSheets(); i++) {
            readSheet(wb.getSheetAt(i), i, array, mas);
        }
        
     //   for(var i = 0 ; i < count ; i++) {
    //        alert(mas[0]['First'][i]);
    //    }
    };
    
    function readSheet(sheet, sheetNum, array, masBuf) {
        var rows = sheet.getPhysicalNumberOfRows();
        for (var rowNum = 0; rowNum < rows; rowNum++) {
            readRow(sheet, rowNum, sheetNum, array, masBuf);
        }
    }
    
    function readRow(sheet, rowNum, sheetNum, array, masBuf) {
        var curRow = sheet.getRow(rowNum);
        for(var i = 0 ; i < array.length ; i++) {
            if(array[i].isArray) {
                count++;
                break;
            }
        }
        
        var cellNum = curRow.getPhysicalNumberOfCells();
        for(var i = 0 ; i < array.length ; i++) {
         //   var cellNumber = array[i].cellNumber;
           // alert(curRow.getCell(cellNumber));
           if(array[i].isArray == false) {
               var cellNumber = array[i].cellNumber;
               var value = curRow.getCell(cellNumber);
               masBuf[i][array[i].mapping] = value;
           }
           else {               
               var cellNumber = array[i].cellNumber;
               var value = curRow.getCell(cellNumber);
               masBuf[i][array[i].mapping][count] = value; 
            //   count++;
           }
        }
    }
}
