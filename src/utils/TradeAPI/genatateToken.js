import otplib from 'otplib';
import axios from 'axios';

const secret = 'Y22GJMMLQTDYVQVRRXV2JQ3PHE';

const token = otplib.authenticator.generate(secret);

var data = JSON.stringify({
    "clientcode":"B55480477",
    "password":"9046",
	"totp":token
});

var config = {
  method: 'post',
  url: 'https://apiconnect.angelbroking.com/rest/auth/angelbroking/user/v1/loginByPassword',
  headers : {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-UserType': 'USER',
    'X-SourceID': 'WEB',
    'X-ClientLocalIP': 'CLIENT_LOCAL_IP',
    'X-ClientPublicIP': 'CLIENT_PUBLIC_IP',
    'X-MACAddress': 'MAC_ADDRESS',
    'X-PrivateKey': 'dkWf8sXV'
  },
  data : data
};
let feedtoken ;
axios(config)
.then(function (response) {
    feedtoken = response.data.data.feedToken
  console.log(response.data.data.feedToken);
})
.catch(function (error) {
  console.log(error);
});

export default feedtoken ;

