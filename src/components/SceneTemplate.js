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
  Badge,
  Tag,
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
  const [submitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Splitting the sceneTitle into 'Scene X' and the rest
  const titleParts = sceneTitle.split(': ');
  const badgeTitle = titleParts[0];
  const remainingTitle = titleParts.length > 1 ? titleParts[1] : '';

  const displayCompletePage = (currentSceneId) => {
    setProgress(currentSceneId * 20);
    setSubmitted(true);
  };

  if (submitted) {
    return <CompletePage progress={progress} sceneTitle={sceneTitle} />;
  }

  return (
    <Container maxW="container.lg" p={0} h="100vh" overflow="hidden">
      <Flex h="55%" flexDirection="column">
        <Box position="relative" h="100%">
          <ARScene imagePath={imagePath} />
        </Box>
      </Flex>

      <Flex h="45%" flexDirection="column" alignItems="center" overflowY="auto" pt={6}>
        <Flex as="h2" size="md" textAlign="center" fontWeight="normal" alignItems="center" fontSize='1.2em'>
          <Badge mr={2} colorScheme="blue" fontSize='0.8em'>{badgeTitle}</Badge>
          {remainingTitle}
        </Flex>
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