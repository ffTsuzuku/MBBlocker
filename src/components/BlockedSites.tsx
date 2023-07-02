import { Flex, Box, Image, Text, theme, list } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {
    getExtensionData,
    extensionData,
    setSiteStatus,
} from '../utility/storage'

import { IoMdClose } from 'react-icons/io'

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

const SiteCard = ({
    siteName,
    removeSite,
}: {
    siteName: string
    removeSite: () => void
}) => {
    const imageUrl =
        'https://cdn.pixabay.com/photo/2023/01/01/21/33/mountain-7690893_960_720.jpg'

    return (
        <Box
            h={'250px'}
            margin={2}
            boxShadow={'2xl'}
            maxW='sm'
            borderRadius='lg'
            overflow='hidden'
            position='relative'
            w={{ lg: '333px' }}
        >
            <Box position={'absolute'} ml={'85%'} p={3} onClick={removeSite}>
                <IoMdClose
                    cursor={'pointer'}
                    color='black'
                    fontWeight={'bold'}
                    fontSize={'30px'}
                    strokeWidth={'4px'}
                    fill='white'
                />
            </Box>
            <Image h={'100%'} w={'100%'} src={imageUrl} alt='Card background' />
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
                {siteName}
            </Text>
        </Box>
    )
}

const BlockedSites = () => {
    const [blockedSites, setBlockedSites] = useState<extensionData['list']>()

    const getBlockedSites = async () => {
        const data = await getExtensionData()
        const { list: blockedSites } = data
        console.log(blockedSites)
        setBlockedSites(blockedSites)
    }

    const removeBlockedSite = async (siteName: string) => {
        setSiteStatus(siteName, false)
        const copy = { ...blockedSites }
        delete copy[siteName]
        setBlockedSites(copy)
    }

    useEffect(() => {
        getBlockedSites()
    }, [])

    const temp = {
        'https://reddit.com': true,
        'https://google.com': true,
        'https://wiki.com': true,
        'https://youtube.com': true,
        'https://netflix.com': true,
        'https:://hulu.com': true,
    }
    const siteCardsJsx = Object.keys(blockedSites ?? temp).map((site) => (
        <SiteCard siteName={site} removeSite={() => removeBlockedSite(site)} />
    ))

    const glowColor = 'gray'
    return (
        <Flex
            boxShadow={`0 0 5px 5px ${glowColor}, 0 0 10px 10px ${glowColor}, 0 0 10px 15px ${glowColor}, 0 0 50px 20px ${glowColor}`}
            h={'100%'}
            w={'100%'}
            overflow={'auto'}
            flexWrap={'wrap'}
            borderRadius={'7px'}
            alignItems={'flex-start'}
            alignContent={'flex-start'}
            justifyContent={'flex-start'}
        >
            {siteCardsJsx}
        </Flex>
    )
}

export default BlockedSites
