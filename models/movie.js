const mongoose = require('mongoose');
const validator = require('validator');

const MovieSchema = new mongoose.Schema(
  {
    country: { // страна создания фильма
      type: String,
      required: true,
    },

    director: { // режиссёр фильма
      type: String,
      required: true,
    },

    duration: { // длительность фильма
      type: Number,
      required: true,
    },

    year: { // год выпуска фильма
      type: String,
      required: true,
    },

    description: { // описание фильма
      type: String,
      required: true,
    },

    image: { // ссылка на постер к фильму
      type: String,
      required: true,
      validate: {
        validator: (url) => validator.isURL(url),
        message: 'Неверный URL',
      },
    },

    trailerLink: { // ссылка на трейлер фильма
      type: String,
      required: true,
      validate: {
        validator: (url) => validator.isURL(url),
        message: 'Неверный URL',
      },
    },

    thumbnail: { // миниатюрное изображение постера к фильму
      type: String,
      required: true,
      validate: {
        validator: (url) => validator.isURL(url),
        message: 'Неверный URL',
      },
    },

    owner: { // _id пользователя, который сохранил фильм
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },

    movieId: { // id фильма, который содержится в ответе сервиса MoviesExplorer
      type: Number,
      required: true,
    },

    nameRU: { // название фильма на русском языке
      type: String,
      required: true,
    },

    nameEN: { // название фильма на английском языке
      type: String,
      required: true,
    },
  },

  // удаляем версию внутри объекта:
  // https://stackoverflow.com/questions/12495891/what-is-the-v-field-in-mongoose
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', MovieSchema);
