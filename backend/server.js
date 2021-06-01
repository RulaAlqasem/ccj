const express = require('express')
const superagent = require('superagent');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors())

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;


const animeSchema = new Schema({
  slug: {
    type: 'string',
    unique: true,
    trim: true,
    lowercase: true,
  },
  image: String,
  title: String,
  description: String,
  score: String,
});
const AnimeModel = mongoose.model('AnimeModal', animeSchema);

const PORT = process.env.PORT || 3060;
app.get('/', (req, res) => {
  res.send('hi from back end')
});


app.get('/anime', (req, res) => {
  const url = `https://api.jikan.moe/v3/search/anime`
  const bodyreq = {
    q: req.query.q,
    limit: 10
  }
  superagent.get(url).query(bodyreq).then(ele => {
    const dataArr = ele.body.results.map(data => new Anime(data))
    res.send(dataArr)
  }).catch(err => { console.log(err) })
});


class Anime {
  constructor(data) {
    this.image = data.image_url;
    this.title = data.title;
    this.description = data.synopsis;
    this.score = data.score;
  }
}

//------------------------------crud
app.get('/anime/fav', (req, res) => {
  AnimeModel.find({}, (err, data) => {
    res.send(data)
  })

});


app.post('/anime/fav', (req, res) => {
  const {
    image,
    title,
    description,
    score,
  } = req.body;
  const slug = title.split(' ').join('-');
  AnimeModel.find({ slug: slug }, (err, data) => {
    if (data.lengt > 0) {
      res.send('already exists');
    } else {
      const newAnime = new AnimeModel({
        image: image,
        title: title,
        description: description,
        score: score,
        slug: slug
      })
      newAnime.save();
      res.send(newAnime)
    }

  })
});

app.delete('/anime/fav/:slug', (req, res) => {
  const slug = req.params.slug;
  AnimeModel.remove({ slug: slug }, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      AnimeModel.find({}, (err, data) => {
        res.send(data)
      })
    }
  })
});

app.put('/anime/fav/:slug', (req, res) => {
  const slug = req.params.slug;
  const {

    title,
    description,
    score,
  } = req.body;
  AnimeModel.find({ slug: slug }, (err, data) => {
    if (err) {
      res.send(err);
    } else {

      data[0].title = title,
        data[0].description = description
      data[0].score = score;


      data[0].save();
      res.send(data)
    }
  })
});


app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});