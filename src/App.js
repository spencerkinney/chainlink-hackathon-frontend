import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SceneTemplate from './components/SceneTemplate';
import CameraPage from './components/CameraPage';
import CompletePage from './components/CompletePage';

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
        { id: 2, label: 'N' },
        { id: 2, label: 'NE' },
        { id: 2, label: 'SE' },
        { id: 2, label: 'S' },
        { id: 2, label: 'SW' },
        { id: 2, label: 'NW' },
      ]
    },
    // Scene 2
    {
      id: 2,
      imagePath: '/img/scene2.png', // Update with actual image path
      title: 'Scene 2: Enter the Wild',
      decisionLabel: 'What do you hope to acquire?',
      choices: [
        { id: 3, label: 'Weaponry' },
        { id: 3, label: 'Items' },
        { id: 3, label: 'Wealth' },
      ]
    },
    // Scene 3
    {
      id: 3,
      imagePath: '/img/scene3.png', // Update with actual image path
      title: 'Scene 3: A Stranger in the Wilderness',
      decisionLabel: 'I hear there is a beast on the loose nearby!',
      choices: [
        { id: 4, label: 'Continue' },
      ]
    },
    // Scene 4
    {
      id: 4,
      imagePath: '/img/scene4.png', // Update with actual image path
      title: 'Scene 4: Prepare for Combat!',
      decisionLabel: 'Roll the dice',
      choices: [
        { id: 5, label: 'I have rolled the dice' },
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
      </Routes>
    </Router>
  );
}

export default App;