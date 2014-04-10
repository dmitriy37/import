/**
 * 
 * @author Dmitriy
 * @module
 */
function readFileController() {
    var self = this, model = this.model;
    
    self.read = initReader;
    self.initReader = initReader;
            
    function initReader(filePath) {
        var ext = filePath.substring(filePath.lastIndexOf(".") + 1);
        switch (ext) {
            case('xls') : {
                    return new readXLS(filePath);
                    break;
            }
            case ('xlsx') : {
                    return new readXLSX(filePath);
                    break;
            }
            case ('txt') : {
                    return new readTXT(filePath);
                    break;
            }
        }
    };
}
