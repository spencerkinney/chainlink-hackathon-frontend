import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Input,
  VStack,
  useToast,
  Text,
  Container,
  Skeleton,
  Image,
  Kbd,
  Button,
} from '@chakra-ui/react';
import axios from 'axios';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return; // Prevent spamming

    setIsLoading(true);
    setImages([]);

    try {
      // Read the RapidAPI key from an environment variable
      const apiKey = process.env.REACT_APP_RAPIDAPI_KEY;
    
      // Set the timeout to 120 seconds (120,000 milliseconds)
      const customTimeout = 120000;
    
      // Create an axios request configuration
      const options = {
        method: 'POST',
        url: 'https://stable-diffusion10.p.rapidapi.com/generate-image',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'stable-diffusion10.p.rapidapi.com',
        },
        data: {
          prompt: prompt,
        },
        timeout: customTimeout,
      };
    
      const response = await axios.request(options);
    
      if (!response.status === 200) {
        throw new Error('Server error, please try again.');
      }
    
      setImages(response.data.data.images);
    } catch (error) {
      toast({
        title: 'Error',
        description: `${error.message} If this persists, please retry.`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container centerContent py="12" maxW={"2xl"} pt={24} minH={"100vh"}>
      <VStack spacing="8">
        <Text fontSize="lg">
          Enter a prompt and press <Kbd>Enter</Kbd> to submit. Note that it sometimes fails on first try, so please retry if it doesn't work.
        </Text>
        <form onSubmit={handleSubmit} width="full">
          <Input
            ref={inputRef}
            placeholder="e.g. cartoon monkey astronaut"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            focusBorderColor="green.800"
            size="lg"
            minW={["sm", "lg", "xl"]}
            variant="flushed"
            mb="4"
            sx={{
              '::placeholder': {
                color: 'whiteAlpha.600',
                opacity: 1,
              },
            }}
          />
        </form>

        <VStack spacing="4" width="full">
          {isLoading ? (
            <>
              <Skeleton height="400px" width="full" />
              <Skeleton height="400px" width="full" />
            </>
          ) : (
            images.map((image, index) => (
              <Box key={index} width="full">
                <Image src={`data:image/png;base64,${image}`} alt={`Generated Image ${index + 1}`} />
              </Box>
            ))
          )}
        </VStack>
      </VStack>
    </Container>
  );
};

export default ImageGenerator;
