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
                <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,viewport-fit=cover">
                <body>
                    <div></div><button>复制</button>
                </body>
                <script>
                    const udid = new URLSearchParams(location.search).get('udid');
                    document.querySelector('div').innerText = '您的udid为：' + udid;
                    function copyText(text) {
                        if (!text) {
                            return false
                        }
                        const textarea = document.createElement('textarea')
                        textarea.id = 'tempTarget'
                        textarea.style.opacity = '0'
                        textarea.style.width = '200px'
                        textarea.style.position = 'absolute'
                        textarea.style.left = '-1000px'
                        textarea.innerText = text
                        document.body.appendChild(textarea)
                        // 赋值
                        textarea.value = text
                        // 选中
                        textarea.select()
                        // 复制
                        document.execCommand('copy', true)
                        // 移除输入框
                        document.body.removeChild(textarea)
                        return true
                    }
                    copyText(udid);
                    document.querySelector('button').addEventListener('click', function() {
                        copyText(udid);
                        alert('复制成功')
                    })
                </script>
            </html>`;
    next();
})


app.use(router.routes());

app.listen(9000);
