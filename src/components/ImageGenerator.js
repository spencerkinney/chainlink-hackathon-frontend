import React, { useState } from 'react';
import {
  Box,
  Input,
  Button,
  Image,
  Skeleton,
  VStack,
  useToast,
} from '@chakra-ui/react';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    setIsLoading(true);
    setImages([]);

    try {
      const response = await fetch('https://stablediff-664a3266e9c5.herokuapp.com/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setImages(result.data.images);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack spacing={4}>
      <Input
        placeholder="Enter your prompt here"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button colorScheme="blue" onClick={handleSubmit} isLoading={isLoading}>
        Generate Image
      </Button>

      {isLoading ? (
        <Skeleton height="250px" width="500px" />
      ) : (
        images.map((image, index) => (
          <Box key={index} boxSize="sm">
            <Image src={`data:image/png;base64,${image}`} alt={`Generated Image ${index + 1}`} />
          </Box>
        ))
      )}
    </VStack>
  );
};

export default ImageGenerator;
