/**
 * 
 * @author Dmitriy
 * @module
 */
function ImportModule(aPath, aSeparator, aObj4Import, workFileAPI) {
    var self = this, model = this.model;
    

    /*
     * fPath - путь файла
     * fSeparator - разделитель для текстового файла
     * fObj4Import - объект с типом сопоставления для импорта
     */
    var fPath = aPath;
    var fSeparator = aSeparator;
    var fObj4Import = aObj4Import;
    var fileAPI = workFileAPI;
    
    self.createImpArr = function () {

        fileAPI.nullAllParam();
        
        var importArray = [];
        
        for(var i = 0 ; i < fObj4Import.length ; i++) {
            importArray[i] = new Array();
        }
        
        for(var i = 0 ; i < fObj4Import.length ; i++) {
            if(fObj4Import[i].isArray)
                importArray[i][fObj4Import[i].mapping] = new Array();
        }
        
        
        
        for(var i = 0 ; i < fPath.length ; i++) {
            var  data = fileAPI.getFirst();
            for(var k = 0 ; k < fileAPI.getLength() ; k++) {                
            for(var j = 0 ; j < fObj4Import.length ; j++) {
               if(fObj4Import[j].isArray == null) {
                   importArray[j][fObj4Import[j].mapping] = data[fObj4Import[j].cellNumber].cellData;
               }
               else {
                   importArray[j][fObj4Import[j].mapping][k] = data[fObj4Import[j].cellNumber].cellData;
               }
            }
            data = fileAPI.getNext();
        }
        fileAPI.getNextFile();
 
        }      
        return importArray;
};
}

