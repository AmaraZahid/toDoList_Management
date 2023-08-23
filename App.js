// const express = require ('express');
// const MongoClient = require('mongodb');
// const dotenv = require ('dotenv');
// const app=express();
// const todoController = require ('./Controllers/TodoController.js');
// const port= 4500;

// dotenv.config;

// app.use(express.json());

// const client = new MongoClient(process.env.uri, { useNewUrlParser: true, useUnifiedTopology: true });


// async function startServer() {
//     try {
//       await client.connect();
//       console.log('Connected to MongoDB');
  
//       const db = client.db('toDoList');
//       const toDoCollection = db.collection('Tasks');
//   // Attach todoCollection to req object
//           app.use((req, res, next) => {
//               req.TasksCollection = taskssCollection;
//               next();
//           });

//           app.post('/addTask', libController.addNewTask);
//           app.get('/allTask', libController.getAllTask);
//           app.get('/taskByID/:id', libController.getTaskById);
//           app.patch('/updateTask/:id', libController.updateTaskById);
//           app.delete('/delTask/:id', libController.deleteTaskById);


//           app.listen(port, () => {
//             console.log(`Server is listening at http://localhost:${port}`);
//           });
//         } catch (error) {
//           console.error('Error connecting to MongoDB:', error);
//         }
//       }
      
//       startServer();
      


// const express = require('express');
// const { MongoClient } = require('mongodb');
// const dotenv = require('dotenv');
// const todoController = require ('./Controllers/TodoController.js');
// const todoRoutes = require ('./Routes/todoRoutes.js')
// const app = express();
// const port = 4500;

// dotenv.config();

// app.use(express.json());

// const client = new MongoClient(process.env.uri, { useNewUrlParser: true, useUnifiedTopology: true });


// app.use(async (req, res, next) => {
//     req.toDoCollection = toDoCollection;
//     next();
//   });
  

// async function startServer() {
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB');

//     const db = client.db('toDoList');
//     const toDoCollection = db.collection('Tasks');
    

//     // Use the route file
//     app.use('/api', todoRoutes); // You can use any base path you prefer, like '/api' or '/todos'

//     app.listen(port, () => {
//       console.log(`Server is listening at http://localhost:${port}`);
//     });
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//   }
// }

// startServer();

const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const todoRoutes = require('./Routes/todoRoutes');

const app = express();
const port = 4500;

dotenv.config();

app.use(express.json());

async function startServer() {
  try {
    const client = new MongoClient(process.env.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('toDoList');
    const toDoCollection = db.collection('Tasks');

    app.use(async (req, res, next) => {
      req.toDoCollection = toDoCollection;
      next();
    });

    app.use('/api', todoRoutes);

    app.listen(port, () => {
      console.log(`Server is listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

startServer();
