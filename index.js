import http from 'http';
import request from 'request';

const proxy_for = process.env['PROXY_URL'];
const HTTP_PORT = process.env['HTTP_PORT'] || 8080;

// http server that proxies requests to the proxy server and authenticates with digest auth

console.log(`Proxying requests to ${proxy_for} on port ${HTTP_PORT}`);

http.createServer((req, res) => {
    const options = {
        url: `http://${proxy_for}${req.url}`,
        auth: {
            user: process.env['PROXY_USER'],
            pass: process.env['PROXY_PASS'],
            sendImmediately: false,
        }
    };
    req.pipe(request(options)).pipe(res);
}).listen(HTTP_PORT, '127.0.0.1');
