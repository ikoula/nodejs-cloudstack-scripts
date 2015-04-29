var CloudStackClient = require('csclient');

var options = {
    apiKey: 'VOTRE CLE API CLOUD IKOULA',
    secretKey: 'VOTRE CLE SECRETE CLOUD IKOULA',
    serverURL: 'https://cloudstack.ikoula.com/client/api?'
};

var client = new CloudStackClient(options);

var handleError = function (err) {
    if (err.name === 'APIError') {
        switch (err.code) {
        case 401:
            return console.log('Unauthorized.');
        case 530:
            return console.log('Parameter error: ' + err.message);
        default:
            return console.log('API error ' + err.code + ': ' + err.message);
        }
    } else {
        return console.log('Oops, I did it again. ' + err.message);
    }
}

client.execute('listVirtualMachines', {}, function (err, response) {
    if (err) return handleError(err);

    response = response.listvirtualmachinesresponse;
    for (var i = 0; i < response.virtualmachine.length; i++) {
        var vm = response.virtualmachine[i];
        console.log(vm.name + " is in state " + vm.state);
    }
});
