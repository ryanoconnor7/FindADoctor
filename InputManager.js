

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


        }

}

 function handleSpecialtiesResponseSuccess(json) {


 }
