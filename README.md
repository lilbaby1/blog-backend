# blog-backend
<h3>Back end application built with NodeJS, Express and MongoDB. Supports JWT authentication and CRUD operations</h3>

<h3>Functionality</h3>
Posts can be read by anyone. To create, edit or delete a post the user must be logged in. <br />
Users can register, login, create posts, edit those posts or delete them. <br />
Users cannot delete or edit the posts of other users. <br />
Admins can delete every post but can only edit the posts that they have created.<br />
The app uses JWTs to authenticate users and their roles. The tokens are sent by a http only cookie. <br />

<h4>To set up the application you need the following environment variables:</h4>
ACCESS_TOKEN_SECRET=0b9f9f3268e884e6f40b77468065ea5447267655261f3fed62d12b6a12c612f10660a664f90e6d6a174f9ff869e71661d26d955325d32cfb751b0ba0a3db3141 <br />
REFRESH_TOKEN_SECRET=0c22733b861fe4819839815c16a85a9fa9b5d269f7397c15c4bec1ae64d5f2abc287de14eb23a7ec3a2a2e028fda1054942d1f8fb48f94ba856baf6d5540a2ae <br />
DATABASE_URI=mongodb+srv://User2:Testing123@cluster0.x6oqu1d.mongodb.net/?retryWrites=true&w=majority <br />
The default PORT is 3500

<br />
<br />
<p>Make sure you have npm installed. Use <b>npm run dev</b> to start the server.</p>

<h4>Admin - walt1 <br />
Password - walt1</h4>
User - walt2 <br />
Password - walt2
