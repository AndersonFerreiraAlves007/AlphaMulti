if(process.env.NODE_ENV !== 'production') require('dotenv').config()
const express = require('express');
const app = express();
const port = 3001;

app.get('/src/utils/constants.js', (req, res) => {
  res.append('Content-Type', 'application/javascript; charset=UTF-8');
  res.send(
      `
        const HOST_API = "${process.env.HOST_API}";
        const isSsl = ${process.env.NODE_ENV === 'production' ? 'true' : 'false'};
        export {
            HOST_API,
            isSsl
        }
      `
  )
})

app.use(express.static('./'));

app.listen(port, () => console.log(`listening on port: ${port}`));