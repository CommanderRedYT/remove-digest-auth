import http from 'http';
import request from 'request';

const proxy_for = process.env['PROXY_URL'];

// http server that proxies requests to the proxy server and authenticates with digest auth

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
}).listen(process.env['HTTP_PORT'] || 8080, '127.0.0.1');
