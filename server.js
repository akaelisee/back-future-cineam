// @ts-nocheck
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./config/connections'); 
const fileUpload = require('express-fileupload');
const apiRouter = require('./src/routes/apiRoutes');
const cookieParser = require('cookie-parser');


const app = express();

app.use('/public', express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({useTempFiles: true}));

app.use('/', apiRouter);

const port = process.env.PORT || 3306;
app.listen(port, function() {
    console.log('Server lauched on ' + port );
});
