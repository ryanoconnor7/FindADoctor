// let additional = document.getElementById("additional-fields")



function mainTextFieldChanged(){
        var textField = document.getElementById("additional-fields")

        console.log("keyed up on main search field")
        
        if (textField.lenght > 0) {
         additional.style="isHidden:false"

        } else {
         additional.style="isHidden:true"

        }
 }