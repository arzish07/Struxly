const https = require('https');
const fs = require('fs');

function downloadFile(url, dest) {
    https.get(url, (res) => {
        if (res.statusCode === 302 || res.statusCode === 301) {
            // follow redirect
            downloadFile(res.headers.location, dest);
            return;
        }
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => { file.close(); console.log(`Downloaded ${dest}`); });
    }).on('error', (err) => {
        fs.unlink(dest, () => { });
        console.error(`Error downloading ${dest}: ${err.message}`);
    });
}

downloadFile('https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2QyYjEyNGZiODNiNDQyNzdhNWY4NWQzZTE2YjhlNDhlEgsSBxCO1qWCzBIYAZIBIwoKcHJvamVjdF9pZBIVQhM3MTUyNjI3MzU5MDMyODg1Mzg4&filename=&opi=96797242', 'nexus-flow/stitch-dashboard.html');
downloadFile('https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2I0ZGUyMzE2NzI0NzQwOGE4NGQyMGI5M2EwNzMzM2MyEgsSBxCO1qWCzBIYAZIBIwoKcHJvamVjdF9pZBIVQhM3MTUyNjI3MzU5MDMyODg1Mzg4&filename=&opi=96797242', 'nexus-flow/stitch-pricing.html');
