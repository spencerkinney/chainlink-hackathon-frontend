// CharacterPage.js
import React from 'react';
import {
  Box, Image, Button, VStack, Text, Container, useColorModeValue
} from '@chakra-ui/react';

const CharacterPage = ({ onGameStart }) => {
  const bg = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  return (
    <VStack
      spacing={6}
      align="center"
      justify="center"
      minH="100vh"
      bg={bg}
      color={textColor}
      px={4}
      width="full"
    >
      <Text fontSize="2xl" fontWeight="normal" textAlign="center">
        Alarmin The Outcast
      </Text>
      <Box
        borderRadius="md"
        boxSize={['250px', '300px']} // Responsive image size
        boxShadow="md"
        overflow="hidden"
      >
        <Image
          src="/img/char/1.png" // Update with actual image path
          alt="Character Image"
          objectFit="cover"
          width="100%"
          height="auto"
        />
      </Box>
      <Container centerContent p={2}>
        <Text fontSize="md" fontWeight="normal" textAlign="center">
          A Drow sorcerer shrouded in mystery, wielding the arcane with an outcast's precision.
        </Text>
      </Container>
      <Button
        size="md"
        colorScheme='whatsapp'
        px={8}
        onClick={onGameStart}
      >
        START
      </Button>
    </VStack>
  );
};

export default CharacterPage;
