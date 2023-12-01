import { Box, Heading, Text, CheckIcon, Center, VStack, CheckboxIcon, Progress } from "@chakra-ui/react";

function CompletePage({ progress }) {
    return (
        <Center h="100vh">
            <VStack spacing={4}>
                <CheckboxIcon boxSize={12} color="green.500" />
                <Heading>Scene Completed</Heading>
                <Text fontSize="xl">Congrats! You've successfully completed part of your journey.</Text>
                <Progress value={progress} hasStripe width="80%" colorScheme="green" size="lg" />
            </VStack>
        </Center>
    );
}

export default CompletePage;