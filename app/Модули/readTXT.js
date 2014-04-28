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
    var count = 2;
    var fileCount = 0;
    var fileNum = 0;  
    
    
    
    initialize(fPath);
    self.getData = getData();
    
        function initialize(fPath) {
        fis = new java.io.FileInputStream(fPath[fileNum]);
        scanner = new java.util.Scanner(fis);
    }
    
    function getData() {
     //   initialize(fPath);
        var separator = fSeparator;
        if (separator) {
            var string = null;
            var stringArray = [];
            if (scanner.hasNext()) {
                string = scanner.nextLine();
                string = string.split(separator);
                if (string.length > 1) {
                    fileCount++;
                }         
                if (string.length > 1) {
                    for (var i = 0; i < string.length; i++) {
                        stringArray[i] = {cellNum: i, cellData: string[i]};
                    }
                    readFileArray.push(stringArray);
                    return stringArray;
                }
            } else
                return null;
        }
        else
            return null;
    }
    
       self.getNextFile = function () {
        fileCount = 0;
        readFileArray.length = 0;
        if (fileNum < fPath.length - 1) {
            fileNum++;   
            initialize(fPath);
            return getData();
        }
        else 
            return null;
    };
    
        self.getPrevFile = function () {
        fileCount = 0;
        readFileArray.length = 0;
        if(fileNum > 0) {
            fileNum--;
            initialize(fPath);
            return getData();
        }
        else
            return null;
    };
    
    self.getNext = function () {      
        if (count < fileCount - 1) {            
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
       // var fis = new java.io.FileInputStream(fPath[fileNum]);
       // var scanner = new java.util.Scanner(fis);
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
        fileCount = 0;
    };
    
    self.getLast = function () {
        
    };
    
    self.numOfFile = function () {
        return fileNum;
    };
    
    self.getLength = function () {
        var fileLength = 0;
        var fis = new java.io.FileInputStream(fPath[fileNum]);
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
