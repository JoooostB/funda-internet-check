console.log("Plugin loaded")
var property_element = document.getElementsByClassName('search-result__header-title')
var property_subtitle = document.getElementsByClassName('search-result__header-subtitle')
var count = 0
for (var i = 0; i < property_element.length; ++i) {
  var item = property_element[i].innerHTML.replace(/  +/g, '');
  var subitem = property_subtitle[i].innerHTML.replace(/  +/g, '').replace(/(\r\n|\n|\r)/gm, "").substring(0, 8);
  var address = (item.substr(1).slice(0, -1))

  // Street without number. If example is Maximalaan 74A, number will be Maximalaan.
  var street = address.split(/[0-9]+/)[0]
  // Number without addition. If example is Maximalaan 74A, number will be 74.
  var number = address.match(/\d+/)[0]
  // If example is Maximalaan 74A, extension will be A.
  var extension = address.split(/[0-9]+/)[1].replace(' ', '')

  var postcode = subitem.substring(0, 7).replace(' ', '')
  
  var maxspeeds
  getProducts(postcode, number+extension)
    .then((data) => {
      console.log(data)
      maxspeeds = setMaxSpeeds(data)
      count += 1
    })

  function setMaxSpeeds(response) {
    var max_download = 0
    var max_upload = 0
    var network = ''
    var type = ''
    for (var connection of response.connections) {
      if (connection.down > max_download) {
        max_download = connection.down
        if (connection.up == 0){
          max_upload = 'Onbekend'
        }
        else {
          max_upload = connection.up
        }
        network = connection.network
        type = connection.type
      }
    }
    console.log(count)
    var extraInfo = $("ul.search-result-kenmerken").get(count)
    if (max_upload == "Onbekend"){
      extraInfo.after("Download: " +  max_download + "Mb/s - Upload: " + max_download + "Mb/s via " + network)
    }
    else {
      extraInfo.after("Download: " +  max_download + "Mb/s - Upload: " + max_upload + "Mb/s via " + network)
    }
    console.log(extraInfo)
    console.log ({
      max_download: max_download,
      max_upload: max_upload,
      network: network,
      type: type
    })
  }
}

