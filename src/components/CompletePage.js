import { Box, Heading, Text, CheckIcon, Center, VStack, CheckboxIcon, Progress } from "@chakra-ui/react";

function CompletePage({ progress, sceneTitle }) {
    let message;

    if (progress < 100) {
        // For all scenes except the last one
        message = `You've completed ${sceneTitle}`;
    } else {
        // Special message for the last scene
        message = "Completed! Time to mint your NFT.";
    }

    return (
        <Center h="100vh">
            <VStack spacing={4}>
                <CheckboxIcon boxSize={12} color="green.300" />
                <Heading>Scene {progress / 20} completed</Heading>
                <Text fontSize="xl">{message}</Text>
                <Progress value={progress} hasStripe width="80%" colorScheme="green" size="lg" />
            </VStack>
        </Center>
    );
}

export default CompletePage;
