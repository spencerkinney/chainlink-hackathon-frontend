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
  Tooltip, // Import Tooltip component
  Code,
  Skeleton,
  Tag, // Import Tag component
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

  // Function to get the tag color based on the category
  const getTagColor = (category) => {
    switch (category) {
      case "wealth":
        return "yellow"; // Set the color for wealth
      case "weapon":
        return "red"; // Set the color for weapon
      case "item":
        return "green"; // Set the color for item
      default:
        return "gray"; // Default color
    }
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
      <Heading as="h1" size="lg" textAlign="center" mb={6}>
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
                href={mint?.image} // Assuming 'image' is the image URL property in your JSON
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={mint?.image}
                  alt={`Mint ${index + 1}`}
                  maxH="300px"
                  objectFit="cover"
                />
              </Link>
              <Text fontSize="lg" fontWeight="bold" mt={4}>
                {mint?.name} {/* Assuming 'name' is the name property in your JSON */}
              </Text>
              <Text color="gray.500" fontSize="sm" mb={2}>
                {mint?.description} {/* Display description in muted text color */}
              </Text>
              <Tag
                size="sm"
                variant="solid"
                colorScheme={getTagColor(mint?.attributes[0].value)}
                textTransform="capitalize" // Capitalize the first letter
              >
                {mint?.attributes[0].value} {/* Display trait type as a small tag */}
              </Tag>
              {/* Tooltip */}
              <Tooltip label={`Verified IPFS hash for ${mint?.name}: ${extractIpfsHash(mint?.image)}`} placement="top">
                <Link
                  fontSize="md"
                  mt={2}
                  color="teal.500"
                  href={mint?.image}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Code whiteSpace="pre-wrap" width={"100%"}>
                    {extractIpfsHash(mint?.image)}
                  </Code>{" "}
                  {/* Displaying the extracted IPFS hash in code style */}
                </Link>
              </Tooltip>
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
