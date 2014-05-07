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
        mappingId: false
    };
    
    
    var initialized = false;
    var isDirectory = false;
    var readyForImport = false;
    var allFilesSame = false;
    
    var readByRow = true;
    var readFilesMultithread = false;
    var processRowsMultithread = false;

    var separator = '';
    var fieldsObj = null;
    var mappingId = null;
    var path = '';
    var fileCount = null;


    self.setPath = function(aPath) {
        try {
            if (aPath.isDirectory()) {
                path = aPath;
                isDirectory = true;
                checkImpParams.path = true;
                checkSameFiles(aPath);
            }
            else {
                path = aPath;
                isDirectory = false;
                checkImpParams.path = true;
            }
        } catch (e) {
            Logger.warning(errorDescription.noFile + '  ' + e);
            alert('Не выбран файл');
            alert(aPath);
        }
    };
    
    self.setSeparator = function (aSeparator) {
        separator = aSeparator;
        checkImpParams.separator = true;
    }

    self.setMappingId = function(aMappingId) {
        try {
            mappingId = aMappingId;
            checkImpParams.mappingId = true;
        }
        catch (e) {
            Logger.error(errorDescription.noMapping + '  ' + e);
            alert('Не выбран вариант сопоставления');
        }
    };

    self.setMappingObj = function(aMappingObj) {
        try {
            fieldsObj = aMappingObj;
            checkImpParams.mappingId = true;
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

    self.import = function() {
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
        var mas = [];
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
            mas[i] = fieldsObj[i].cellNumber;
        }
        fileReader.setSelectedFields(mas)
        readRows(fileReader);
    }

    function readRows(aFileReader) {
        var data = aFileReader.getData();
        for (var i = 0; i < aFileReader.getLength(); i++) {
            importFunction(data);
            data = aFileReader.getNext();
        }
    }

    function importFunction(aData) {
        var impMas = [];
        for(var j in fieldsObj) {
            impMas[j] = new Array();
        }
        for(var i = 0 ; i < aData.length ; i++) {
            impMas[i][fieldsObj[i].mapping] = aData[i].cellData;
          //  alert(impMas[i][fieldsObj[i].mapping]);
        }
    }
































































//    var API = new ImportAPI(workFileAPI, aSeparator);
//    var workFileAPI = API.openFile;
//    var fPath = aPath;
//    var fSeparator = aSeparator;
//    var fObj4Import = aObj4Import;
//    var fileAPI = workFileAPI;
//    
//    self.createImpArr = function () {
//
//   
//        
//        var importArray = [];
//        
//        for(var i = 0 ; i < fObj4Import.length ; i++) {
//            importArray[i] = new Array();
//        }
//        
//        for(var i = 0 ; i < fObj4Import.length ; i++) {
//            if(fObj4Import[i].isArray)
//                importArray[i][fObj4Import[i].mapping] = new Array();
//        }
//        
//        
//        
//        for(var i = 0 ; i < fileAPI.length ; i++) {
//            var  data = fileAPI[i].getData;
//            for(var k = 0 ; k < fileAPI[i].getLength() ; k++) {                
//            for(var j = 0 ; j < fObj4Import.length ; j++) {
//               if(fObj4Import[j].isArray == null) {
//                   importArray[j][fObj4Import[j].mapping] = data[fObj4Import[j].cellNumber].cellData;
//               }
//               else {
//                   var buf = data[fObj4Import[j].cellNumber].cellData;
//                   importArray[j][fObj4Import[j].mapping].push(buf);
//               }
//            }
//            data = fileAPI[i].getNext();
//        }
//     
// 
//        }      
//        return importArray;
//        
//        
//    
//        

//        
//        
//        
//        for(var i = 0 ; i < fPath.length ; i++) {
//            var  data = fileAPI.getFirst();
//            for(var k = 0 ; k < fileAPI.getLength() ; k++) {                
//            for(var j = 0 ; j < fObj4Import.length ; j++) {
//               if(fObj4Import[j].isArray == null) {
//                   importArray[j][fObj4Import[j].mapping] = data[fObj4Import[j].cellNumber].cellData;
//               }
//               else {
//                   importArray[j][fObj4Import[j].mapping][k] = data[fObj4Import[j].cellNumber].cellData;
//               }
//            }
//            data = fileAPI.getNext();
//        }
//        fileAPI.getNextFile();
// 
//        }      
//        return importArray;
}
;


