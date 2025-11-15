import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';  // Измените на Routes
import './styles/App.css';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import {ThemeProvider} from "./utils/ThemeContext";

const App: React.FC = () => {
    return (
        <div className="container">
            <Router >
                <ThemeProvider>
                    <div>
                        {/* Маршруты */}
                        <Routes>  {/* Заменили Switch на Routes */}
                            <Route path="/" element={<HomePage/>}/> {/* Заменили component на element */}
                            <Route path="/about" element={<AboutPage/>}/> {/* Заменили component на element */}
                        </Routes>
                    </div>
                </ThemeProvider>
            </Router>
        </div>
    );
}

export default App;
