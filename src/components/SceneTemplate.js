import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Container,
  Button,
  Flex,
} from '@chakra-ui/react';
import ARScene from './ARScene';
import CompletePage from './CompletePage';

const SceneTemplate = ({
  sceneId,
  imagePath,
  sceneTitle,
  sceneDecisionLabel,
  decisionChoices,
}) => {
  const navigate = useNavigate();
  const isSingleChoice = decisionChoices.length === 1;

  // State to track if the scene has been submitted
  const [submitted, setSubmitted] = useState(false);
  // State to track the progress value
  const [progress, setProgress] = useState(0);

  const displayCompletePage = (currentSceneId) => {
    // Update the progress value based on the currentSceneId or other logic
    // For example, setProgress(100) if the scene is complete
    setProgress(currentSceneId * 20);
    // Set the submitted state to true to display the CompletePage
    setSubmitted(true);
  };

  if (submitted) {
    return <CompletePage progress={progress} sceneTitle={sceneTitle}/>;
  }

  return (
    <Container maxW="container.lg" p={0} h="100vh" overflow="hidden">
      <Flex h="55%" flexDirection="column">
        <Box position="relative" h="100%">
          <ARScene imagePath={imagePath} />
        </Box>
      </Flex>

      <Flex h="45%" flexDirection="column" alignItems="center" overflowY="auto" pt={6}>
        <Heading as="h2" size="md" textAlign="center" fontWeight="normal">
          {sceneTitle}
        </Heading>
        <Text mt={3} textAlign="center" color="gray.500">
          {sceneDecisionLabel}
        </Text>

        <SimpleGrid 
          columns={isSingleChoice ? 1 : 2} 
          spacing={5} 
          pt={5} 
          w={isSingleChoice ? "auto" : "75%"}
          justifyItems={isSingleChoice ? "center" : "stretch"}>
          {decisionChoices.map((choice, index) => (
            <Button
              key={index}
              onClick={() => displayCompletePage(sceneId)}
              colorScheme="facebook"
              variant="outline"
              size="md"
            >
              {choice.label}
            </Button>
          ))}
        </SimpleGrid>
      </Flex>
    </Container>
  );
};

export default SceneTemplate;
