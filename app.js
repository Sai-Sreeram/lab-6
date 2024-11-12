const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const applicationSchema = new mongoose.Schema({
  company: String,
  position: String,
  date: String,
  status: String
});
const Application = mongoose.model('Application', applicationSchema);

app.get('/', (req, res) => res.render('index'));

app.get('/api/applications', async (req, res) => {
  const applications = await Application.find();
  res.json(applications);
});

app.post('/api/applications', async (req, res) => {
  const { company, position, date, status } = req.body;
  const newApplication = new Application({ company, position, date, status });
  await newApplication.save();
  res.json({ message: 'Application added!' });
});

app.put('/api/applications/:id', async (req, res) => {
  const { status } = req.body;
  await Application.findByIdAndUpdate(req.params.id, { status });
  res.json({ message: 'Status updated!' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
