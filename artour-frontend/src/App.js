import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SceneTemplate from './components/SceneTemplate';

function App() {
  // Example scene data
  const scenes = [
    {
      id: 1,
      imagePath: '/img/image-20231127-195426.png',
      title: 'Scene 1: Leaving Town',
      decisionLabel: 'Which way would you like to go?',
      choices: [
        { id: 2, label: 'N' },
        { id: 3, label: 'NE' },
        { id: 4, label: 'SE' },
        { id: 5, label: 'S' },
        { id: 6, label: 'SW' },
        { id: 7, label: 'NW' },
      ]
      
      
    },
  ];

  const [currentSceneId, setCurrentSceneId] = useState(1); // Starting scene

  const currentScene = scenes.find(scene => scene.id === currentSceneId);

  // Function to navigate to the next scene
  const handleNextScene = (nextSceneId) => {
    setCurrentSceneId(nextSceneId);
  };

  // Function to go back to the previous scene (optional, depends on your game logic)
  const handlePreviousScene = () => {
    // Implement previous scene logic
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <SceneTemplate 
              imagePath={currentScene.imagePath}
              sceneTitle={currentScene.title}
              sceneDecisionLabel={currentScene.decisionLabel}
              decisionChoices={currentScene.choices}
              onNextScene={handleNextScene}
              onPreviousScene={handlePreviousScene}
            />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;