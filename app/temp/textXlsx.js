/**
 * 
 * @author Dmitriy
 */
function textXlsx() {
    var self = this, model = this.model, form = this;

    var FILE_CHOOSER = javax.swing.JFileChooser;
    var selectionMode = javax.swing.JFileChooser.FILES_AND_DIRECTORIES;
    self.selectedFile = null;
    self.filePath = null;
    self.parent = null;

    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
        var chooser = new FILE_CHOOSER();
        chooser.setFileSelectionMode(selectionMode);
        var result = chooser.showOpenDialog(null);
        if (result == FILE_CHOOSER.APPROVE_OPTION) {
            self.selectedFile = chooser.getSelectedFile();
            self.filePath = self.selectedFile.path;
        }
        var fis = new java.io.FileInputStream(self.filePath);
        var OPCPack = new org.apache.poi.openxml4j.opc.OPCPackage.open(fis);
        var wb = new org.apache.poi.xssf.usermodel.XSSFWorkbook(OPCPack);
        var startSheet = 0;
        for (var i = startSheet; i < wb.getNumberOfSheets(); i++) {
            readSheet(wb.getSheetAt(i), i);
        }
    }
    ;

    function readSheet(sheet, sheetNum) {
        var rows = sheet.getPhysicalNumberOfRows();

        for (var rowNum = 0; rowNum < rows; rowNum++) {
            readRow(sheet, rowNum, sheetNum);
        }
    }

    function readRow(sheet, rowNum, sheetNum, array) {
        var k = 0;
        var curRow = sheet.getRow(rowNum);
        var cellNum = curRow.getPhysicalNumberOfCells();
        for(var i = 0 ; i < curRow.getLastCellNum(); i++) {
            alert(curRow.getCell(i));
        }
    }

    
    }//GEN-LAST:event_buttonActionPerformed

