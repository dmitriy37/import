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

    
    
   // self.openFile = initializeFile(fPath, fSeparator);
    
    self.openFile = function () {
        return initializeFile(fPath[count], fSeparator);
    };
    
    self.nextFile = function () {
        if(count < fPath.length - 1) {
            count++;
            return true;
        }
        else return false;
    };
    
    self.getPrev = function () {
        if(count >= 1) {
            count--;
            return true;
        }
        else return false;
    };
    
    function initializeFile(filePath, separator) {
            var ext = filePath.substring(filePath.lastIndexOf(".") + 1);
            switch (ext) {
                case 'txt': return new readTXT(filePath, separator);
                    break;
                case 'xls': return new readXLS(filePath);
                    break;
                case 'xlsx': return new readXLSX(filePath);
                    break;
            };
        }
}
