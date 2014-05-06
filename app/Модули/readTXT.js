/**
 * 
 * @author Dmitriy
 * @module
 */
function readTXT(aPath, aSeparator) {
    var self = this, model = this.model;

    var fPath = aPath;
    var fSeparator = aSeparator;
    var readFileArray = [];
    var fis = null;
    var scanner = null;
    var count = 0;
    var rowsCount = 0;
    
    
    
    initialize(fPath);
    self.getData = getData();
    
    function initialize(fPath) {
        fis = new java.io.FileInputStream(fPath);
        scanner = new java.util.Scanner(fis);
    }

    function getData() {
        var separator = fSeparator;
        if (separator) {
            var string = null;
            var stringArray = [];
            while (scanner.hasNext()) {
                string = scanner.nextLine();
                string = string.split(separator);
                if (string.length > 1) {
                    rowsCount++;
                    count++;
                    if (string.length > 1) {
                        for (var i = 0; i < string.length; i++) {
                            /*to do Читать только нужные ячейки, если задан их список*/
                            stringArray[i] = {cellNum: i, cellData: string[i]};
                        }
                        readFileArray.push(stringArray);
                        return stringArray;
                    }
                    break;
                }
            }
        }
        else
            return null;
    }
    
    self.getCursor = function () {
        if(count < rowsCount - 1)
            return count;
        else
            return rowsCount;
    };
    
    self.setCursor = function (num) {
        if(count < rowsCount - 1)
            count = num;
    };
    
    
    
    self.getNext = function () {
        if(readFileArray.length == 10) {
            readFileArray.shift();
            rowsCount--;
        }
        if (count < rowsCount - 1) {            
            count++;
            return readFileArray[count];            
        }
        else return getData();
        
    };
    
        self.getPrev = function() {
        if (count >= 1) {
            count--;
            
            return readFileArray[count];
        }
    };
    

    self.getFirst = function () {
        if(readFileArray[0])
            return readFileArray[0];
        else {
            initialize(fPath);
            var separator = fSeparator;
        if (separator) {
            var string = null;
            var stringArray = [];
            while (scanner.hasNext()) {
                string = scanner.nextLine();
                string = string.split(separator);
                if (string.length > 1) {                 
                    break;
                }         
            }
            if (string.length > 1) {
                for (var i = 0; i < string.length; i++) {
                    stringArray[i] = {cellNum: i, cellData: string[i]};
                }              
                return stringArray;
            }
        }
        else
            return null;
    }       
    };
    
    self.nullAllParam = function () {
        readFileArray.length = 0;
        fileNum = 0;
        rowsCount = 0;
    };
    
    self.getLast = function () {
        
    };
    
    self.getLength = function () {
        var fileLength = 0;
        var fis = new java.io.FileInputStream(fPath);
        var scanner = new java.util.Scanner(fis);
        var separator = fSeparator;
        if (separator) {
            var string = null;
            var stringArray = [];
            while (scanner.hasNext()) {
                string = scanner.nextLine();
                string = string.split(separator);
                if (string.length > 1) {
                    fileLength++;
                }         
            }
            return fileLength;
         
        }
        else
            return null;        
    };
    
}
