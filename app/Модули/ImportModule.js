/**
 * 
 * @author Dmitriy
 * @module
 */
function ImportModule() {
    var self = this, model = this.model;


    var errorDescription = {
        noFile: "Не выбран файл",
        noSeparator: "Не задан разделитель",
        noMapping: "Не указан тип сопоставления полей",
        noMappingObj: "Не задан объект типов сопоставления для импорта",
        noFileSame: "Выбранны файлы с разным расширением"
    };

    var checkImpParams = {
        path: false,
        separator: false,
        mappingId: false,
        mappingObj: false,
        allFilesSame: false
    };

    var isDirectory = false;
    var readyForImport = false;
    var allFilesSame = false;

    var readRowByRow = false;
    var readFilesMultithread = false;
    var processRowsMultithread = false;

    var separator = '';
    var fieldsObj = null;
    var mappingId = null;
    var path = '';
    var fileCount = null;
    var allData = [];
    var processIndicator = null;


//    var CELL_TYPE_NUMERIC = new org.apache.poi.xssf.usermodel.XSSFCell.CELL_TYPE_NUMERIC;
//    var CELL_TYPE_BLANK = new org.apache.poi.xssf.usermodel.XSSFCell.CELL_TYPE_BLANK;
//    var CELL_TYPE_STRING = new org.apache.poi.xssf.usermodel.XSSFCell.CELL_TYPE_STRING;
//    var CELL_TYPE_FORMULA = new org.apache.poi.xssf.usermodel.XSSFCell.CELL_TYPE_FORMULA;
//    var CELL_TYPE_BOOLEAN = new org.apache.poi.xssf.usermodel.XSSFCell.CELL_TYPE_BOOLEAN;
//    var CELL_TYPE_ERROR = new org.apache.poi.xssf.usermodel.XSSFCell.CELL_TYPE_ERROR;




    self.setProgressIndicatorValue = function(aIndicator) {
        processIndicator = aIndicator;
    };
    self.setProgressIndicatorMaxValue = function() {
        Logger.warning('Функция отображения прогресса не инициализирована');
    };


    self.setPath = function(aPath) {
        if (aPath) {
            if (aPath.isDirectory()) {
                path = aPath;
                isDirectory = true;
                checkImpParams.path = true;
            }
            else {
                path = aPath.path;
                isDirectory = false;
                checkImpParams.path = true;
            }
        }
        else {
            checkImpParams.path = false;
            alert(errorDescription.noFile);
        }
    };

    self.setSeparator = function(aSeparator) {
        if (aSeparator) {
            separator = aSeparator;
            checkImpParams.separator = true;
        }
        else {
            checkImpParams.separator = false;
        }
    };

    self.setMappingId = function(aMappingId) {
        if (aMappingId) {
            mappingId = aMappingId;
            checkImpParams.mappingId = true;
        }
        else {
            checkImpParams.mappingId = false;
        }
    };

    self.setMappingObj = function(aMappingObj) {
        if (aMappingObj) {
            fieldsObj = aMappingObj;
            checkImpParams.mappingId = true;
            checkImpParams.mappingObj = true;
        }
        else {
            checkImpParams.mappingObj = false;
        }
    };

    self.setImportParams = function(aReadByRow, aReadFilesMultithread, aProcessRowsMultithread) {
        readRowByRow = (aReadByRow !== undefined) ? aReadByRow : readRowByRow;
        readFilesMultithread = (aReadFilesMultithread !== undefined) ? aReadFilesMultithread : readFilesMultithread;
        processRowsMultithread = (aProcessRowsMultithread !== undefined) ? aProcessRowsMultithread : processRowsMultithread;
    };


    self.import = function(aParams) {
        if (aParams) {
            self.setPath(aParams.path);
            self.setSeparator(aParams.separator);
            self.setMappingId(aParams.mappingId);
            self.setMappingObj(aParams.mappingObj);
        }


        checkSameFiles(path);
        checkCorrect();

        if (readyForImport) {
            startImport();
            return allData;
        }
    };

    function checkCorrect() {
        if (!checkImpParams.allFilesSame) {
            alert(errorDescription.noFileSame);
            readyForImport = false;
        }
        else if (!checkImpParams.mappingId) {
            alert(errorDescription.noMapping);
            readyForImport = false;
        }
        else if (!checkImpParams.mappingObj) {
            alert(errorDescription.noMappingObj);
            readyForImport = false;
        }
        else if (!checkImpParams.path) {
            alert(errorDescription.noFile);
            readyForImport = false;
        }
        else if (!checkImpParams.separator) {
            alert(errorDescription.noSeparator);
            readyForImport = false;
        }
        else {
            readyForImport = true;
        }
    }

    function checkSameFiles(aPath) {
        var getFilePath = [];
        if (isDirectory) {
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
                        checkImpParams.allFilesSame = true;
                        if (ext == 'xls' || ext == 'xlsx')
                            checkImpParams.separator = true;
                    }
                    else {
                        checkImpParams.allFilesSame = false;
                        break;
                    }
                }
            }
        }
        else {
            var ext = aPath.substring(aPath.lastIndexOf(".") + 1);
            if (ext == 'xls' || ext == 'xlsx') {
                checkImpParams.separator = true;
            }
            checkImpParams.allFilesSame = true;
            fileCount = 1;
        }
    }



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
        var selectedFields = [];
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
            selectedFields[i] = fieldsObj[i].cellNumber;
        }
        fileReader.setSelectedFields(selectedFields);
        readRows(fileReader);

    }

    function readRows(aFileReader) {
        var rowData = null;
        aFileReader.beforeFirst();
        while (aFileReader.getNext()) {
            rowData = mapData(aFileReader.getData());
            processIndicator.value += 1;
            if (readRowByRow) {
                if (processRowsMultithread) {
                    (function() {
                        importFunction(rowData);
                    }).invokeBackGround();
                }
                else
                    importFunction(rowData);
            }
            else
                allData.push(rowData);
        }
        if (!readRowByRow) {
            importFunction(allData);
        }
    }

    function mapData(aData) {
        var impMas = [];
        for (var j in fieldsObj) {
            impMas[j] = new Array();
        }
        for (var i = 0; i < aData.length; i++) {
            if (aData[i].cellData) {
                impMas[i][fieldsObj[i].mapping] = aData[i].cellData;
            }
        }
        return impMas;
    }

    function importFunction(aData) {

    }


    function getCellValue(cell) {
        var value = null;
        if (cell == null) {
            return null;
        }
        switch (cell.getCellType()) {
            case CELL_TYPE_BLANK:
                break;
            case CELL_TYPE_STRING:
                value = cell.getStringCellValue();
                break;
            case CELL_TYPE_NUMERIC:
                value = cell.getNumericCellValue();
                break;
            case CELL_TYPE_BOOLEAN:
                value = cell.getBooleanCellValue();
                break;
            case CELL_TYPE_ERROR:
                break;
        }
        return value == null ? null : new String(value);
    }
}
;
