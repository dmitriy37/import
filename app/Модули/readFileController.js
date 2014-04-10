/**
 * 
 * @author Dmitriy
 * @module
 */
function readFileController() {
    var self = this, model = this.model;
    
    
    self.read = function(filePath) {
        var ext = filePath.substring(filePath.lastIndexOf(".") + 1);
        if (ext == 'xls') {
            var moduleReadXLS = new readXLS();
            return moduleReadXLS;
        }
        else if (ext == 'xlsx') {
            var moduleReadXLSX = new readXLSX();
            return moduleReadXLSX;
        }
        else if (ext == 'txt') {
            var moduleReadTXT = new readTXT();
            return moduleReadTXT;

        }
    };























    /*
     var moduleReadXLSX = new readXLSX();
     var moduleReadXLS = new readXLS();
     var moduleReadTXT = new readTXT();
     
     self.checkFileExtenshion = function(fPath) {
     var ext = fPath.substring(fPath.lastIndexOf(".") + 1);
     if (ext == 'xlsx') {
     moduleReadXLSX.readFile(fPath);
     }
     else if (ext == 'xls') {
     moduleReadXLS.readFile(fPath);
     }
     else if (ext == 'txt') {
     moduleReadTXT.readFile(fPath);
     }
     };
     
     self.readTop = function(fPath, separator) {
     var ext = fPath.substring(fPath.lastIndexOf(".") + 1);
     if (ext == 'xlsx') {
     return moduleReadXLSX.readFirstRow();
     }
     else if (ext == 'xls') {
     return moduleReadXLS.readFirstRow();
     }
     else if (ext == 'txt' && separator != null) {
     return moduleReadTXT.readFirstRow(separator);
     }
     };
     
     self.scroll = function(fPath, count, array, separator) {
     var ext = fPath.substring(fPath.lastIndexOf(".") + 1);
     if (ext == 'xlsx') {
     return moduleReadXLSX.scroll(count, array);
     }
     else if (ext == 'xls') {
     return moduleReadXLS.scroll(count, array);
     
     }
     else if (ext == 'txt' && separator != null) {
     return moduleReadTXT.scroll(count, array, separator);
     }
     };
     
     self.getNumberOfRow = function(fPath) {
     var ext = fPath.substring(fPath.lastIndexOf(".") + 1);
     if (ext == 'xlsx') {
     return moduleReadXLSX.numberOfRows();
     }
     else if (ext == 'xls') {
     return moduleReadXLS.numberOfRows();           
     }
     else if (ext == 'txt') {
     //  return moduleReadTXT.numberOfRows();
     }
     };
     
     self.getString = function (separator) {
     return moduleReadTXT.getString(separator);
     }*/


}
