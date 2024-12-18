const koa = require('koa');
const Router = require('@koa/router');
const convert = require('xml-js');
const fs = require('fs');

const app = new koa();

const router = new Router();


router.post('/tools/udid', async (ctx, next) => {

    function aa() {
        return new Promise((resolve, reject) => {
            // 获取原始请求体
            let rawBody = '';
            ctx.req.on('data', chunk => {
              rawBody += chunk;
            });
          
            ctx.req.on('end', () => {
                ctx.rawBody = rawBody;
                const obj = convert.xml2js(ctx.rawBody.match(/<dict>[\s\S]*<\/dict>/)[0], {compact: true});
                const a = obj.dict.key.findIndex(item => item._text === 'UDID')
                ctx.status = 301;
                ctx.redirect(`/show?udid=${obj.dict.string[a]._text}`);
                ctx.body = 'Redirecting to shopping cart';
                resolve(true)
            });
        })
    }

    await aa();
    next();

})

router.get('/show', (ctx, next) => {
    ctx.status = 200;
    ctx.set('content-type', 'text/html');
    ctx.body=`<html>
                <meta charset="utf-8">
                <body>
                    <div></div>
                </body>
                <script>
                    const udid = new URLSearchParams(location.search).get('udid');
                    document.querySelector('div').innerText = '您的udid为：' + udid;
                </script>
            </html>`;
    next();
})

router.get('/config', (ctx, next) => {
    const file = fs.readFileSync('./udid.mobileconfig') 
    ctx.set('content-type', 'application/x-apple-aspen-config');
    ctx.set('Content-disposition', `attachment;filename=udid.mobileconfig`);
    ctx.body = file;
    next();
})


app.use(router.routes());

app.listen(9000);
