/**
 * 
 * @author Dmitriy
 */
function formExtraSetting() {
    var self = this, model = this.model, form = this;

    self.impInfo = function(impArray, obj4Import) {
        self.textArea.text = 'Mapping Type' + '                       ' + 'Value' + '\n';
        for (var i = 0; i < impArray.length; i++) {
            if (impArray[i][obj4Import[i].mapping].length == undefined) {
                var value = impArray[i][obj4Import[i].mapping];
                self.textArea.text += obj4Import[i].mapping + '                  ' + value + '\n';
            }
            else {
                for (var j = 0; j < impArray[i][obj4Import[i].mapping].length; j++) {
                    self.textArea.text += obj4Import[i].mapping + '                  ' + impArray[i][obj4Import[i].mapping][j] + '\n';
                }
            }
        }
    };
    
    function setProgressIndicator(aImpModule) {
        aImpModule.setProgressIndicatorValue = function(aValue) {
            try {
                //Многопоточный режим
                (function(){form.progressBar.value = aValue;}).invokeAndWait();
            } catch (e) {
                form.progressBar.value = aValue;
            }
        };
        aImpModule.setProgressIndicatorMaxValue = function(aMaximum) {
            try {
                //Многопоточный режим
                (function(){form.progressBar.maximum = aMaximum;}).invokeAndWait();
            } catch (e) {
                form.progressBar.maximum = aMaximum;
            }
        };
    }

}
