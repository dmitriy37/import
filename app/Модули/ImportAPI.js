/**
 * 
 * @author Dmitriy
 * @module
 */
function ImportAPI(filePath, separator) {
    var self = this, model = this.model;

    /* fPath - путь файла
     * fSeparator - разделитель для текстового файла
     */
    var fPath = filePath;
    var fSeparator = separator;
    var count = 0;

    
    
    self.openFile = initializeFile(fPath, fSeparator);

    
    
    function initializeFile(filePath, separator) {
        var apiArr = [];
        for(var i = 0 ; i < filePath.length ; i++) {
            var fPath = filePath[i];
            var ext = fPath.substring(fPath.lastIndexOf(".") + 1);
            switch (ext) {
                case 'txt': apiArr.push(new readTXT(fPath, separator));
                    break;
                case 'xls': apiArr.push(new readXLS(fPath));
                    break;
                case 'xlsx': apiArr.push(new readXLSX(fPath));
                    break;
            };
        }
        return apiArr;
    }
    
    /**
     * функция определяет какой API для файла открыть
     * @param {type} filePath - путь файла
     * @param {type} separator - разделитель
     * @returns {readTXT|readXLS|readXLSX} - возвращает API
     */
//    function initializeFile(filePath, separator) {
//       var fPath = filePath[count];
//        var ext = fPath.substring(fPath.lastIndexOf(".") + 1);
//        alert(ext);
//        switch (ext) {
//            case 'txt':
//                return new readTXT(filePath, separator);
//                break;
//            case 'xls':
//                return new readXLS(filePath);
//                break;
//            case 'xlsx':
//                return new readXLSX(filePath);
//                break;
//        };
//    }
    
//    function initializeFile(filePath, separator) {
//        var mas = [];
//        for(var i = 0 ; i < filePath.length ; i++) {
//             var fPath = filePath[i];
//            var ext = fPath.substring(fPath.lastIndexOf(".") + 1);
//          //  mas[i] =  new readXLS(fPath);
//            mas.push(new readXLS(fPath));
//        }   
//        return mas;
//        }
//        
//        self.openFile = function () {
//            return initializeFile(filePath,separator);
//        }
//    

    
 
    
    
   


}
