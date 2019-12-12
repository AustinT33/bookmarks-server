const express = require('express');
const bookmarks = require('./bookmarkData');
const logger = require('./logger')
const uuid = require('uuid/v4')

const bookmarkRouter = express.Router();
const bodyParser = express.json();

const serializeBookmark = bookmark => ({
    id: bookmark.id,
    url: bookmark.url,
    title: bookmark.title,
    rating: bookmark.rating,
    description: bookmark.description,
})

bookmarkRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        BookmarksService.getAllBookmarks(knexInstance)
            .then(bookmarks => {
                res.json(bookmarks.map(serializeBookmark))
            })
        .catch(next)
    })

    .post(bodyParser, (req,res, next) => {
        const { title, desc, url, rating } = req.body;
        const newBookmark = { title, desc, url, rating }

        if(!title) {
            logger.error('Title is required')
            return res
                .status(400)
                .send('Title required');
        }
        if(!desc) {
            logger.error('Description is required')
            return res
                .status(400)
                .send('Description required');
        }
        if(!url) {
            logger.error('Bookmark Url is required')
            return res 
                .status(400)
                .send('Bookmark URL required');
        }
        if(!rating) {
            logger.error('Rating is required')
            return res
                .status(400)
                .send('Rating required')
        }

        const ratings = [
            1, 2, 3, 4, 5
        ];

        if(!ratings.includes(rating)) {
            logger.error('A valid rating is required')
            return res
                .status(400)
                .send('Not a valid rating');
        }

        const id = uuid();
        const newBookmark = {
            id,
            title,
            desc,
            url,
            rating
        };
        bookmarks.push(newBookmark);
        logger.info(`Bookmark with id ${id} created`);
        res 
            .status(201)
            .location(`http://localhost:8000/bookmarks/${id}`)
            .json(newBookmark);

        res.send('All validation passed')
    })

    bookmarkRouter
        .route('/:id')
        .get((req, res) => {

        })
        .delete((req, res) => {

        })

module.exports = bookmarkRouter