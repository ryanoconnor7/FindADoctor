
var map = null
var markers = []
var statusDiv = null
var sortedResults = []

function mainTextFieldChanged() {
        var textField = document.getElementById("Query")

        statusDiv = document.getElementById("status")
        var additional = document.getElementById("additional-fields")

        console.log("keyed up on main search field")
        
        if (textField.value == 0) {
                // additional.style="visibility:hidden"

                console.log("should not show")
        } else {
                // additional.style="visibility:visible"
                console.log("should show")

                updateData().then(function() {
                    console.log("Ready to search \""+textField.value+'"')
                        searchLocations(textField.value).then(function(results) {

                                console.log("Received results ("+results.length+")")

                                if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition(function(loc) {
                                       for (i=0;i<=results.length-1;i++) {
                                        var rLat = Number(results[i].displayLat)
                                        var rLng = Number(results[i].displayLng)

                                     if (distance(loc.coords.latitude,loc.coords.longitude,rLat,rLng,"M") < 10) {
                                        sortedResults.push(results[i])
                                        console.log("We found a match!")
                                     }   

                                }  
                                })

                               
                        }

                                statusDiv.innerText = "Received results ("+results.length+")"
                                statusDiv.innerHTML = ""
                                if (markers.length > 0) {
                                removeMarkers()

                                }
                                var bounds = new google.maps.LatLngBounds();

                                for (i=0; i<=results.length-1; i++) {
                                        var result = results[i]
                                        var url = " "
                                        if (result.headshot != "undefined" && result.headshot != null) {
                                                if (result.headshot.url != "undefined" && result.headshot.url != null) {
                                                      url = result.headshot.url

                                                } else {
                                                 url = result.logo.url
                                                }
                                        } else {
                                              url = result.logo.url

                                        }
                                       
                                        
                                        var pos = {lat: Number(result.displayLat), lng: Number(result.displayLng)};
                                        bounds.extend(pos);

                                        var marker = new google.maps.Marker({
                                        position: pos,
                                        map: map,       
                                        label: String(i+1),
                                        animation: google.maps.Animation.DROP
                                        
                                        });

                                        marker.addListener('mouseover', function() {
                                                // markerColorToWhite()  
                                                var id = "cell" + i              
                                                var cell = document.getElementsByClassName(i)

                                                cell.style.backgroundColor = "9bcfef"
                                        });     

                                         var contentString = `<p>${result.firstName+" "+result.lastName}</p>`
                                         var infowindow = new google.maps.InfoWindow({
                                        content: contentString
                                        });
                                        marker.addListener('click', function() {
                                        infowindow.open(map, marker);
                                        });

                                         statusDiv.innerHTML = statusDiv.innerHTML.concat(`
                                        <div id="cell" class=${i} style="width:100%;height:90px;padding-top:5px;padding-bottom:5px;" action="javascript:toggleBounce(${i});">
                                
                                        <img align="left" class=headshot style="height:100%;width:auto;border-radius:10px;border:0px solid;" src=${url}></img>
                                        
                                        <h5 style="margin-top:0px;margin-bottom:-4px;font-family: 'Trebuchet MS',sans-serif">${result.firstName+" "+result.lastName}</h5>
                                        <p style="line-spacing:0.1;font-family: 'Trebuchet MS',sans-serif;font-size:12px">${result.officeName}<br>${result.city}<p>
                                        </div>
                                        <div style="background-color:gray;height:1px;width:100%"></div>
                                        `)
                                                        
                                        markers.push(marker)

                                }
                                //center the map to the geometric center of all markers
                                map.panTo(bounds.getCenter())

                                        
                         })
                })
        }
}

 
 function initMap() {

        var uluru = {lat: 40.915472, lng: -73.122721};
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: uluru
        });
      
 }

 function removeMarkers() {
        for (i=0;i<=markers.length-1;i++) {
                markers[i].setMap(null)
        }
        markers = []
 }

 function markerColorToWhite() {
         for (i=0;i<=statusDiv.childNodes.length-1;i++) {
                var cell = statusDiv.childNodes[i]
                cell.style.backgroundColor = "fff"

        }
 }

 function toggleBounce(i) {
        if (markers[i].getAnimation() !== null) {
          markers[i].setAnimation(null);
        } else {
          markers[i].setAnimation(google.maps.Animation.BOUNCE);
        }
      }

function distance(lat1, lon1, lat2, lon2, unit) {
        var radlat1 = Math.PI * lat1/180
        var radlat2 = Math.PI * lat2/180
        var theta = lon1-lon2
        var radtheta = Math.PI * theta/180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180/Math.PI
        dist = dist * 60 * 1.1515
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist
}