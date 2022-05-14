const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const mongo = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
dotenv.config();

mongo.connectDB();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Api is running');
});

app.use('/api/users', userRoutes);

//?CUSTOM ERROR HANDLING
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => console.log('server is running'));
