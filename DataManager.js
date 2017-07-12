// Hey

console.log('yext.js loaded!')

if(typeof(yext)=="undefined"){ // in case you'e already using an object called yext
    yext={jobs:{}}
}else{
    yext.jobs={}
}

yext.getJSON=function(url){ // getJSON with promises
    url = 'https://script.google.com/macros/s/AKfycbxH_t0MnnzTDvWnGKwpyIJUkJJqpuBOiZjwnerTgtGLsONojZg/exec?url='+encodeURIComponent(url)
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
yext.getJSON("https://api.yext.com/v2/accounts/[accountId]/locations?api_key=API_KEY&v=20170705") 
.then (function(data){
    console.log("SUCCESS")
console.log(data)

})
.error (function(data) {
console.log(data)
})

