-> npm init -y -define node.js project add package.json
-> npm i express cors dotenv mongoose jsonwebtoken bcryptjs morgan helmet
-> npm i nodemon --save-dev

-> app.get('/', (req, res) => { ... });
This defines a route. It tells the server how to respond when it receives an HTTP GET request to the root URL (/).
-req (request): An object containing information about the incoming request.
-res (response): An object used to send a response back to the client.
-res.send('Hello World');: This sends the string "Hello World" back to the browser.

-> CORS Middleware
-CORS stands for Cross-Origin Resource Sharing. By default, web browsers block web pages from making API requests to a different domain (origin) than the one that served the page. This is a security feature called the Same-Origin Policy.

-The cors middleware solves this problem. It adds the necessary HTTP headers to your server's responses (like Access-Control-Allow-Origin: *) to tell the browser that it's safe to allow requests from other origins.

-import cors from 'cors';
app.use(cors()); // Allows requests from all origins


-> JSON Parser Middleware
-This middleware is built into Express and is crucial for handling modern APIs. When a client sends data to your server in the body of a request (typically with POST or PUT), it's often in JSON format.

-The express.json() middleware parses these incoming JSON payloads. It takes the raw JSON string from the request body and converts it into a JavaScript object, which it then attaches to req.body. Without this, req.body would be undefined.

-// This is required to read JSON from request bodies
app.use(express.json());

app.post('/api/users', (req, res) => {
  // Thanks to express.json(), req.body contains the parsed JSON data
  const userName = req.body.name; 
  console.log(userName);
  res.send('User created!');
});

-> database schema
const userSchema = new mongoose.Schema({
  varName: {
    pro: val,
    pro: [val, 'message']
  },
  varNmae2: {
    pro: val
  }
})

-> starting server
import ___ from 'required';

dotenv.config();
const app = express();
connectDb();

-> app.use(helmet());
-Helmet is a middleware that sets various HTTP headers to protect your app.
It is actually a collection of smaller middleware functions, like:
-helmet.hidePoweredBy() → removes the X-Powered-By: Express header (attackers can’t easily guess your tech).
-helmet.contentSecurityPolicy() → controls what resources (JS, CSS, images, APIs) the browser can load.
-helmet.xssFilter() → adds protection against cross-site scripting (XSS).
-helmet.noSniff() → prevents browsers from guessing the MIME type (e.g., treating an image as JavaScript).
-helmet.frameguard() → prevents clickjacking by disallowing your site to be shown in <iframe>.

-Example:

import helmet from "helmet";
app.use(helmet());  // enables all default protections
// You can customize:
app.use(helmet({
  contentSecurityPolicy: false, // sometimes disabled for SPAs
  crossOriginEmbedderPolicy: false
}));

-In MERN → protects your backend API when React fetches data, so malicious browsers/scripts can’t misuse headers.

-> app.use(morgan(''))
-Morgan is for logging HTTP requests.
-It records method, URL, status code, response time, etc. to console or file.
-Formats available:
'tiny' → minimal info (GET /api/users 200 12ms).
'dev' → concise with colored status codes (good for development).
'combined' → detailed logs (remote IP, method, URL, response, referrer, user-agent).
'common', 'short' → Apache/Nginx-style formats.
-Example:

import morgan from "morgan";
// Development
app.use(morgan('dev'));
// Production (more details)
app.use(morgan('combined'));

-Logs help in debugging, performance tracking, and detecting unusual API activity.
-In MERN → You’ll see in your console every request your React frontend makes to the backend.

->app.use(express.urlencoded({ extended: }))
-This is a body-parser for form submissions (like <form method="POST">).
-extended: false → uses querystring library (does not support nested objects).
-extended: true → uses qs library (allows rich objects & arrays).

-Example:
<form method="POST" action="/register">
  <input name="username" value="mamu">
  <input name="details[age]" value="21">
  <input name="details[skills][]" value="JS">
  <input name="details[skills][]" value="React">
</form>

-If backend has:
app.use(express.urlencoded({ extended: true }));

app.post("/register", (req, res) => {
  console.log(req.body);
});

-Output with extended: false:
{ username: 'mamu', 'details[age]': '21', 'details[skills][]': 'JS' }

-Output with extended: true:
{
  username: 'mamu',
  details: {
    age: '21',
    skills: ['JS', 'React']
  }
}

-In MERN → If your frontend uses forms or axios.post() with application/x-www-form-urlencoded, you’ll need this to properly parse it.
-cors → lets frontend talk to backend
-helmet() → makes backend secure by headers
-morgan() → makes backend transparent with logs
-express.urlencoded({extended: }) → makes backend able to parse form submissions
-express.json → parses JSON body

