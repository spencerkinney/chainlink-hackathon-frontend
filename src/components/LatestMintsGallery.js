import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Image,
  Link,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Code,
  Skeleton
} from "@chakra-ui/react";

const LoadingSkeleton = () => (
  <Skeleton width="100%" height="300px" />
);

const LatestMintsGallery = () => {
  // State to store the latest mints data
  const [latestMints, setLatestMints] = useState([]);

  const apiKey = process.env.REACT_APP_RAPIDAPI_KEY;

  // Function to fetch the actual JSON data from a URL
  const fetchJsonData = async (url) => {
    try {
      const response = await fetch(url);

      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error fetching JSON data:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error fetching JSON data:", error);
      return null;
    }
  };

  // Function to extract the IPFS hash from a URL
  const extractIpfsHash = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  // Function to generate the popover content
  const getPopoverContent = (mint) => {
    return (
      <PopoverContent>
        <PopoverBody>
          {/* Displaying the verified IPFS hash for the mint */}
          Verified IPFS hash for {mint.name}:{" "}
          <Code whiteSpace="pre-wrap" >{extractIpfsHash(mint.image)}</Code>
        </PopoverBody>
      </PopoverContent>
    );
  };

  // Fetch latest mints data when the component mounts
  useEffect(() => {
    const fetchLatestMints = async () => {
      try {
        const options = {
          method: "GET",
          url: "https://stable-diffusion10.p.rapidapi.com/latest-mints",
          headers: {
            "X-RapidAPI-Host": "stable-diffusion10.p.rapidapi.com",
            "X-RapidAPI-Key": apiKey,
            "content-type": "application/json",
          },
        };

        // Make a GET request to the RapidAPI endpoint to get the latest mints URLs
        const response = await fetch(options.url, options);

        if (response.status === 200) {
          const data = await response.json();

          // Fetch and store the actual JSON data for each URL
          const mintData = await Promise.all(
            data.data.map((url) => fetchJsonData(url))
          );

          setLatestMints(mintData);
          console.log("Latest mints data:", mintData);
        } else {
          console.error("Error fetching latest mints:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching latest mints:", error);
      }
    };

    fetchLatestMints();
  }, []);

  return (
    <Container maxW="container.md" py={8}>
      {/* Title */}
      <Heading as="h1" size="xl" textAlign="center" mb={6}>
        Recently Opened Loot
      </Heading>

      {/* Gallery */}
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={8} // Increased gap between gallery items
        justifyContent="center"
      >
        {latestMints.length > 0 ? (
          latestMints.map((mint, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="md"
              overflow="hidden"
              p={6} // Increased padding
              boxShadow="md" // Added box shadow for a subtle look
            >
              <Link
                href={mint.image} // Assuming 'image' is the image URL property in your JSON
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={mint.image}
                  alt={`Mint ${index + 1}`}
                  maxH="300px"
                  objectFit="cover"
                />
              </Link>
              <Text fontSize="lg" fontWeight="bold" mt={4}>
                {mint.name} {/* Assuming 'name' is the name property in your JSON */}
              </Text>
              <Popover placement="top">
                <PopoverTrigger>
                  <Link
                    fontSize="md"
                    mt={2}
                    color="teal.500"
                    href={mint.image}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Code whiteSpace="pre-wrap" width={"100%"}>
                      {extractIpfsHash(mint.image)}
                    </Code>{" "}
                    {/* Displaying the extracted IPFS hash in code style */}
                  </Link>
                </PopoverTrigger>
                {getPopoverContent(mint)}
              </Popover>
            </Box>
          ))
        ) : (
          // Loading skeletons
          Array.from({ length: 4 }).map((_, index) => (
            <LoadingSkeleton key={index} />
          ))
        )}
      </Grid>

      {/* Back button */}
      <Button
        mt={6}
        colorScheme="teal"
        size="sm"
        mx="auto"
        display="block"
        onClick={() => window.history.back()}
      >
        Go back home
      </Button>
    </Container>
  );
};

export default LatestMintsGallery;
