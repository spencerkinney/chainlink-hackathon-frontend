import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Container,
  Button,
  Flex,
} from '@chakra-ui/react';
import ARScene from './ARScene'; // Importing ARScene component

const SceneTemplate = ({
  imagePath,
  sceneTitle,
  sceneDecisionLabel,
  decisionChoices,
  onNextScene,
}) => {
  return (
    <Container maxW="container.lg" p={0} h="100vh" overflow="hidden">
      <Flex h="55%" flexDirection="column">
        {/* AR Scene Container */}
        <Box position="relative" h="100%">
          <ARScene imagePath={imagePath} />
        </Box>
      </Flex>

      <Flex h="45%" flexDirection="column" alignItems="center" overflowY="auto" pt={6}>
        {/* Scene Title and Description */}
        <Heading as="h2" size="md" textAlign="center" fontWeight="normal">
          {sceneTitle}
        </Heading>
        <Text mt={3} textAlign="center" color="gray.500">
          {sceneDecisionLabel}
        </Text>

        {/* Decision Choices */}
        <SimpleGrid columns={{ base: 2, md: 2 }} spacing={5} pt={5} w={"75%"}>
          {decisionChoices.map((choice, index) => (
            <Button
              key={index}
              onClick={() => onNextScene(choice.id)}
              colorScheme="facebook"
              variant="outline"
              size={"md"}
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
