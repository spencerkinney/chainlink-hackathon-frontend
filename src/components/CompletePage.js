import { Box, Heading, Text, CheckIcon, Center, VStack, CheckboxIcon, Progress } from "@chakra-ui/react";

function CompletePage({ progress }) {

    let message;
    if (progress <= 20) {
        message = "Congrats! You've started your journey.";
    } else if (progress <= 40) {
        message = "Congrats! You're making great progress.";
    } else if (progress <= 60) {
        message = "Congrats! You're more than halfway through your journey.";
    } else if (progress <= 80) {
        message = "Congrats! Almost completed your journey.";
    } else {
        message = "Completed! Time to mint your NFT!";
    }

    
    return (
        <Center h="100vh">
            <VStack spacing={4}>
                <CheckboxIcon boxSize={12} color="green.300" />
                <Heading>Scene Completed</Heading>
                <Text fontSize="xl">{message}</Text>
                <Progress value={progress} hasStripe width="80%" colorScheme="green" size="lg" />
            </VStack>
        </Center>
    );
}

export default CompletePage;