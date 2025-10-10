import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  // Измените на Routes
import './App.css';

import HomePage from './HomePage';
import AboutPage from './AboutPage';

const App: React.FC = () => {
    return (
        <Router>
            <div>
                {/* Навигация */}
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                    </ul>
                </nav>

                {/* Маршруты */}
                <Routes>  {/* Заменили Switch на Routes */}
                    <Route path="/" element={<HomePage />} />  {/* Заменили component на element */}
                    <Route path="/about" element={<AboutPage />} />  {/* Заменили component на element */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
