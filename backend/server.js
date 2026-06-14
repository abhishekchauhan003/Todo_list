const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Todo = require('./models/Todo');
const Alarm = require('./models/Alarm');
const Note = require('./models/Note');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    
    serverSelectionTimeoutMS: 5000,
    family: 4
})
.then(() => console.log('MongoDB Connected Successfully'))
.catch(err => console.error('MongoDB Connection Error:', err));


// ---------- TODO ROUTES ----------

app.get('/api/todos', async (req, res) => {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
});

app.post('/api/todos', async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.json(newTodo);
});

app.put('/api/todos/:id', async (req, res) => {
    const updated = await Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(updated);
});

app.delete('/api/todos/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});


// ---------- ALARM ROUTES ----------

app.get('/api/alarms', async (req, res) => {
    const alarms = await Alarm.find();
    res.json(alarms);
});

app.post('/api/alarms', async (req, res) => {
    const newAlarm = new Alarm(req.body);
    await newAlarm.save();
    res.json(newAlarm);
});

app.delete('/api/alarms/:id', async (req, res) => {
    await Alarm.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});


// ---------- NOTE ROUTES ----------

app.get('/api/note', async (req, res) => {
    let note = await Note.findOne();

    if (!note) {
        note = new Note({ content: "" });
        await note.save();
    }

    res.json(note);
});

app.put('/api/note', async (req, res) => {
    let note = await Note.findOne();

    if (note) {
        note.content = req.body.content;
        await note.save();
    } else {
        note = new Note({
            content: req.body.content
        });

        await note.save();
    }

    res.json(note);
});


// ---------- SERVER ----------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});