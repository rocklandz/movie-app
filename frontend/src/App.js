import './App.css';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './screens/HomePage.js';
import MoviePreview from './screens/MoviePreview.js';
import MovieStream from './screens/MovieStream.js';
import Login from './screens/Login.js';
import Register from './screens/Register.js';
import UserList from './screensAdmin/UserList.js';
import MovieList from './screensAdmin/MovieList.js';
import NewMovie from './screensAdmin/NewMovie.js';
import EditMovie from './screensAdmin/EditMovie.js';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Route path='/admin/edit' component={EditMovie} exact />
        <Route path='/admin/new-movie' component={NewMovie} exact />
        <Route path='/admin/movies' component={MovieList} exact />
        <Route path='/admin/users' component={UserList} exact />
        <Route path='/login' component={Login} exact />
        <Route path='/register' component={Register} exact />
        <Route path='/movie/:id' component={MovieStream} exact />
        <Route path='/preview/:id' component={MoviePreview} exact />
        <Route path='/' component={HomePage} exact />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
