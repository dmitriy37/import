/**
 * 
 * @author Dmitriy
 * @name main
 */
var CELL_TYPE_NUMERIC = org.apache.poi.xssf.usermodel.XSSFCell.CELL_TYPE_NUMERIC;
var FILE_CHOOSER=javax.swing.JFileChooser;
    selectionMode=javax.swing.JFileChooser.FILES_AND_DIRECTORIES;
var selectedFile = null;
var evaluator = null;

function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed

  var chooser = new FILE_CHOOSER();
  var filePath = null;
  chooser.setFileSelectionMode(selectionMode);
  var result = chooser.showOpenDialog(null);
  if (result == FILE_CHOOSER.APPROVE_OPTION) {
        selectedFile = chooser.getSelectedFile();
        filePath = selectedFile.path;
    }
  var expansion;
  expansion=filePath.split(".").pop();
  textField.text += expansion;
  
  if(expansion == 'xls')
     openXLSFile4read(filePath);
 else if(expansion == 'doc')
     import_doc(filePath);
 else if(expansion == 'xlsx')
     openXLSXFile4read(filePath); 
}//GEN-LAST:event_buttonActionPerformed

function button1ActionPerformed(evt) {//GEN-FIRST:event_button1ActionPerformed
	testQ.insert(testQ.md.TEST1_ID,102);
        model.save();
}//GEN-LAST:event_button1ActionPerformed


function openXLSFile4read(filePath){
    var fis = new java.io.FileInputStream(filePath);
    var wb = new org.apache.poi.hssf.usermodel.HSSFWorkbook(fis);
    evaluator = wb.getCreationHelper().createFormulaEvaluator();
    readWorkBook(wb);   
}
function openXLSXFile4read(filePath){
    var fis = new java.io.FileInputStream(filePath);
    var OPCPack = new org.apache.poi.openxml4j.opc.OPCPackage.open(fis);    
    var wbx = new org.apache.poi.xssf.usermodel.XSSFWorkbook(OPCPack);  
    readWorkBook(wbx);
}

function readWorkBook(workBook){
    var numSheets = workBook.getNumberOfSheets();
    var startSheet = 0;
    for(var k = startSheet ; k < numSheets ; k++){
        readSheet(workBook.getSheetAt(k),k);
    }  
}
function readSheet(sheet,num){
    var rows = sheet.getPhysicalNumberOfRows();
    for(var i = 0 ; i < rows ; i++){
        readRow(sheet.getRow(i));
    }
}
function readRow(row){
    var aRow = new Array();
    for(var i = 0 ; i < 4 ; i++){
        var cellR = row.getCell(i);
        aRow[i] = getCellValueByType(cellR);  
        var value = cellR.getCellType();}

    
     for(var i = 0 ; i < aRow.length  ; i++){
        textField1.text += aRow[i] + '  ';
    }
}
var evaluatedCellType = -1;
function getCellValueByType(cell){   
    var value = null;
    if (cell == null) {
        return null;
    }
    switch(cell.getCellType()){
        case org.apache.poi.xssf.usermodel.XSSFCell.CELL_TYPE_BLANK:
            break;
        case org.apache.poi.xssf.usermodel.XSSFCell.CELL_TYPE_STRING:
            value = cell.getStringCellValue();
            break;
        case CELL_TYPE_NUMERIC:
            value = cell.getNumericCellValue();
            break;
        case org.apache.poi.xssf.usermodel.XSSFCell.CELL_TYPE_FORMULA:
            evaluatedCellType = evaluator.evaluateFormulaCell(cell);
            switch(evaluatedCellType) {
                case org.apache.poi.xssf.usermodel.XSSFCell.CELL_TYPE_NUMERIC:
                    value = cell.getNumericCellValue();
                    break;
                case org.apache.poi.xssf.usermodel.XSSFCell.CELL_TYPE_STRING:
                    value = cell.getStringCellValue();
                    break;
                    
                case org.apache.poi.xssf.usermodel.XSSFCell.CELL_TYPE_BOOLEAN:
                    value = cell.getBooleanCellValue();
                break;
            }
            break;
        case org.apache.poi.xssf.usermodel.XSSFCell.CELL_TYPE_BOOLEAN:
            value = cell.getBooleanCellValue();
            break;
        case org.apache.poi.xssf.usermodel.XSSFCell.CELL_TYPE_ERROR:
            addLog('CELL_TYPE_ERROR обнаружено');
            break;
    }
    return value == null ? null : new String(value);    
}
