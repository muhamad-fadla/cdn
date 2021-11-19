import Fastify from 'fastify';
import FastifyStatic from 'fastify-static';
import FastifyCors from 'fastify-cors';
import FastifyCompress from 'fastify-compress';

import * as path from 'path';

const server = Fastify();


server.register(FastifyCors, {
	origin: [/\.sociality\.my.id$/, /\.my-topup\.store$/]
});

server.register(FastifyCompress, {
	global: true,
	encodings: ['deflate', 'gzip']
});

server.addHook('preHandler', (req, reply, done) => {
	if(req.url.includes('immutable')){
  		reply.header("Cache-Control", "public, max-age=604800, immutable");
	}else{
  		reply.header("Cache-Control", "public, max-age=604800");
	}

  	done();
});


server.get('/.hit', (req,res) => {
	res.status(200).send('ok');
})

server.register(FastifyStatic, {
	root: path.join(__dirname, './static')
});


server.listen(process.env.PORT || 8080, "0.0.0.0", (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});