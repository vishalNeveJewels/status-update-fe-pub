const express = require('express');
const path = require('path');
const app = express();
if (process.env.NODE_ENV === 'DEV') {
  const dotenv = require('dotenv').config();
}
app.set('port', process.env.FE_PORT || 3000);

console.log('process.env.VITE_BASE_URL', process.env.VITE_BASE_URL);

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(app.get('port'), () => {
  console.log(`Server is running on http://localhost:${app.get('port')}`);
});
