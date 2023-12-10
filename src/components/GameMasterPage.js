import React, { useState } from 'react';
import { Box, Heading, Image, Button, Flex, Text, Skeleton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

const GameMasterPage = ({ qrCodes, logoPath }) => {
  const [currentQRIndex, setCurrentQRIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  const handleNextScene = () => {
    setCurrentQRIndex((prevIndex) => (prevIndex + 1) % qrCodes.length);
    setIsImageLoading(true); // Reset loading state for new image
  };

  const handleCloseModal = () => {
    setIsOpen(false);
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
      <Flex align="center" mb={6} width="full" justify="center">
        <Modal isOpen={isOpen} onClose={handleCloseModal}>
          <ModalOverlay/>
	  <ModalContent>
	    <ModalHeader>Welcome to Ceptor Club x Artour</ModalHeader>
	    <ModalCloseButton/>
            <ModalBody>
	      <Text>This game will take you on an adventure of art and technology. Scenarios will be presented to you, choose your options wisely. If you complete the adventure, loot will be minted as an NFT and gifted to you!</Text>
	    </ModalBody>
          </ModalContent>
	</Modal>
        <Image src={logoPath} alt="Logo" maxW="60px" mr={4} />
        <Text fontSize="xl">Game Master Control</Text>
      </Flex>
      <Box 
        border="1px" 
        borderColor="gray.600"
        borderRadius="md" 
        p={5} 
        mb={6} 
        bg="gray.700"
        position="relative"
      >
        <Heading size="md" mb={4}>{`Scene ${currentQRIndex + 1}`}</Heading>
        {isImageLoading && <Skeleton height="250px" width="250px"/>}
        <Image 
          src={qrCodes[currentQRIndex]} 
          alt={`QR Code for Scene ${currentQRIndex + 1}`} 
          maxW="250px"
          loading="lazy"
          onLoad={() => setIsImageLoading(false)}
          display={isImageLoading ? 'none' : 'block'}
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
