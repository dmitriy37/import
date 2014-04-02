/**
 * 
 * @author Dmitriy
 */
function ignat() {
    var self = this, model = this.model, form = this;
    
    var FILE_CHOOSER = javax.swing.JFileChooser;
    var selectionMode = javax.swing.JFileChooser.FILES_AND_DIRECTORIES;
    var imp = org.apache.poi.hwpf.HWPFDocument;
    self.selectedFile = null;
    self.filePath = null;
    self.parent = null;


    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
/*        var chooser = new FILE_CHOOSER();
        chooser.setFileSelectionMode(selectionMode);
        var result = chooser.showOpenDialog(null);
        if (result == FILE_CHOOSER.APPROVE_OPTION) {
            self.selectedFile = chooser.getSelectedFile();
            self.filePath = self.selectedFile.path;
        }
        var fis = new java.io.FileInputStream(self.filePath);
        var fr = new java.io.FileReader(self.filePath);
        var bf = new java.io.BufferedReader(fr);
        var check = '';
        var sc = new java.util.Scanner(fis);
      //  alert(sc.nextLine());
      //  while(sc.hasNext()) {
     //       alert(sc.nextLine());
     //   }
     
     
      //  while (bf.readLine()) {
      //      alert('+');
      //  }
      var bq = sc.nextLine();
      var buf = bq.split('|');
      alert(buf[1]);
    }
       */
      
      var mas = [];
      var st = [];
      var st2 = [];
      var sq = [[[]]];
      
      for(var i = 0 ; i < 2 ; i++) {
          for(var j = 0 ; j < 2 ;j++) {
              for(q = 0 ; q < 2 ; q++) {
                  sq[i][[q]] = q;
              }
          }
      }
   
    }
    }//GEN-LAST:event_buttonActionPerformed

