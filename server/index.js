const Koa = require('koa');
const Router = require('@koa/router');
const fs = require('node:fs/promises');
const getRawBody = require('raw-body');
const { koaBody } = require('koa-body');

const app = new Koa();
const router = new Router();

router.post('/upload/file', async (ctx, next) => {
  console.log('here');

  console.log(ctx.request.headers);
  const [type, ext] = ctx.request.type.split('/');
  const fileExtension = type === 'image' ? ext : 'blah';

  const buffer = await getRawBody(ctx.req);

  console.log('read');

  await fs.writeFile(
    `${__dirname}/uploads/file.${fileExtension}`,
    buffer,
  );

  ctx.status = 200;
});

const fn = (x) => {
  console.log('x', x);
  return 'test';
}

router.post('/upload/formdata', koaBody({ multipart: true, formidable: { uploadDir: './uploads', keepExtensions: true }}), async (ctx) => {
  console.log('non-file fields', ctx.request.body);

  const fileKeys = Object.keys(ctx.request.files);

  if (fileKeys.length > 0) {
    fileKeys.forEach((fileKey) => {
      const file = ctx.request.files[fileKey];
      console.log('file', file.originalFilename);
    });
  } else {
    console.log('no files');
  }

  ctx.status = 200;
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3030);