-> What is a Route in Node.js + Express.js?

A route defines how your server responds to a specific HTTP request (GET, POST, etc.) at a specific URL.

👉 Example in Express:

app.get("/hello", (req, res) => {
  res.send("Hello Mamu 🚀");
});

When a client (browser/React frontend/Postman) visits http://localhost:5000/hello,
the server matches the route and responds with "Hello Mamu 🚀".

-> API (Application Programming Interface)

In backend: API = set of endpoints (routes) that allow frontend (React) or other clients to interact with backend data.

Example: /api/users could return a list of users from MongoDB.

👉 Think: API = “the waiter between frontend (React) and backend (Node + DB)”

-> REST (Representational State Transfer) is a set of rules for designing APIs.
A REST API uses HTTP methods to perform CRUD (Create, Read, Update, Delete).

✅ Mapping CRUD to HTTP methods:

GET → Read (fetch data)

POST → Create (add data)

PUT → Update (replace full data)

PATCH → Update (partial update)

DELETE → Delete data

👉 Example REST API routes:

GET    /api/users        → Get all users
GET    /api/users/:id    → Get user by ID
POST   /api/users        → Create new user
PUT    /api/users/:id    → Update user
DELETE /api/users/:id    → Delete user

-> In Express, every route callback receives two objects:

---req (Request) → contains data sent by client (frontend/Postman/browser).

-> req.query → query params (/users?age=21)
Sent in URL after ? as key-value pairs.
Used for filtering, searching, sorting, pagination, etc.
They don’t change the resource, only modify the result.

👉 Example:

GET /users?age=21&city=bhopal
Backend:

app.get("/users", (req, res) => {
  console.log(req.query);  
  res.send(`Filtering users by age=${req.query.age}, city=${req.query.city}`);
});

Output if called from Postman:
{ age: "21", city: "bhopal" }

-> req.params → route params (/users/5)
Part of the URL path itself (dynamic segments).
Used to get a specific resource by ID or name.

👉 Example:

GET /users/5
Backend:

app.get("/users/:id", (req, res) => {
  console.log(req.params);  
  res.send(`User ID requested: ${req.params.id}`);
});

Output:
{ id: "5" }

👉 Example with multiple params:

GET /users/5/books/10
app.get("/users/:userId/books/:bookId", (req, res) => {
  res.send(req.params);
});

Output:
{ userId: "5", bookId: "10" }

-> req.body → JSON/form data (from POST/PUT)
Used in POST/PUT/PATCH requests when sending data inside the request body.

Needs express.json() or express.urlencoded() middleware to work.

👉 Example:
Frontend (React with Axios):

axios.post("/users", { name: "Mamu", age: 21 });
Backend:
app.use(express.json()); // Middleware

app.post("/users", (req, res) => {
  console.log(req.body);
  res.json({ msg: "User created", data: req.body });
});

Output:
{ name: "Mamu", age: 21 }

👉 Example with form-data:
<form method="POST" action="/users">
  <input name="username" value="Mamu">
  <input name="age" value="21">
  <button type="submit">Submit</button>
</form>

And with:
app.use(express.urlencoded({ extended: true }));

Output:
{ username: "Mamu", age: "21" }

-> req.query → /users?age=21 → { age: "21" } (used for search/filter).
-> req.params → /users/5 → { id: "5" } (used for resource IDs).
-> req.body → { "name": "Mamu" } (used for POST/PUT data).

---res (Response) → methods to send response back to client.

res.send()
Sends a response body (string, object, array, etc.).
Auto-detects type and sets Content-Type.
app.get("/", (req, res) => {
  res.send("Hello World"); // text response
});

res.json()
Specifically sends JSON response (commonly used in APIs).
app.get("/user", (req, res) => {
  res.json({ id: 1, name: "Mamu" });
});

res.status()
Sets HTTP status code before sending response.
app.get("/error", (req, res) => {
  res.status(404).send("Not Found");
});

res.redirect()
Redirects client to another route.
app.get("/google", (req, res) => {
  res.redirect("https://google.com");
});

res.download()
Sends a file for download.
app.get("/file", (req, res) => {
  res.download("sample.pdf");
});

res.end()
Ends the response (used rarely, when you manually manage response).

-> Route → defines what to do when a request comes in.

-> API → a collection of routes that frontend can use.

-> REST API → APIs designed with HTTP methods for CRUD.