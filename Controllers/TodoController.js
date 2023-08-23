
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.uri; // Update this with your actual MongoDB URI

async function connectToDatabase() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('toDoList').collection('Tasks');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

// add task 


const addNewTask = async (req, res) => {
  try {
    const newTask = req.body;
    const result = await req.toDoCollection.insertOne(newTask);

    if (result.insertedId) {
      console.log('Task added:', newTask);

      const addedTask = { ...newTask, _id: result.insertedId }; // Include the inserted ID
      res.status(201).json({ message: 'Task added successfully', task: addedTask });
    } else {
      res.status(500).json({ message: 'Error adding Task' });
    }
  } catch (error) {
    console.error('Error adding Task:', error);
    res.status(500).json({ message: 'An error occurred while adding the Task' });
  }
};




// Retrieve all Task from the collection
const getAllTask = async (req, res) => {
  try {
    const Task = await req.toDoCollection.find({}).toArray();
    res.json(Task);
  } catch (error) {
    console.error('Error retrieving Task:', error);
    res.status(500).json({ message: 'An error occurred while retrieving Task' });
  }
};

const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id; // Use consistent variable naming (camelCase)
    const query = { _id: new ObjectId(taskId) };
    const task = await req.toDoCollection.findOne(query); // Use req.toDoCollection

    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    console.error('Error retrieving Task:', error);
    res.status(500).json({ message: 'An error occurred while retrieving the Task' });
  }
};


// Update the details of a Task
const updateTaskById = async (req, res) => {
  try {
    const TaskId = req.params.id;
    const query = { _id: new ObjectId(TaskId) };
    const update = { $set: req.body };

    const result = await req.TaskCollection.updateOne(query, update);

    if (result.matchedCount > 0) {
      res.json({ message: 'Task details updated successfully' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    console.error('Error updating Task:', error);
    res.status(500).json({ message: 'An error occurred while updating the Task' });
  }
};

// Delete a Task from the collection
const deleteTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const query = { _id: new ObjectId(taskId) };

    const result = await req.toDoCollection.deleteOne(query); // Use req.toDoCollection

    if (result.deletedCount > 0) {
      res.json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    console.error('Error deleting Task:', error);
    res.status(500).json({ message: 'An error occurred while deleting the Task' });
  }
};


module.exports = {
  addNewTask,
  getAllTask,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
