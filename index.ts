import express, { Request, Response } from 'express';
import router from './src/router/router';
import { getLocalExternalIPv4 } from './src/lib/getIPv4';
const app = express();
const path = '0.0.0.0';
const port = 3000;

app.use(express.json());
app.use('/api', router);

app.listen(port, path, () => {
    const networkIpv4 = getLocalExternalIPv4();
    console.log(
        `         Server running on :
         Local:   127.0.0.1:${port}
         Network: ${networkIpv4}:${port}`
    );
}); 
