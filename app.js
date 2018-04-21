const express = require('express');
const app = express();
const cors = require('cors')

const Web3 = require('web3');
const web3 = new Web3('http://localhost:7545');

app.use(cors())

const contract = new web3.eth.Contract(
   [{"constant":true,"inputs":[],"name":"getLives","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"reset","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_points","type":"uint256"}],"name":"setPoints","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_lives","type":"uint256"}],"name":"setLives","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPoints","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}],
   '0x86dfd485ec71d37351acf69225ae250f5f5c232b',
   {  
     from: '0xCa5F7baE9682b147c89B363EC20aF3EF2c456cE4', 
     data: '0x608060405260008055600060015534801561001957600080fd5b5061019d806100296000396000f30060806040526004361061006d576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680637bdd472614610072578063d826f88f1461009d578063eb5bd8ba146100b4578063f3696a6d146100e1578063f4b7095b1461010e575b600080fd5b34801561007e57600080fd5b50610087610139565b6040518082815260200191505060405180910390f35b3480156100a957600080fd5b506100b2610143565b005b3480156100c057600080fd5b506100df60048036038101908080359060200190929190505050610154565b005b3480156100ed57600080fd5b5061010c6004803603810190808035906020019092919050505061015e565b005b34801561011a57600080fd5b50610123610168565b6040518082815260200191505060405180910390f35b6000600154905090565b600080819055506003600181905550565b8060008190555050565b8060018190555050565b600080549050905600a165627a7a72305820e25ef4f789089c07667e89cac3ea6cceaa6c6895db1f73419a63c483d7cfaaa30029', 
     gas: '4700000'
   }
 )

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


app.get('/set-points',(req, res, next) => {
	const points = req.query.points;
	console.log('Player send',points)
	contract.methods.setPoints(points)
	.send('0xCa5F7baE9682b147c89B363EC20aF3EF2c456cE4')
	.then(e=>{
		console.log('Point set',points)
		res.send(e)
	})
})

app.get('/add-points',(req, res, next) => {
	const points = req.query.points;
	console.log('Player send',points)
	contract.methods.getPoints().call()
	.then(totalPoints => {
		contract.methods.setPoints(parseInt(totalPoints)+parseInt(points))
		.send('0xCa5F7baE9682b147c89B363EC20aF3EF2c456cE4')
		.then(e=>{
			console.log('Point set',points)
			res.send(e)
		})
	})
})

app.get('/set-lives',(req, res, next) => {
	const lives = req.query.lives;
	console.log('Player lives',lives)
	contract.methods.setLives(lives)
	.send('0xCa5F7baE9682b147c89B363EC20aF3EF2c456cE4')
	.then(e=>{
		console.log('Point set',lives)
		res.send(e)
	})
})

app.get('/reduce-life',(req, res, next) => {
	// const lives = req.query.lives;
	// console.log('Player send',points)
	contract.methods.getLives().call()
	.then(lives => {
		contract.methods.setLives(--parseInt(lives))
		.send('0xCa5F7baE9682b147c89B363EC20aF3EF2c456cE4')
		.then(e=>{
			console.log('Lives set',lives)
			res.send(e)
		})
	})
})



app.get('/get-points',(req, res, next) => {
	contract.methods.getPoints().call().then(e => res.send(e))
})

app.get('/get-lives',(req, res, next) => {
	contract.methods.getLives().call().then(e => res.send(e))
})

app.get('/reset',(req, res, next) => {
	contract.methods.setLives(3).send('0xCa5F7baE9682b147c89B363EC20aF3EF2c456cE4').then(e => res.send(e))
})

console.log(contract.methods)

app.listen(3000)



// web3.eth.getAccounts().then(e=>{console.log(e)})


// var contract = new web3.eth.Contract(
//    [{"constant":true,"inputs":[],"name":"getLives","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"reset","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_points","type":"uint256"}],"name":"setPoints","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_lives","type":"uint256"}],"name":"setLives","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPoints","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}],
//    {  
//      from: '0xCa5F7baE9682b147c89B363EC20aF3EF2c456cE4', 
//      data: '0x608060405260008055600060015534801561001957600080fd5b5061019d806100296000396000f30060806040526004361061006d576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680637bdd472614610072578063d826f88f1461009d578063eb5bd8ba146100b4578063f3696a6d146100e1578063f4b7095b1461010e575b600080fd5b34801561007e57600080fd5b50610087610139565b6040518082815260200191505060405180910390f35b3480156100a957600080fd5b506100b2610143565b005b3480156100c057600080fd5b506100df60048036038101908080359060200190929190505050610154565b005b3480156100ed57600080fd5b5061010c6004803603810190808035906020019092919050505061015e565b005b34801561011a57600080fd5b50610123610168565b6040518082815260200191505060405180910390f35b6000600154905090565b600080819055506003600181905550565b8060008190555050565b8060018190555050565b600080549050905600a165627a7a72305820e25ef4f789089c07667e89cac3ea6cceaa6c6895db1f73419a63c483d7cfaaa30029', 
//      gas: '4700000'
//    }
//  )

//  contract.deploy().send();


 // contract.methods.getPoints().call().then(e=>console.log(e))
 // contract.methods.setPoints(50).send('0x7c5e025b4165aeedf6aebc36342f0385ee90d123').then(e=>console.log(e))
 // console.log(contract.methods)