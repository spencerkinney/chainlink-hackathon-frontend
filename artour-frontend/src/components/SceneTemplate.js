import React from "react";
import {
  Box,
  Button,
  VStack,
  Image,
  Text,
  Heading,
  SimpleGrid,
  Container,
} from "@chakra-ui/react";

const SceneTemplate = ({
  imagePath,
  sceneTitle,
  sceneDecisionLabel,
  decisionChoices,
  onNextScene,
  onPreviousScene,
}) => {
  return (
    <Container maxW="container.lg" p={0}>
      <VStack spacing={6} align="stretch"> {/* Increased spacing */}
        {/* Image with a subtle overlay */}
        <Box position="relative" h={{ base: "40vh", sm: "50vh", md: "60vh", lg: "75vh" }}>
          <Image src={imagePath} w="full" h="full" objectFit="cover" />
          <Box position="absolute" top="0" left="0" w="full" h="full" bg="blackAlpha.300" />
        </Box>

        {/* Centered Content Container */}
        <Box px={12} w="full" display="flex" flexDirection="column" alignItems="center">
          {/* Scene Title and Description */}
          <Heading as="h2" size="md" textAlign="center" fontWeight="normal">
            {sceneTitle}
          </Heading>
          <Text mt={3} textAlign="center" color="gray.500">
            {sceneDecisionLabel}
          </Text>

          {/* Decision Choices */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} pt={5} w="full">
            {decisionChoices.map((choice, index) => (
              <Button
                key={index}
                onClick={() => onNextScene(choice.id)}
                colorScheme="gray"  // Subdued color scheme
                variant="outline"  // Minimalistic outline buttons
              >
                {choice.label}
              </Button>
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Container>
  );
};

export default SceneTemplate;
