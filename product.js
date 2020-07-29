function getProducts(postcode, number) {
    this.max_download = 0
    this.max_upload = 0
    this.network = ''
    this.type = ''
    var settings = {
        "url": "https://api-internet.whitelabeled.nl/v1/postcode-check/BPLafl7wF3tSrkfD-8/" + postcode + "/" + number,
        "method": "GET",
        "timeout": 0
    };
        return new Promise((resolve, reject) =>  {
        $.ajax(settings).done(function (response) {
            resolve(response)
        })
    });
}