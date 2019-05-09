const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req, res, next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type' , 'text/plain');
	next();
})
.get((req,res,next) => {
	res.end('We are sending the promotions to you')
})
.post((req,res,next) => {
	res.end('We will add the promo ' + req.body.name)
})
.put((req,res,next) => {
	res.statusCode = 403;
	res.end('Put method is not supported on /promotions')
})
.delete((req,res,next) => {
	res.end('Deleting the promotions')
});

promoRouter.route('/:promoId')
.all((req, res, next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type' ,  'text/plain');
	next();
})
.get((req,res,next) => {
	res.end('We are sending the promo:' + req.params.promoId + ' to you ')
})
.post((req,res,next) => {
	res.statusCode = 403;
	res.end('Post is not supported on /promotions/' +req.params.promoId)
})
.put((req,res,next) => {
	res.write('Updating the promo' + req.params.promoId+ '\n');
	res.end('Will update the promo' + req.body.name + 'to the order and '  + req.body.description )
})
.delete((req,res,next) => {
	res.end('Deleting promo: ' + req.params.promoId)
});

module.exports = promoRouter;

