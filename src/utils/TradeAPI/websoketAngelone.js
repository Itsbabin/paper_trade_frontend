import { SmartAPI , WebSocketV2 } from "smartapi-javascript";
import otplib from 'otplib';

const secret = 'Y22GJMMLQTDYVQVRRXV2JQ3PHE';

const totp = otplib.authenticator.generate(secret);


var clientcode = "B55480477";
var password= "9046";
var api_key = 'dkWf8sXV'


let smart_api = new SmartAPI({
	api_key
});



smart_api
	.generateSession('B55480477', '9046', totp)
	.then((data) => {
		let jwtToken = data.data.jwtToken
		let feedToken = data.data.feedToken
        // smart_api.searchScrip({
        //     "exchange": "NSE", 
        //     "searchscrip":"paytm"
        // }).then((data)=>{
        //     console.log(data);
        // })
    

    let web_socket = new WebSocketV2({
        	jwttoken: jwtToken,
        	apikey: api_key,
        	clientcode: clientcode,
        	feedtype: feedToken,
        });
        
        //For handling custom error 
        // web_socket.customError();
        
        // handle reconnection
        // web_socket.reconnection(reconnectType, delayTime, multiplier);
        
        web_socket.connect().then(() => {
        	let json_req = {
        		correlationID: "abcde12345",
        		action: 1,
        		mode: 1,
        		exchangeType: 1,
        		tokens: ["1594"],
        	};
        
        	web_socket.fetchData(json_req);
        
        	web_socket.on("tick", receiveTick);
        
        	function receiveTick(data) {
        		console.log("receiveTick:::::", data);
        	}
        }).catch((err) => {
        	console.log('Custom error :', err.message);
        });

    })

