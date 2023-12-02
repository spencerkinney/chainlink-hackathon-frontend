// CharacterPage.js
import React from 'react';
import {
  Box, Image, Button, VStack, Text, Container, useColorModeValue
} from '@chakra-ui/react';

const CharacterPage = ({ onGameStart }) => {
  const bg = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const buttonColor = useColorModeValue('whatsapp.500', 'whatsapp.300');

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg={bg}
      color={textColor}
      padding={4}
    >
      <VStack spacing={8} maxWidth="sm" width="full" px={4}>
        <Text fontSize="2xl" fontWeight="normal" textAlign="center">
          Alarmin The Outcast
        </Text>
        <Box
          borderRadius="md"
          boxSize="300px"
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
        <Container centerContent>
          <Text fontSize="md" fontWeight="normal" textAlign="center">
            A Drow sorcerer shrouded in mystery, wielding the arcane with an outcast's precision.
          </Text>
        </Container>
        <Button
          size="md"
          bg={buttonColor}
          color="white"
          _hover={{ bg: 'whatsapp.600' }}
          width="full"
          onClick={onGameStart}
        >
          START
        </Button>
      </VStack>
    </Box>
  );
};

export default CharacterPage;
