const mongoose = require('mongoose');

const configDbMongo = mongoose.connect(`mongodb://localhost/miniProjects`, {
  useNewUrlParser: true,
});

mongoose.Promise = global.Promise;


export default configDbMongo;

