import './config.mjs';
import './db.mjs';
import session from 'express-session';
import mongoose from 'mongoose';
import express from 'express';
const app = express();
const Review = mongoose.model('Review');

import url from 'url';
import path from 'path';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.DSN).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Error connecting to MongoDB:", err);
});

app.use(session({
  secret: 'shhh secret', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.use((req, res, next) => {
  if (req.url === '/stylesheets/styles.css') {
    return next();
  }
  if (!req.session.pageCount) {
    req.session.pageCount = 1; 
  } else {
    req.session.pageCount += 1; 
  }

  res.locals.pageVisits = req.session.pageCount; 
  next();
});

app.get('/', (req, res) => {

  const query = {};
  if (req.query.semester) {
    query.semester = req.query.semester;
  }
  if (req.query.year) {
    query.year = parseInt(req.query.year); 
  }
  if (req.query.professor) {
    query.professor = req.query.professor;
  }

  Review.find(query)
    .then(reviews => {
      console.log("fetched reviews", reviews);
      res.render('reviews', { reviews: reviews });
    })
    .catch(err => {
      console.error("Database error:", err);
      res.status(500).send('Error occurred: database error.');
    });
});

app.get('/reviews/add', (req, res) => {
  res.render('add-review');
});


app.post('/reviews/add', (req, res) => {
  const newReview = new Review({
    courseNumber: req.body.courseNumber,
    courseName: req.body.courseName,
    semester: req.body.semester,
    year: req.body.year,
    professor: req.body.professor,
    review: req.body.review,

  });

  newReview.save()
    .then(savedReview => {
      if (!req.session.myReviews) {
        req.session.myReviews = [];
      }
      req.session.myReviews.push(savedReview._id);

      res.redirect('/');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error saving the review');
    });
});

app.get('/reviews/mine', (req, res) => {
  const query = { '_id': { $in: req.session.myReviews || [] } };

  Review.find(query)
    .then(reviews => {
      res.render('my-reviews', { reviews });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error retrieving your reviews');
    });
});


app.listen(process.env.PORT || 3000);
