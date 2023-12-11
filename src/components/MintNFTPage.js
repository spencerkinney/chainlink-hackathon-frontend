import React from 'react';
import { Box, Button, Text, VStack, useToast } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

function MintNFTPage() {
    const toast = useToast();

    const handleMint = async () => {
        // Check if Metamask is installed
        if (window.ethereum) {
            try {
                // Request account access if needed
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                // Display toast message
                toast({
                    title: "NFT Minting",
                    description: "Your NFT is being minted. Please confirm the transaction in Metamask.",
                    status: "info",
                    duration: 9000,
                    isClosable: true,
                });

                // Mock transaction - In a real scenario, you would create a transaction here
                const transactionParameters = {
                    // to: '0x...', // Required except during contract publications.
                    // from: ethereum.selectedAddress, // must match user's active address.
                    // value: '0x...', // Only required to send ether to the recipient from the initiating external account.
                    // data: '0x...', // Optional, but used for defining smart contract creation and interaction.
                    gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
                    gas: '0x2710', // customizable by user during MetaMask confirmation.
                };

                // ethereum.request({
                //     method: 'eth_sendTransaction',
                //     params: [transactionParameters],
                // });

            } catch (error) {
                console.error(error);
            }
        } else {
            console.log('Please install MetaMask!');
        }
    };

    return (
        <VStack spacing={4} align="stretch" m={4}>
            <Box p={5} shadow="md" borderWidth="1px">
                <Text fontSize="xl">Mint Your NFT</Text>
                <Text mt={4}>Click the button below to start the minting process. Make sure your Metamask wallet is connected.</Text>
            </Box>
            <Button rightIcon={<ExternalLinkIcon />} colorScheme="teal" onClick={handleMint}>
                Mint NFT
            </Button>
        </VStack>
    );
}

export default MintNFTPage;
