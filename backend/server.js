
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const alunoRoutes = require('./routes/alunoRoutes');

dotenv.config();

connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/alunos', alunoRoutes);

app.get('/', (req, res) => {
  res.send('LiftHub API is running...');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

