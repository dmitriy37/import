/**
 * 
 * @author Dmitriy
 * @module
 */
function readTXT(aFilePath) {
    var self = this, model = this.model;

    var fis = null;
    var scanner = null;
    var separator = null;
    var readedData = [];
    
    if (aFilePath) initialize(aFilePath);
    
    
    self.initialize = initialize;
    self.status = getStatus;
    self.isSeparated = true;
    self.getSeparator = noNeedLog;
    self.setSeparator = noNeedLog;    
    self.first = {};
    self.beforeFirst = {};
    self.next = {};
    self.prev = {};
    self.getData = {};
    self.getPosition = {};
    self.setPosition = {};
    self.getLength = {};
    
    function initialize(fPath) {
        try {
            fis = new java.io.FileInputStream(fPath);
            scanner = new java.util.Scanner(fis);
        } catch (e) {
            Logger.warning('Не удалось открыть файл: ' + fPath + '. Ошибка: ' + e
                    + '\nМодуль readTXT');
        }
    };

    function getStatus() {
        return !!scanner&&!!separator;
    };
    
    function noNeedLog(){
        Logger.info('Для модуля не нужно задавать разделитель');
        return false;
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

    self.getString = function() {
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
