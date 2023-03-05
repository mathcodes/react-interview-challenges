import React from 'react';
import './App.css';
import ButtonPanel from './components/ButtonPanel';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <div className="App">
      <header>
        <h1>My Website</h1>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="hero">
          <h2>Welcome to My Website</h2>
          <p>Here you can learn all about me and what I do.</p>
        </section>
        <section>
          <LandingPage />
          <ButtonPanel />
        </section>
        <section className="testimonials">
          <h2>Testimonials</h2>
          <ul>
            <li>
            <img src="https://www.jonchristie.net/favicon.png" alt="Testimonial" width="20%" className="w-10 h-10"/>
              <blockquote>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat felis at leo maximus iaculis. Suspendisse fringilla orci vitae eros consequat laoreet."</blockquote>
              <cite>John Doe</cite>
            </li>
            <li className="w-10 h-10">
              <img src="https://www.jonchristie.net/favicon.png" alt="Testimonial" width="20%" className="w-10 h-10"/>
              <blockquote>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat felis at leo maximus iaculis. Suspendisse fringilla orci vitae eros consequat laoreet."</blockquote>
              <cite>Jane Smith</cite>
            </li>
          </ul>
        </section>
      </main>
      <footer>
        <p>&copy; 2021 My Website. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
