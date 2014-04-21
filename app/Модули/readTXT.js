/**
 * 
 * @author Dmitriy
 * @module
 */
function readTXT(aParent, aPath, aSeparator) {
    var self = this, model = this.model;

    var fPath = aPath;
    var fSeparator = aSeparator;
    var readFileArray = [];
    var fis = null;
    var scanner = null;
    var count = 0;
    var fileCount = 0;




    self.initializeFile = initialize(fPath);
    self.getData = getData(fSeparator);
    self.getLength = getLength();
    self.getFirst = getFirst();
    self.getLast = getLast();



    /**
     * функция инициализирует файл
     * @param {type} filePath - путь файла
     * @returns {undefined}
     */
    function initialize(filePath) {
        fis = new java.io.FileInputStream(filePath);
        scanner = new java.util.Scanner(fis);
    }

    /**
     * функция возвращает набор данных из первой прочитанной стороки согласно разделителю
     * @param {type} separator - разделитель
     * @returns {Array} - возвращает объект с данными
     */
    function getData(separator) {
        if (separator) {
            var string = null;
            var stringArray = [];
            while (scanner.hasNext()) {
                string = scanner.nextLine();
                string = string.split(separator);
                if (string.length > 1) {
                    fileCount++;
                    break;
                }
            }
            if (string.length > 1) {
                for (var i = 0; i < string.length; i++) {
                    stringArray[i] = {cellNum: i + 1, cellData: string[i]};
                }
                readFileArray.push(stringArray);
                return stringArray;
            }
        }
        else
            return null;
    }

    /**
     * функция возвращает первый прочитанный набор данных
     * @returns {unresolved} - возвращает объект с данными
     */
    function getFirst() {
        return readFileArray[0];
    }

    /**
     * функция возвращает последний прочитанный набор данных
     * @returns {unresolved} - возвращает объект с данными
     */
    function getLast() {
        return readFileArray[readFileArray.length - 1];
    }

    /**
     * функция возвращает длинну файла согласно разделителю
     * @returns {unresolved} - длинна файла
     */
    function getLength() {
        var separator = fSeparator;
        var filePath = fPath;
        if (separator) {
            var fileLength = null;
            var fis = new java.io.FileInputStream(filePath);
            var scanner = new java.util.Scanner(fis);
            var string = null;
            while (scanner.hasNext()) {
                string = scanner.nextLine();
                string = string.split(separator);
                if (string.length > 1) {
                    fileLength++;
                }
            }
            return fileLength;
        }
        else
            return null;
    }

    /**
     * функция читает новую строку если она еще не прочитана, если прочитана то берет эту строку из массива прочитанных строк
     * @returns {Array} - возвращает объект с данными из строки
     */
    self.getNext = function() {
        var separator = fSeparator;
        if (count < fileCount - 1) {
            count++;
            return readFileArray[count];
        }
        else {
            var string = [];
            var stringArray = [];
            while (scanner.hasNext()) {
                string = scanner.nextLine();
                string = string.split(separator);
                if (string.length > 1) {
                    fileCount++;
                    count++;
                    break;
                }
            }
            for (var i = 0; i < string.length; i++) {
                stringArray[i] = {cellNum: i + 1, cellData: string[i]};
            }
            if (stringArray.length > 0) {
                readFileArray.push(stringArray);
                return stringArray;
            }
            else
                return null;
        }
    };

    /**
     * функция берет сроку из массива прочитанных стро
     * @returns {unresolved} - возвращает объект с данными из строки
     */
    self.getPrev = function() {
        if (count >= 1) {
            count--;
            return readFileArray[count];
        }
    };
}
