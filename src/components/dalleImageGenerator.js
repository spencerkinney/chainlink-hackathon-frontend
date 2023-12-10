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
      const response = await fetch('localhost:5000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Server error, please try again.");
      }

      const result = await response.json();
      setImages(result.data.images);
    } catch (error) {
      toast({
        title: "Error",
        description: `${error.message} If this persists, please retry.`,
        status: "error",
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




