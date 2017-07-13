

function mainTextFieldChanged() {
        var textField = document.getElementById("main")
        var additional = document.getElementById("additional-fields")

        console.log("keyed up on main search field")
        
        if (textField.value == 0) {
                additional.style="visibility:hidden"

                console.log("should not show")
        } else {
                additional.style="visibility:visible"
                console.log("should show")

                var specialtyURL = 'https://api.yext.com/v2/accounts/{accountId}/locationsearch?api_key=API_KEY&v=20170705?filters=[{"categoryID":{"contains":["' + textField.textContent + '"]}}]' 

                                $.getScript("DataManager.js").then(function() {
                                        console.log("Making call...")  
                                        makeAPICall()
                                        .then(function(data) {
                                        console.log("DATA:", JSON.stringify(data))

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
