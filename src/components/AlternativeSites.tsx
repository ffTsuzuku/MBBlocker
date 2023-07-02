import { Flex, Box, Image, Text, theme } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getExtensionData, extensionData } from '../utility/storage'

const randomcColor = () => {
    const { colors } = theme
    const colorNames = Object.keys(colors).slice(2)

    const randomColor =
        colorNames[Math.floor(Math.random() * colorNames.length)]

    //@ts-ignore
    const shadeNames = Object.keys(colors[randomColor])
    const randomShade =
        shadeNames[Math.floor(Math.random() * shadeNames.length)]

    //@ts-ignore
    return colors[randomColor][randomShade]
}

const SiteCard = () => {
    const imageUrl =
        'https://cdn.pixabay.com/photo/2023/01/01/21/33/mountain-7690893_960_720.jpg'

    const footerText = 'Dummy.com'
    const color = randomcColor()

    return (
        <Box
            h={'250px'}
            margin={2}
            boxShadow={'2xl'}
            maxW='sm'
            borderRadius='lg'
            overflow='hidden'
            position='relative'
            w={'400px'}
            bgColor={color}
        >
            <Image
                h={'100%'}
                w={'100%'}
                src={imageUrl}
                alt='Card background'
            />
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
    const [blockedSites, setBlockedSites] = useState<extensionData>()
    useEffect(() => {
        const getBlockedSites = async () => {
            const data = await getExtensionData()
            const { list: blockedSites } = data
            console.log('bs', blockedSites)
        }
    }, [])
    const altSites = [
        'Test',
        'Test',
        'Test',
        'Test',
        'Test',
        'Test',
        'Test',
    ]
    const siteCardsJsx = altSites.map((site) => <SiteCard />)

    const glowColor = randomcColor()
    return (
        <Flex
            boxShadow={`0 0 5px 5px ${glowColor}, 0 0 10px 10px ${glowColor}, 0 0 10px 15px ${glowColor}, 0 0 50px 20px ${glowColor}`}
            alignItems={'center'}
            h={'80%'}
            w={'50%'}
            justifyContent={'center'}
            justifySelf={'center'}
            overflow={'auto'}
            flexWrap={'wrap'}
            borderRadius={'7px'}
            p={3}
        >
            {siteCardsJsx}
        </Flex>
    )
}

export default AlternativeSites
