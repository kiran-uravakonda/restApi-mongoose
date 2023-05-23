var express = require('express');
var app = express()
var bodyParser = require('body-parser');
var router = express.Router();
router.use(bodyParser.json());
var mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var dishes = require('./dishes.js')



router.route('/')
    .get((req, res) => {
        dishes.find({})
            .then((result) => {
                res.send(result)
            })
            .catch((err) => {
                res.send(err)
            })


    })

    .post((req, res) => {
        dishes.create(req.body)
            .then((result) => {
                res.send(result)
            })
            .catch((err) => {
                res.send(err)
            })
    })

    .delete((req, res) => {
        dishes.findOneAndRemove()
            .then((result) => {
                res.send(result)
            })
            .catch((err) => {
                res.send(err)
            })
    })

router.route('/:id')
    .get((req, res) => {
        dishes.findById(req.params.id)

            .then((result) => {
                // var ids=result._id.toString();
                // console.log(ids)
                // console.log(typeof ids)
                // console.log(req.params.id)
                // console.log(typeof req.params.id)
                // console.log(ids==req.params.id)
                // if(ids==req.params.id)
                // {
                //     res.send(result)
                // }

                // else
                // {
                //    console.log("not found")
                // }

                res.send(result)
            })

            .catch((err) => {
                res.send(err)
            })
    })


    .put((req, res) => {
        dishes.findByIdAndUpdate(req.params.id, {
            $set: req.body
        })
            .then((result) => {

                res.send(result)
            })

            .catch((err) => {
                res.send(err)
            })
    })


    .delete((req, res) => {
        dishes.findByIdAndRemove(req.params.id)
            .then((result) => {

                res.send(result)
            })

            .catch((err) => {
                res.send(err)
            })
    })


router.route('/:id/comments')
    .get((req, res) => {
        dishes.findById(req.params.id)
            .then((result) => {

                if (result != null) {
                    res.send(result.comments)
                }

                else {
                    res.sendStatus(400)
                }
            })

            .catch((err) => {
                res.send(err)
            })
    })


    .post((req, res) => {
        dishes.findById(req.params.id)
            .then((result) => {

                if (result != null) {
                    result.comments.push(req.body)
                    result.save()
                        .then((result) => {
                            res.send(result)
                        })

                }


                else {
                    res.sendStatus(400)
                }
            })

            .catch((err) => {
                res.send(err)
            })
    })


    .delete((req, res) => {
        dishes.findById(req.params.id)
        .then((dish) => {
            if (dish != null) {
                for (var i = (dish.comments.length -1); i >= 0; i--) {
                    dish.comments.id(dish.comments[i]._id).remove();
                }
               dish.save()
                            .then((dish) => {
                                res.send(dish)
                            })
            }
             else {
                        console.log("id not found")
                    }
        })
       .catch((err) => {
                    res.send(err)    
    });
})


router.route('/:id/comments/:commentId')
.get((req, res) => {
dishes.findById(req.params.id)
.then((result) => {

    if (result != null) {
        res.send(result.comments.id(req.params.commentId))
        console.log(result.comments.id)
        console.log(req.params.commentId)
    }

    else {
        res.sendStatus(400)
    }
})

.catch((err) => {
    res.send(err)
})
})




.delete((req, res) => {
	dishes.findById(req.params.id)
    .then(async (dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
           dish.comments.id(req.params.commentId).remove();
            // dish.remove(dish.comments.id(req.params.commentId))
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);                
            });
        }
        else if (dish == null) {
            console.log("dishid not found")
        }
        else {
           console.log("commentId not found")     
        }
    })
    .catch((err) => {
	console.log(err)});
});

module.exports = router;