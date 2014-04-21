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


    self.openFile = initializeFile(fPath, fSeparator);
    self.setProgressIndicatorValue = function() {};
    self.setProgressIndicatorMaxValue = function() {
        Logger.warning('Функция отображения прогресса не инициализирована');
    };
    
    /**
     * функция определяет какой API для файла открыть
     * @param {type} filePath - путь файла
     * @param {type} separator - разделитель
     * @returns {readTXT|readXLS|readXLSX} - возвращает API
     */
    function initializeFile(filePath, separator) {
        var ext = filePath.substring(filePath.lastIndexOf(".") + 1);
        switch (ext) {
            case 'txt':
                return new readTXT(self, filePath, separator);
                break;
            case 'xls':
                return new readXLS(self, filePath);
                break;
            case 'xlsx':
                return new readXLSX(self, filePath);
                break;
        };
    }
}
