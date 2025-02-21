import React, { useState } from 'react';
import { GoImage } from "react-icons/go";
import {
    Button,
    Flex,
    Text,
    Popover,
    PopoverBody,
    PopoverTrigger,
    PopoverContent,
    PopoverCloseButton,
    PopoverHeader,
    PopoverArrow,
    Input,
    VStack,
    HStack
} from '@chakra-ui/react';
import { useBlob } from './BlobContext';

const BlobImage = () => {
    const { imageUrl, setImage, clearImage } = useBlob();
    const [error, setError] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const urlRegex = /([\w+]+\:\/\/)?([\w\d-]+\.)*[\w-]+[\.\:]\w+([\/\?\=\&\#\.]?[\w-]+)*\/?/gm;

    const [isPopoverOpen, setPopoverOpen] = useState(false);
    const togglePopover = () => setPopoverOpen((prev) => !prev);

    const handleImageSet = (url) => {
        if (!urlRegex.test(url)) {
            setError('Invalid URL');
            return;
        }
        setError(null);
        setImage(url);
        // Do NOT clear the inputValue here, so the URL stays visible
    };

    const handleClear = () => {
        clearImage();
        setInputValue(''); // Clear the input when image is removed
        setError(null);
    };

    const popoverTrigger = (
        <Button
            variant="unstyled"
            p="2"
            h="auto"
            pos="relative"
            _hover={{ opacity: 1 }}
            _focus={{ outline: 'none' }}
            onClick={togglePopover}
        >
            <Flex direction="column" align="center">
                <GoImage fontSize="26px" color={imageUrl ? "blue.500" : "gray.600"} />
                <Text fontSize="sm" fontWeight="normal" variant="subtle" mt="2">
                    Image
                </Text>
            </Flex>
        </Button>
    );

    return (
        <Popover isOpen={isPopoverOpen} onClose={togglePopover} closeOnBlur={true}>
            <PopoverTrigger>
                {React.Children.only(popoverTrigger)}
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Set an Image</PopoverHeader>
                <PopoverBody>
                    <VStack spacing={3}>
                        <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            variant="outline"
                            placeholder="https://someurl.png"
                            bg="white"
                            _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                            onKeyDown={(e) => {
                                if (e.key !== 'Enter') return;
                                handleImageSet(e.target.value);
                            }}
                        />
                        <HStack width="100%" justifyContent="space-between">
                            <Button
                                size="sm"
                                colorScheme="blue"
                                onClick={() => handleImageSet(inputValue)}
                            >
                                Set Image
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={handleClear}
                                isDisabled={!imageUrl}
                            >
                                Clear Image
                            </Button>
                        </HStack>
                        {error && (
                            <Text fontSize="sm" color="red.600" fontWeight="600">
                                {error}
                            </Text>
                        )}
                        {imageUrl && (
                            <Text fontSize="sm" color="green.600">
                                Image set successfully
                            </Text>
                        )}
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default BlobImage;
