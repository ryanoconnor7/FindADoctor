

function mainTextFieldChanged() {
        var textField = document.getElementById("Query")
        var additional = document.getElementById("additional-fields")

        console.log("keyed up on main search field")
        
        if (textField.value == 0) {
                // additional.style="visibility:hidden"

                console.log("should not show")
        } else {
                // additional.style="visibility:visible"
                console.log("should show")

                var specialtyURL = 'https://api.yext.com/v2/accounts/[accountId]/locationsearch?api_key=API_KEY&v=20170705' //[{%22specialties%22:{%22contains%22:[%22radiology%22]}}]' 

                                $.getScript("DataManager.js").then(function() {
                                        console.log("Making call...")  
                                        makeAPICall(specialtyURL,'filters','[{"specialties":{"contains":["'+textField.value+'"]}}]')
                                        .then(function(data) {

                                        try {
                                        var json = JSON.parse(JSON.stringify(data))
                                        console.log("JSON:", json)
                                        handleSpecialtiesResponseSuccess(json)
                                        } 
                                        catch (e) {
                                        console.log("error:", e)
                                        }
                                        })
                                        .catch(function(error) {
                                        console.log("error: ", error) 
                                        
                                        })
                                })
                        }
                }

 function handleSpecialtiesResponseSuccess(json) {


 }
