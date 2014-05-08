/**
 * 
 * @author Dmitriy
 * @module
 */
function ImportModule() {
    var self = this, model = this.model;

    var errorDescription = {
        ok: "Все в порядке",
        noSeparator: "Не задан разделитель",
        noMapping: "Не указан тип сопоставления полей",
        noFile: "Не выбран файл",
        initError: "Не удалось инициализаировать файл",
        noProgress: "Функция отображения прогресса не инициализирована",
        noMappingObj: "Не задан объект типов сопоставления для импорта"
    };

    var checkImpParams = {
        path: false,
        separator: false,
        mapping: false
    };
    
    
    var initialized = false;
    var isDirectory = false;
    var readyForImport = false;
    var allFilesSame = false;
    
    var readByRow = true;
    var readFilesMultithread = false;
    var processRowsMultithread = false;
    var progress = false;

    var separator = '';
    var fieldsObj = null;
    var mappingId = null;
    var path = '';
    var fileCount = null;

    self.setProgressIndicatorValue = function() {};
    self.setProgressIndicatorMaxValue = function() {
        Logger.warning('Функция отображения прогресса не инициализирована');
    };

    self.setPath = function(aPath) {
        if (aPath) {
            try {
                checkImpParams.path = true;
                if (aPath.isDirectory()) {
                    path = aPath;
                    isDirectory = true;
                    checkSameFiles(aPath);
                }
                else {
                    path = aPath;
                    isDirectory = false;
                }
            } catch (e) {
                Logger.warning(errorDescription.noFile + '  ' + e);
                alert('Не выбран файл');
                checkImpParams.path = false;
                alert(aPath);
            }
        } else {
            checkImpParams.path = false;
        }
    };
    
    self.setSeparator = function (aSeparator) {
        separator = aSeparator;
        checkImpParams.separator = true;
    };

    self.setMappingId = function(aMappingId) {
        try {
            mappingId = aMappingId;
            checkImpParams.mapping = true;
        }
        catch (e) {
            Logger.error(errorDescription.noMapping + '  ' + e);
            alert('Не выбран вариант сопоставления');
        }
    };

    self.setMappingObj = function(aMappingObj) {
        try {
            fieldsObj = aMappingObj;
            checkImpParams.mapping = true;
        }
        catch (e) {
            Logger.error(errorDescription.noMappingObj + '  ' + e);
            alert('Не задан объект типов сопоставления для импорта');
        }
    };

    self.setImportParams = function(aReadByRow, aReadFilesMultithread, aProcessRowsMultithread) {
        readByRow = (aReadByRow !== undefined) ? aReadByRow : readByRow;
        readFilesMultithread = (aReadFilesMultithread !== undefined) ? aReadFilesMultithread : readFilesMultithread;
        processRowsMultithread = (aProcessRowsMultithread !== undefined) ? aProcessRowsMultithread : processRowsMultithread;
    };

    function checkSameFiles(aPath) {
        var getFilePath = [];
        if (aPath.isDirectory()) {
            var path = aPath.path;
            var files = new java.io.File(aPath).list();
            fileCount = files.length;
            for (var i = 0; i < files.length; i++) {
                getFilePath[i] = path + '\\' + files[i];
            }
            for (var i = 0; i < getFilePath.length - 1; i++) {
                var ext = getFilePath[i].substring(getFilePath[i].lastIndexOf(".") + 1);
                var ext2 = getFilePath[i + 1].substring(getFilePath[i + 1].lastIndexOf(".") + 1);
                if (ext == ext2) {
                    allFilesSame = true;
                    if (ext == 'xls' || ext == 'xlsx')
                        checkImpParams.separator = true;
                }
                else {
                    allFilesSame = false;
                    break;
                }
            }
        }
        else {
            allFilesSame = true;
            fileCount = 1;
        }
    }

    self.import = function(aImportParams) {
        for (var i in checkImpParams) {
            if (checkImpParams[i] != true) {
                readyForImport = false;
                break;
            }
            else
                readyForImport = true;
        }

        if (readyForImport)
            startImport();
    };

    function startImport() {
        if (isDirectory) {
            var files = new java.io.File(path).list();
            var filesCount = files.length;
            for (var i = 0; i < fileCount; i++) {
                if (readFilesMultithread) {
                    (function() {
                        processSingleFile(path + "\\" + files[i]);
                    }).invokeBackGround();
                }
                else {
                    processSingleFile(path + "\\" + files[i]);
                }
            }
        }
        else {
            if (readFilesMultithread) {
                (function() {
                    processSingleFile(path);
                }).invokeBackGround();
            }
            else {
                processSingleFile(path);
            }
        }
    }

    function processSingleFile(aFilePath) {
        var cellsForRead = [];
        var ext = aFilePath.substring(aFilePath.lastIndexOf(".") + 1);
        var fileReader = null;
        switch (ext) {
            case 'txt':
                fileReader = new readTXT(aFilePath, separator);
                break;
            case 'xls':
                fileReader = new readXLS(aFilePath);
                break;
            case 'xlsx':
                fileReader = new readXLSX(aFilePath);
                break;
        }
        for (var i in fieldsObj) {
            cellsForRead[fieldsObj[i].cellNumber] = true;
        }
        fileReader.setSelectedFields(cellsForRead);
        readRows(fileReader);
    }

    function readRows(aFileReader) {
       /* for (var i = 0; i < aFileReader.getLength(); i++) {
            importFunction(data);
            data = aFileReader.getNext();
        }*/
        var rowData = null; 
        var allData = [];
        aFileReader.beforeFirst();
        while (aFileReader.getNext()) {
            rowData = mapData(aFileReader.getData());
            if (readByRow) {
                if (processRowsMultithread) {
                    (function(){importFunction(rowData);}).invokeBackground();
                } else {
                    importFunction(rowData);
                }
            } else {
                allData.push(rowData);
            }
        }
        if (!processRowsMultithread) {
            importFunction(allData);
        }
    }

    function mapData(aDataRow) {
        var impMas = [];
        for(var j in fieldsObj) {
            impMas[j] = new Array();
        }
        for(var i = 0 ; i < aDataRow.length ; i++) {
            impMas[i][fieldsObj[i].mapping] = aDataRow[i].cellData;
          //  alert(impMas[i][fieldsObj[i].mapping]);
        }
    }
}
;


