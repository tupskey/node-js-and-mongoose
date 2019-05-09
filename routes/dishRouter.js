const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req, res, next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type' , 'text/plain');
	next();
})
.get((req, res, next) => {
	res.end('We are goin to send the dishes to you');
})

.post((req, res, next) => {
	res.end('Will add the dish: ' + req.body.name + ' and the details ' + req.body.description);
})

.put((req,res,next) => {
	res.statusCode = 403;
	res.end('Put operation not supported on /dishes');
})
.delete((req,res,next) => {
	res.end('Deleting all the dishes')
});

dishRouter.route('/:dishId')
.all((req,res,next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type' , ' text/plain');
	next();
})
.get((req, res, next) => {
	res.end('We are goin to send the dish:'  + req.params.dishId + ' to you ');
})
.post((req, res, next) => {
	res.end('Will add the dishId: ' + req.body.name + ' and the details ' + req.body.description)
})
.put((req, res, next) => {
	res.statusCode = 403;
	res.end('Put operation not supported on /dishId');
})
.delete((req, res, next) => {
	res.end('Deleting the dish');
})


module.exports = dishRouter;   

