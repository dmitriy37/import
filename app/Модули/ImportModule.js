/**
 * 
 * @author Dmitriy
 * @module
 */
function ImportModule() {
    var self = this, model = this.model;
    var errorDescription = {
        ok          : "Все в порядке",
        noSeparator : "Не задан разделитель",
        noMapping   : "Не указан тип сопоставления полей",
        noFile      : "Не выбран файл",
        initError   : "Не удалось инициализаировать файл"
    };

    /*
     * fPath - путь файла
     * fSeparator - разделитель для текстового файла
     * fObj4Import - объект с типом сопоставления для импорта
     */    
    var initialized = false;
    var isDirectory = false;
    var readyForImport = false;
    
    var readByRow = true;
    var readFilesMultithread = false;
    var processRowsMultithread = false;
    
    var separator = '';
    var fieldsObj = null;
    var importMappingID = null;
    var path = '';
    
    self.setProgressIndicatorValue = function() {};
    self.setProgressIndicatorMaxValue = function() {
        Logger.warning('Функция отображения прогресса не инициализирована');
    };
    
    self.import = function(aParams) {
        if (aParams.path) self.setPath(aParams.path);
              /*...
                ...
                ...*/
        var importStatus = checkIfImportReady();
        if (importStatus) startImport();
        else {
            Logger.error(errorDescription[importStatus]);
            return false;
        }
    };
    
    self.setPath = function(aPath) {
        readyForImport = false;
        path = aPath;
        /*Check if directory*/
        checkIfImportReady();
    };
    
    self.setMappingId = function(aMappingId) {
        readyForImport = false;
        checkIfImportReady();
    };
    
    self.setMappingObj = function(aMappingObj) {
        readyForImport = false;
        checkIfImportReady();
    };
    
    self.setImportParams = function(aReadByRow, aReadFilesMultithread, aProcessRowsMultithread) {
        readByRow = (aReadByRow !== undefined) ? aReadByRow : readByRow;
        readFilesMultithread = (aReadFilesMultithread !== undefined) ? aReadFilesMultithread : readFilesMultithread;
        processRowsMultithread = (aProcessRowsMultithread !== undefined) ? aProcessRowsMultithread : processRowsMultithread;
    };
    
    self.isDirectory = function() {
        return isDirectory;
    };
    
    self.filesCount = function() {
        return isDirectory? filesCount/*todo*/ : 1;
    };
    
    self.setSeparator = function(aSeparator) {
        
    };
    
    function checkIfImportReady() {
        if (importReady) {
            readyForImport = true;
            return true;
        } else {
            return errCode;
        }
    }
    
    self.createImpArr = function() {
        var importArray = [];

        for (var i = 0; i < fObj4Import.length; i++) {
            importArray[i] = new Array();
            if (fObj4Import[i].isArray)
                importArray[i][fObj4Import[i].mapping] = new Array();
        }

        for (var i = 0; i < fileAPI.length; i++) {
            var data = fileAPI[i].getData();
            for (var k = 0; k < fileAPI[i].getLength(); k++) {
                for (var j = 0; j < fObj4Import.length; j++) {
                    if (fObj4Import[j].isArray == null) {
                        importArray[j][fObj4Import[j].mapping] = data[fObj4Import[j].cellNumber].celldata;
                    }
                    else {
                        var buf = data[fObj4Import[j].cellNumber].celldata;
                        importArray[j][fObj4Import[j].mapping].push(buf);
                    }
                }
                data = fileAPI[i].getNext();
            }
        }
        return importArray;
    };
    
    function startImport() {
        if (readyForImport) {
            if (isDirectory) {
                var files = new java.io.File(path).list();
                var filesCount = files.length;
                for (var i = 0; i < filesCount && !stop; i++){
                    if (readFilesMultithread) {
                        (function(){processSingleFile(path + "\/" + files[i]);}).invokeBackGround()
                    } else {
                        processSingleFile(path + "\/" + files[i]);
                    }
                }
            } else {
                if (readFilesMultithread) {
                    (function(){processSingleFile();}).invokeBackGround();
                }
                else {
                    processSingleFile();
                }
            }
        }
    }
    
    function processSingleFile(filePath) {
        try { 
            var ext = filePath.substring(filePath.lastIndexOf(".") + 1);
            var fileReader = null;
            switch (ext) {
                case 'txt': fileReader = new readTXT(filePath, separator);
                    break;
                case 'xls': fileReader = new readXLS(filePath);
                    break;
                case 'xlsx': fileReader = new readXLSX(filePath);
                    break;
            }
        } catch (e) {
            Logger.error(errorDescription.initError + ": " + filePath + "\nОшибка: " + e);
            return false;
        }
        //todo: fileReader.setUsefulField();
        readRows(fileReader);
    }
    
    function readRows(fileReader) {
        /*todo Чтение + многопоточное чтение */
        //return fileReader.getData();
        importFunction(Data);
    }
}

