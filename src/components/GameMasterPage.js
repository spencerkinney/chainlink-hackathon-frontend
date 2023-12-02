import React from 'react';
import { Box, Heading, Image, Button, Flex, Text } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

const GameMasterPage = ({ qrCodes }) => {
  const [currentQRIndex, setCurrentQRIndex] = React.useState(0);

  const handleNextScene = () => {
    setCurrentQRIndex((prevIndex) => (prevIndex + 1) % qrCodes.length);
  };

  return (
    <Flex 
      direction="column"
      align="center"
      justify="center"
      p={4}
      bg="gray.800"
      color="white"
      minH="100vh"
    >
      <Text mb={4} fontSize="2xl">Game Master Control</Text>
      <Box 
        border="1px" 
        borderColor="gray.600"
        borderRadius="md" 
        p={5} 
        mb={6} 
        bg="gray.700"
      >
        <Heading size="md" mb={4}>{`Scene ${currentQRIndex + 1}`}</Heading>
        <Image 
          src={qrCodes[currentQRIndex]} 
          alt={`QR Code for Scene ${currentQRIndex + 1}`} 
          maxW="250px"
          lazyLoad
        />
      </Box>
      <Button 
        colorScheme="whatsapp"
        size="md" 
        variant="ghost"
        onClick={handleNextScene}
        rightIcon={<ChevronRightIcon/>}
      >
        Next Scene
      </Button>
    </Flex>
  );
};

export default GameMasterPage;
