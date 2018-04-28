const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

//Local Storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString + file.originalname);
    }
});

    const fileFilter = (req, file, cb) => {
     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
         cb(null, true);
     } else {
         cb(null, false);
     }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const Album = require('../models/album');

router.get('/', (req, res, next) => {
    Album.find()
        .select('fName lName phone _id albumImage')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                albums: docs.map(doc => {
                    return {
                        fName: doc.fName,
                        lName: doc.lName,
                        phone: doc.phone,
                        albumImage: doc.albumImage,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: 'http://localhost:3100/albums/' + doc._id
                        }
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', upload.single('albumImage'), (req, res, next) => {
    const album = new Album({
        _id: new mongoose.Types.ObjectId(),
        fName: req.body.fName,
        lName: req.body.lName,
        phone: req.body.phone,
        albumImage: req.file.path
    });
    album
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Album created",
                createdAlbum: {
                    fName: result.fName,
                    lName: result.lName,
                    phone: result.phone,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3100/albums/' + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:albumId', (req, res, next) => {
    const id = req.params.albumId;
    Album.findById(id)
    .select('fName lName phone _id albumImage')
    .exec()
    .then(doc => {
        console.log('From database', doc);
        if(doc) {
            res.status(200).json({
                album: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3100/albums'
                }
            });
        } else {
            res
            .status(404)
            .json({ message: 'Unable to get'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.delete('/:albumId', (req, res, next) => {
    const id = req.params.albumId;
    Album.remove({ _id: id })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Album deleted",
            request: {
                type: 'POST',
                url: 'http://localhost:3100/albums',
                body: { fName: 'String', lName: 'String', phone: 'Number'}
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

module.exports = router;