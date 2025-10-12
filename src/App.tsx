import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';  // Измените на Routes
import './styles/App.css';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import {ThemeProvider} from "./utils/ThemeContext";
import PageThemeToggle from "./components/PageThemeToggle";

const App: React.FC = () => {
    return (
        <Router>
            <ThemeProvider>
                <div>
                    <PageThemeToggle/>
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
                        <Route path="/" element={<HomePage/>}/> {/* Заменили component на element */}
                        <Route path="/about" element={<AboutPage/>}/> {/* Заменили component на element */}
                    </Routes>
                </div>
            </ThemeProvider>
        </Router>
    );
}

export default App;
