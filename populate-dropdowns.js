$( document ).ready(function() {
$.ajax({
    type: "GET",
    dataType: "jsonp",
    //contentType: "application/json",
    url: "https://findadoc.uhmc.sunysb.edu/sbmed/get-ins-lang.cfm",
    data: {},
    jsonpCallback: "pdCallback",
	jsonp: false, 
	success: function(data) {
		for(var prop in data) {
			if (data[prop].ORDER == '1') {
	       		$('<option value=' + data[prop].CODE + '>' + data[prop].NAME + '</option>').appendTo('#Insure');
			} else {
				$('<option value=' + data[prop].CODE + '>' + data[prop].NAME + '</option>').appendTo('#Language');
			}
	    }	
	},
	error: function(xhr, status, errorThrown) {
	//alert(errorThrown);
    if (window.console) {
    console.log("Error: " + errorThrown);
	console.log("status: " + status);
	console.dir(xhr);
    }
	},
	complete: function(xhr, status) {
	//console.log('finished');
	}
})
});

