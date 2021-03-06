
console.log('yext.js loaded!')

if(typeof(yext)=="undefined"){ // in case you'e already using an object called yext
    yext={jobs:{}}
}else{
    yext.jobs={}
}

yext.getJSON=function(url,savedUID){ // getJSON with promises

    // New script - copy of Yext - https://script.google.com/macros/s/AKfycbw-J7Zaw7yl6kbFFAo0VKbVHBg-vTL7XvsdEkGE2p1eCXxMkt0/exec
    url = 'https://script.google.com/macros/s/AKfycbw-J7Zaw7yl6kbFFAo0VKbVHBg-vTL7XvsdEkGE2p1eCXxMkt0/dev?url='+encodeURIComponent(url)+'&uid='+savedUID //+'&paramNames='+encodeURIComponent(additionalParamNamesX)+'&paramValues='+encodeURIComponent(additionalParamValuesX)
    
    return new Promise(function(resolve, reject) {
        var s = document.createElement('script')
        var uid = "job"+Date.now().toString()+Math.random().toString().slice(2)
        s.id=uid
        s.src=url+'&callback=yext.jobs.'+uid
        yext.jobs[uid]=function(x){
            resolve(x)
            setTimeout(function(){  // remove the scripts that were successfull 
                delete yext.jobs[uid]
                var s = document.getElementById(uid)
                s.parentElement.removeChild(s)
            },1000)
        }
        s.onerror=function(){
            reject({"error":('error loading '+url)})
        }
        document.head.appendChild(s)
    })
}

// Handle the response

function makeAPICall(url,savedUID) {

    console.log()
    return new Promise(function(resolve,reject) {
        yext.getJSON(url,savedUID) 
        .then (function(data){
            console.log("SUCCESS")
            resolve(data)
            })
        .catch (function(error) {
            reject(error)
    })

    })
    
    
}




