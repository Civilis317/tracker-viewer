/**
* env.js
* KEEP OUT OF SOURCE CONTROL!
*/
env = {
              "apikey": 'AIzaSyC3lWzTZwxkmPm04KRSmOPa87IlLB6DxCw',
              "scriptsrc": "https://maps.googleapis.com/maps/api/js?key=AIzaSyC3lWzTZwxkmPm04KRSmOPa87IlLB6DxCw"
            	  
}

var google;

function initGoogleApi() {
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=' + env.apikey;
    script.async = true;
    script.defer = true;
    document.getElementsByTagName('head')[0].appendChild(script);
    return false;
}