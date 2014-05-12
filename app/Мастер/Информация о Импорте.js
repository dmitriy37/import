/**
 * 
 * @author Dmitriy
 */
function formImpInfo() {
    var self = this, model = this.model, form = this;


    self.show = function(map, obj) {
        self.textArea.text = '';
        for (var i in map) {
            for (var j = 0; j < obj.length; j++) {
                if (map[i][j][obj[j].mapping]) {
                    self.textArea.text += obj[j].mapping + '     ' + map[i][j][obj[j].mapping] + '\n'
                }
            }
        }
    };
}
