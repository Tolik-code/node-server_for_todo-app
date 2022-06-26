import 'dotenv/config';
import express from 'express';

import cors from 'cors';

import { router as todosRouter } from './routes/todos.js';
import { router as authRouter } from './routes/auth.js';

const server = express();
server.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
server.use('/todos', express.json(), todosRouter)
server.use(express.json(), authRouter)

const PORT = process.env.PORT || '8080';

server.listen(PORT);










// server.options('/todos',(req, res) => {
//
//   res.end();
// })



// server.use(express.static(path.resolve('public')))
// server.use(express.urlencoded({extended: true}))

// server.post('/api',express.urlencoded({extended: true}), (req, res) => {
//   console.log(req.body)
// })


// server.use('/', (req, res) => {
//   res.end(path.resolve('public', 'error.html'));
// })


// const server =  http.createServer((req, res) => {
//   console.log(req)
//   if (req.url === '/registry') {
//     // fs.appendFile('./user-auth-data.json', {})
//     console.log('you try to registry');
//   }
//   if (req.url === '/login') {
//     // fs.
//     console.log('you try to registry');
//   }
//   res.end('Welcome')
// })
//
// server.listen(PORT, () => {
//   console.log(`Server start running on http://localhost:${PORT}`);
// })

// const terminal = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });
//
// const questionTerminal = (question, callback) => {
//     terminal.question(question, callback);
// }
//
// questionTerminal('Please enter name file: ', (name) => {
//     questionTerminal('Please enter type file: ', (type) => {
//         questionTerminal('Please enter value file: ', (value) => {
//             fs.writeFile(`./${name}.${type}`, value, (err) => {})
//             terminal.close();
//         })
//     })
// })
