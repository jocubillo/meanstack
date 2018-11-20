const express = require('express'); 
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');

const db = "mongodb://jethro:pass123@ds133621.mlab.com:33621/videoplayer_jethro";
mongoose.Promise = global.Promise; //avoid any warnings from mongoose
mongoose.connect(db, function(err){
    if(err){
        console.log('Error! ' + err);
    }
});

//any incoming requests send back a string
router.get('/', function(req,res){
    res.send('api works');
});

router.get('/videos', function(req,res){
    console.log('Get request for all videos');
    Video.find({})
        .exec(function(err, videos){
            if( err ){
                console.log('Error retrieving videos : ' + err);
            }else{
                res.json(videos);
            }
        });
});

router.get('/videos/:id', function(req,res){
    console.log('Get request for a single video');
    Video.findById(req.params.id)
        .exec(function(err,video){
            if( err ){
                console.log('Error retrieving video : ' + err);
            }else{
                res.json(video);
            }
        });
});

router.post('/video', function(req,res){
    console.log('Post a video');
    var newVideo = new Video();
    newVideo.title = req.body.title;
    newVideo.url = req.body.url;
    newVideo.description = req.body.description;

    newVideo.save(function(err,insertedVideo){
        if( err ){
            console.log('Error saving video : ' + err);
        }else{
            res.json(insertedVideo);
        }
    });
});

router.put('/video/:id', function(req,res){
    console.log('Update a video');

    Video.findByIdAndUpdate(
        req.params.id,
        {
            $set : {
                title : req.body.title,
                url: req.body.url,
                description: req.body.description
            }
        },
        {
            new: true //if true returns updatedVideo new content, else original content
        },
        function(err,updatedVideo){
            if( err ){
                res.send('Error updating video');
            }else{
                res.json(updatedVideo);
            }
        }
    );
});

router.delete('/video/:id', function(req,res){
    console.log('Deleting a video');
    Video.findByIdAndRemove(req.params.id, function(err,deletedvideo){
        if( err ){
            res.send('Error deleting video');
        }else{
            res.json(deletedvideo);
        }
    });
});

module.exports = router;