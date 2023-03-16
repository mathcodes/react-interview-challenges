// SIMPLE CLIENT SIDE ROUTING!

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

// Let's start creating Home, About, and Contact components so we know which page we're on!

const Home = () => {
  return <h1>Welcome to the Home Page</h1>;
};

const About = () => {
  return <h1>About Us</h1>;
};

const Contact = () => {
  return <h1>Contact Us</h1>;
};

// Now we'll create the App component and add the BrowserRouter component wrapping the Routes wrapper component for the routes we want to use.
// We'll also add the nav component with the links to the pages we want to navigate to.


const App = () => {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
