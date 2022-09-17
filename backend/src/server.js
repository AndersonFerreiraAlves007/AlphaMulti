const GlobalData = require('./infra/data/global');

require('dotenv').config();
require('./infra/websockets/ws');
require('./infra/cronJobs/index');

/* console.log('lalalal', GlobalData.ws); */
