import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import Quiz from './quiz'; // Double Player Quiz
import SinglePlayerQuiz from './SinglePlayerQuiz'; // Single Player Quiz
import Navbar from './navbar';
import Homepage from './Homepage';
import About from './About';
import Feedback from './feedback';
import GameMode from './GameMode'; // New component for game mode selection

Amplify.configure(awsExports);

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Authenticator>
          {({ signOut }) => (
            <main>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/about" element={<About />} />
                <Route path="/feedback" element={<Feedback />} />

                {/* New Routes for Categories */}
                <Route path="/aws-fundamentals" element={<GameMode category="AWS Fundamentals" />} />
                <Route path="/solutions-architect" element={<GameMode category="Solutions Architect" />} />
                <Route path="/developer" element={<GameMode category="Developer Associate" />} />
                <Route path="/sysops" element={<GameMode category="SysOps Administrator" />} />
                <Route path="/security" element={<GameMode category="Security Specialty" />} />
                <Route path="/database" element={<GameMode category="Database Specialty" />} />

                {/* Routes for Single Player mode under each category */}
                <Route
                  path="/:category/single-player"
                  element={
                    <div className="game-container">
                      <SinglePlayerQuiz />
                      <button
                        onClick={signOut}
                        className='signout-btn'
                      >
                        Sign Out
                      </button>
                    </div>
                  }
                />

                {/* Routes for Double Player mode under each category */}
                <Route
                  path="/:category/double-player"
                  element={
                    <div className="game-container">
                      <Quiz />
                      <button
                        onClick={signOut}
                        className='signout-btn'
                      >
                        Sign Out
                      </button>
                    </div>
                  }
                />
              </Routes>
            </main>
          )}
        </Authenticator>
      </div>
    </Router>
  );
}

export default withAuthenticator(App);
