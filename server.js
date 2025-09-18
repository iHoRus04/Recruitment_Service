const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('database.json');
const middlewares = jsonServer.defaults();

// Lấy port từ environment variable hoặc dùng 3000
const port = process.env.PORT || 3000;

// Sử dụng các middleware mặc định (logger, static, cors và no-cache)
server.use(middlewares);

// Thêm CORS headers để cho phép truy cập từ frontend
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

// Thêm body parser cho POST, PUT, PATCH requests
server.use(jsonServer.bodyParser);

// Custom middleware để thêm timestamp khi tạo mới
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createAt = new Date().toISOString().replace('T', ' ').substr(0, 19);
  }
  next();
});

// Sử dụng router mặc định
server.use(router);

// Khởi chạy server
server.listen(port, '0.0.0.0', () => {
  console.log(`🚀 JSON Server đang chạy tại port ${port}`);
  console.log(`📊 Database: database.json`);
  console.log(`🌐 API endpoints:`);
  console.log(`   GET    /cities`);
  console.log(`   GET    /tags`);
  console.log(`   GET    /jobs`);
  console.log(`   GET    /companies`);
  console.log(`   GET    /cv`);
});