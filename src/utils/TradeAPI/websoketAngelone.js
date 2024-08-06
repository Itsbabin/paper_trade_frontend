import { WebSocket } from "smartapi-javascript";
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
})
.catch(function (error) {
  console.log(error);
});


let web_socket = new WebSocket({
    client_code: "B55480477",
    feed_token: feedtoken
});

web_socket.connect()
    .then(() => {
        web_socket.runScript("2885", "mw") // SCRIPT: nse_cm|2885, mcx_fo|222900  TASK: mw|sfi|dp

        setTimeout(function () {
            web_socket.close()
        }, 30000)
    })

web_socket.on('tick', receiveTick)


function receiveTick(data) {
    console.log("receiveTick:::::", data)
}