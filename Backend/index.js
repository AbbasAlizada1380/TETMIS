import express from 'express';
import memberRoute from './routes/memberRoute.js';
import sequelize from './config/database.js';
import mysql from 'mysql2/promise'
import cors from 'cors'
import massageRouter from './routes/massageRoute.js';
import expenseRouter from './routes/expenseRout.js';
import IncomesRouter from './routes/IncomesRoute.js';

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Test connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

  // Sync all models with the database
sequelize.sync({ alter: true }) // `alter: true` updates table structure in development
.then(() => console.log('Database synchronized'))
.catch((error) => console.error('Error synchronizing the database:', error));

app.use('/member', memberRoute); // Base route for members
app.use('/message',massageRouter)
app.use('/expense',expenseRouter)
app.use('/income',IncomesRouter)



// Simple Home Route
app.get('/', (req, res) => {
  res.send('Welcome to my ES6 Express server!');
});



// 404 Route
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
 
});
