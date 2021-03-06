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
    var rowCount = 0;
    var selectedFields = null;





    initializeFile(fPath);


    function initializeFile(fPath) {
        fis = new java.io.FileInputStream(fPath);
        scanner = new java.util.Scanner(fis);
    }

    self.getData = function() {
        if (count < rowCount) {
            return readFileArray[count];
        }
        else {
            var separator = fSeparator;
            if (separator) {
                var string = null;
                var stringArray = [];
                while (scanner.hasNext()) {
                    string = scanner.nextLine();
                    string = string.split(separator);
                    if (string.length > 1) {
                        rowCount++;
                        count++;
                        if (string.length > 1) {
                            if (selectedFields) {
                                for (var i in selectedFields) {
                                    stringArray[i] = {cellNumber: i, cellData: string[selectedFields[i]]};
                                }
                            }
                            else {
                                for (var i = 0; i < string.length; i++) {
                                    stringArray[i] = {cellNumber: i, cellData: string[i]};
                                }
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
    };

    self.getCursor = function() {
        if (count < rowCount - 1)
            return count;
        else
            return rowCount;
    };

    self.setCursor = function(num) {
        if (count < rowCount - 1)
            count = num;
    };



    self.getNext = function() {
        if (count < rowCount - 1) {
            count++;
        }
        if (count < self.getLength()) {
            return true;
        }
        else
            return false;

    };

    self.getPrev = function() {
        if (count >= 1) {
            count--;
            return true;
        }
        else
            return false;
    };


    self.getFirst = function() {
        if (readFileArray[0])
            return readFileArray[0];
        else {
            initializeFile(fPath);
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
                        stringArray[i] = {cellNumber: i, cellData: string[i]};
                    }
                    return stringArray;
                }
            }
            else
                return null;
        }
    };

    self.getLast = function() {

    };

    self.getLength = function() {
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

    self.setSelectedFields = function(aFields) {
        selectedFields = aFields;
    };

    self.beforeFirst = function() {
        count = 0;
    };
}
