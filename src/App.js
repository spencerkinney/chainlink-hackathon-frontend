import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import SceneTemplate from './components/SceneTemplate';
import CameraPage from './components/CameraPage';
import CompletePage from './components/CompletePage';
import GameMasterPage from './components/GameMasterPage';

function App() {
  // Scene data
  const scenes = [
    // Scene 1
    {
      id: 1,
      imagePath: '/img/scene1.png', // Update with actual image path
      title: 'Scene 1: The Party Departs',
      decisionLabel: 'Which way would you like to go?',
      choices: [
        { id: 6, label: 'NW' },
        { id: 6, label: 'NE' },
        { id: 6, label: 'W' },
        { id: 6, label: 'E' },
        { id: 6, label: 'SW' },
        { id: 6, label: 'SE' },
      ]
    },
    // Scene 2
    {
      id: 2,
      imagePath: '/img/scene2.png', // Update with actual image path
      title: 'Scene 2: Enter the Wild',
      decisionLabel: 'What do you hope to acquire?',
      choices: [
        { id: 6, label: 'Weaponry' },
        { id: 6, label: 'Items' },
        { id: 6, label: 'Wealth' },
      ]
    },
    // Scene 3
    {
      id: 3,
      imagePath: '/img/scene3.png', // Update with actual image path
      title: 'Scene 3: A Stranger in the Wilderness',
      decisionLabel: 'I hear there is a beast on the loose nearby!',
      choices: [
        { id: 6, label: 'Continue' },
      ]
    },
    // Scene 4
    {
      id: 4,
      imagePath: '/img/scene4.png', // Update with actual image path
      title: 'Scene 4: Prepare for Combat!',
      decisionLabel: 'Roll the dice',
      choices: [
        { id: 6, label: 'I have rolled the dice' },
      ]
    },
    // Scene 5
    {
      id: 5,
      imagePath: '/img/scene5.png', // Update with actual image path
      title: 'Scene 5: Loot',
      decisionLabel: 'Collect your just reward for defeating the evil creature',
      choices: [
        { id: 6, label: 'Mint NFT' },
      ]
    },
  ];

  const qrCodes = [
    '/img/codes/Scene-1.png',
    '/img/codes/Scene-2.png',
    '/img/codes/Scene-3.png',
    '/img/codes/Scene-4.png',
    '/img/codes/Scene-5.png',
  ]

  const logoPath = '/img/logo/logo.png'

  const [currentSceneId, setCurrentSceneId] = useState(1); // Starting scene

  const currentScene = scenes.find(scene => scene.id === currentSceneId);

  // Function to navigate to the next scene
  const handleNextScene = (nextSceneId) => {
    setCurrentSceneId(nextSceneId);
  };

  return (
    <Router>
      <Routes>
        {scenes.map(scene => (
          <Route 
            key={scene.id}
            path={`/scene/${scene.id}`}
            element={
              <SceneTemplate
                sceneId = {scene.id}
                imagePath={scene.imagePath}
                sceneTitle={scene.title}
                sceneDecisionLabel={scene.decisionLabel}
                decisionChoices={scene.choices}
                onNextScene={handleNextScene}
              />
            }
          />
        ))}
        <Route path={`/scene/0`} element={<CameraPage/>}/>
        <Route path={`/scene/6`} element={<CompletePage/>}/>
        <Route path={`/gamemaster`} element={<GameMasterPage qrCodes={qrCodes} logoPath={logoPath}/>}/>
      </Routes>
    </Router>
  );
}

export default App;