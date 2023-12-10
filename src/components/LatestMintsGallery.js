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
  Badge,
  Skeleton,
} from "@chakra-ui/react";

const LoadingSkeleton = () => (
  <Skeleton width="100%" height="300px" />
);

const LatestMintsGallery = () => {
  // State to store the latest mints data
  const [latestMints, setLatestMints] = useState([]);

  const apiKey = process.env.REACT_APP_RAPIDAPI_KEY;

  // Function to fetch the latest mints data from the RapidAPI endpoint
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

      // Make a GET request to the RapidAPI endpoint to get the latest mints data
      const response = await fetch(options.url, options);

      if (response.status === 200) {
        const data = await response.json();
        setLatestMints(data.data); // Access the image URL from the 'data' array
        console.log("Latest mints data:", data);
      } else {
        console.error("Error fetching latest mints:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching latest mints:", error);
    }
  };

  // Fetch latest mints data when the component mounts
  useEffect(() => {
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
        gap={6}
        justifyContent="center"
      >
        {latestMints.length > 0 ? (
          latestMints.map((mint) => (
            <Box
              key={mint}
              borderWidth="1px"
              borderRadius="md"
              overflow="hidden"
              p={6} // Increased padding
              boxShadow="md" // Added box shadow for a subtle look
            >
              <Link
                href={mint}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={mint}
                  alt="Latest Mint"
                  maxH="300px"
                  objectFit="cover"
                />
              </Link>
              <Text fontSize="lg" fontWeight="bold" mt={4}>
                Mint Title
              </Text>
              <Badge
                variant="solid"
                colorScheme="teal"
                mt={2}
                p={2} // Added padding to the badge
              >
                IPFS Hash
              </Badge>
              <Text fontSize="md" mt={2}>
                {mint}
              </Text>
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