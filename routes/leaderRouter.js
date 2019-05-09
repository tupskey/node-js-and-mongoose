const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req, res, next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type' , 'text/plain');
	next();
})
.get((req,res,next) => {
	res.end('We will send the  details of the leaders to you')
})
.post((req,res,next) => {
	res.end('We will add the leader ' + req.body.name)
})
.put((req,res,next) => {
	res.statusCode = 403;
	res.end('Put is not supported on /leaders')
})
.delete((req,res,next) => {
	res.end('Deleting the leaders')
});

leaderRouter.route('/:leaderId')
.all((req,res,next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type' , 'text/plain');
	next();
})
.get((req,res,next) => {
	res.end('we are goin to send leader:' + req.params.leaderId)
})
.post((req,res,next) => {
	res.statusCode = 403;
	res.end('Post is not supported on leader' + req.params.leaderId)
})
.put((req,res,next) => {
	res.write('We are updating the leader ' + req.params.leaderId + '\n');
	res.end('will update the leader' + req.body.name)
})
.delete((req,res,next) => {
	res.end('Deleting the leader' + req.params.leaderId)
});

module.exports = leaderRouter;
