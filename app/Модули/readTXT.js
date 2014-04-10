/**
 * 
 * @author Dmitriy
 * @module
 */
function readTXT() {
    var self = this, model = this.model;

    var fis = null;
    var scanner = null;

    self.readFile = function(fPath) {
        fis = new java.io.FileInputStream(fPath);
        scanner = new java.util.Scanner(fis);
    };

    self.readFirstRow = function(separator) {
        if (separator) {
            var string = null;
            var readFileArray = [];
            while (scanner.hasNext()) {
                string = scanner.nextLine();
                string = string.split(separator);
                if (string.length > 1) {
                    break;
                }
            }
            for (var i = 0; i < string.length; i++) {
                readFileArray[i] = {cellNum: i + 1, cellTitle: string[i]};
            }
            return  readFileArray;
        }
        else
            return null;
    };

    self.getString = function(separator) {
        var string = [];
        var readFileArray = [];
        while (scanner.hasNext()) {
            string = scanner.nextLine();
            string = string.split(separator);
            if (string.length > 1)
                break;
        }
        for (var i = 0; i < string.length; i++) {
            readFileArray[i] = {cellNum: i + 1, cellTitle: string[i]};
        }
        return  readFileArray;

    };
}
