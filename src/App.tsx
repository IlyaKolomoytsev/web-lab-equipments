import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';  // Измените на Routes
import './styles/App.css';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import {ThemeProvider} from "./utils/ThemeContext";
import {useEquipments} from "./hooks/useEquipments.ts";

const App: React.FC = () => {
    const equipments = useEquipments(); // 👈 один источник правды

    return (
        <div className="container">
            <Router>
                <ThemeProvider>
                    <div>
                        {/* Маршруты */}
                        <Routes>  {/* Заменили Switch на Routes */}
                            <Route path="/"
                                   element={<HomePage equipments={equipments}/>}/> {/* Заменили component на element */}
                            <Route path="/about" element={<AboutPage/>}/> {/* Заменили component на element */}
                        </Routes>
                    </div>
                </ThemeProvider>
            </Router>
        </div>
    );
}

export default App;
