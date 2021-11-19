"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastify_static_1 = __importDefault(require("fastify-static"));
const fastify_cors_1 = __importDefault(require("fastify-cors"));
const fastify_compress_1 = __importDefault(require("fastify-compress"));
const path = __importStar(require("path"));
const server = (0, fastify_1.default)();
server.register(fastify_cors_1.default, {
    origin: [/\.sociality\.my.id$/, /\.my-topup\.store$/]
});
server.register(fastify_compress_1.default, {
    global: true,
    encodings: ['deflate', 'gzip']
});
server.addHook('preHandler', (req, reply, done) => {
    reply.header("Cache-Control", "public, max-age=604800");
    done();
});
server.get('/.hit', (req, res) => {
    res.status(200).send('ok');
});
server.register(fastify_static_1.default, {
    root: path.join(__dirname, './static')
});
server.listen(process.env.PORT || 8080 /**, "0.0.0.0" */, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
