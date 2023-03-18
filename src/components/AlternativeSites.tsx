import { Flex, Box, Image, Text } from '@chakra-ui/react'

const SiteCard = () => {
    const imageUrl =
        'https://cdn.pixabay.com/photo/2023/01/01/21/33/mountain-7690893_960_720.jpg'

    const footerText = 'Dummy.com'
    return (
        <Box
            h={'250px'}
            margin={2}
            boxShadow={'2xl'}
            maxW='sm'
            borderRadius='lg'
            overflow='hidden'
            position='relative'
        >
            <Image src={imageUrl} alt='Card background' />
            <Text
                position='absolute'
                top='50%'
                left='50%'
                transform='translate(-50%, -50%)'
                fontWeight='bold'
                fontSize='xl'
                color='white'
                textAlign='center'
                width='100%'
                textShadow='1px 1px black, -1px -1px black, 1px -1px black, -1px 1px black'
            >
                {footerText}
            </Text>
        </Box>
    )
}

const AlternativeSites = () => {
    const altSites = ['Test', 'Test', 'Test', 'Test', 'Test', 'Test']
    const siteCardsJsx = altSites.map((site) => <SiteCard />)

    return (
        <Flex
            alignItems={'center'}
            justifyContent={'center'}
            h={'100%'}
            overflow={'hidden'}
        >
            <Flex
                alignItems={'flex-start'}
                justifyContent={'flex-start'}
                flexWrap={'wrap'}
                w={'1200px'}
            >
                {siteCardsJsx}
            </Flex>
        </Flex>
    )
}

export default AlternativeSites
