const express = require('express');

const app = express();

const fs = require('fs');

const path = require('path');

const uuid = require('uuid/v4');

const bodyParser = require('body-parser');

app.use('/', express.static('public'));
app.use(bodyParser.json());

const saveExperiment = (id, data) => {
  const dir = `./data/${id.split('-')[0]}`;
  const file = `${dir}/${id}.json`;

  if (!fs.existsSync(dir)) fs.mkdir(dir, { recursive: true });

  fs.writeFile(file, data, (err) => {
    if (err) console.log(err);
    else console.log(`Successfully saved experiment ${file}`);
  });
};

const getFiles = (dir) => {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir).reduce((files, file) => {
    const name = path.join(dir, file);
    const isDir = fs.statSync(name).isDirectory();
    const nestedFiles = isDir ? getFiles(name) : [name];
    console.log(nestedFiles);
    console.log(name);
    return [...files, ...nestedFiles];
  }, []);
};

const experiments = {
  '000': 0,
  '001': 0,
  '010': 0,
  '011': 0,
  100: 0,
  101: 0,
  110: 0,
  111: 0,
};

const loadExperiments = () => {
  const base = './data';
  for (const key in experiments) {
    experiments[key] = getFiles(`${base}/${key}/`).length;
  }
};

loadExperiments();

app.put('/experiment/:id', (req, res) => {
  console.log(`Got PUT for ${JSON.stringify(req.params)}`);
  console.log(req.body);
  saveExperiment(req.params.id, JSON.stringify(req.body));
  res.write('');
});

// Decides the next experiment to run
app.post('/experiment', (req, res) => {
  console.log('Client requested experiment');
  let clientExperiment;
  let times = experiments['011'] + 1; // Last index

  for (const key in experiments) {
    console.log(key);
    if (experiments[key] < times) {
      clientExperiment = key;
      times = experiments[key];
      break;
    }
  }

  experiments[clientExperiment] += 1;

  const label = clientExperiment.charAt(0) === '1';
  const agent = clientExperiment.charAt(1) === '1';
  const explanation = clientExperiment.charAt(2) === '1';

  const id = `${clientExperiment}-${uuid().substring(0, 8)}`;
  console.log(id);
  const experiment = {
    id,
    experiment: clientExperiment,
    label,
    agent,
    explanation,
  };
  res.send(experiment);
});

app.listen(3000, () => console.log('Listening on port 3000'));
