const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
const body = `--${boundary}\r\nContent-Disposition: form-data; name="data"; filename="test.pdf"\r\nContent-Type: application/pdf\r\n\r\nfake-pdf-content\r\n--${boundary}\r\nContent-Disposition: form-data; name="filename"\r\n\r\ntest.pdf\r\n--${boundary}--`;

async function test() {
    try {
        console.log('Sending request to n8n webhook-test...');
        const res = await fetch('https://vyshnavms.app.n8n.cloud/webhook-test/resume-upload', {
            method: 'POST',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${boundary}`
            },
            body: body
        });
        console.log('Status Code:', res.status);
        const text = await res.text();
        console.log('Response Body:', text);
    } catch (e) {
        console.error('Error fetching:', e);
    }
}

test();
