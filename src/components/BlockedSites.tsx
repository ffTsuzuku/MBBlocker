import {
    Flex,
    Box,
    Image,
    Text,
    Grid,
    InputGroup,
    Input,
    InputRightElement,
    Button,
    InputLeftElement,
    Select,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {
    getExtensionData,
    extensionData,
    setSiteStatus,
} from '../utility/storage'

import { IoMdClose } from 'react-icons/io'
import { isSimilar } from '../utility/strings'

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

type BlockedSiteDDOperations = 'Add' | 'Filter'

const BlockedSites = () => {
    const [blockedSites, setBlockedSites] = useState<extensionData['list']>()
    const [ddOperation, setDDOperation] =
        useState<BlockedSiteDDOperations>('Filter')
    const [inputValue, setInputValue] = useState<string>()

    const getBlockedSites = async () => {
        const data = await getExtensionData()
        const { list: blockedSites } = data
        console.log('bsites', blockedSites)
        setBlockedSites(blockedSites)
    }

    const removeBlockedSite = async (siteName: string) => {
        setSiteStatus(siteName, false)
        const copy = { ...blockedSites }
        delete copy[siteName]
        setBlockedSites(copy)
    }

    const addSiteToBlockList = async (siteName: string) => {
        setSiteStatus(siteName, true)
    }

    const filterBlockList = async (query: string) => {
        console.log({
            query,
            list: blockedSites?.list,
        })
        if (!query) return blockedSites?.list ?? {}
        const sites: extensionData['list'] = {}
        Object.keys(blockedSites?.list ?? {}).forEach((site) => {
            if (isSimilar(query, site)) {
                sites[site] = true
            }
        })
        return sites
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
    const ddPlaceholder = ddOperation == 'Add' ? 'Add Website' : 'Filter List'
    const ddCallback =
        ddOperation == 'Add' ? addSiteToBlockList : filterBlockList

    const siteCardsJsx = Object.keys(
        filterBlockList(inputValue ?? '') ?? temp
    ).map((site) => (
        <SiteCard siteName={site} removeSite={() => removeBlockedSite(site)} />
    ))

    console.log('list', filterBlockList(inputValue ?? ''))
    const glowColor = 'gray'
    return (
        <Grid
            h={'100%'}
            w={'100%'}
            gridTemplateRows={'4fr .5fr'}
            boxShadow={`0 0 5px 5px ${glowColor}, 0 0 10px 10px ${glowColor}, 0 0 10px 15px ${glowColor}, 0 0 50px 20px ${glowColor}`}
        >
            <Flex
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
            <Flex
                border={'1px solid'}
                shadow={'lg'}
                backgroundColor={'blackAlpha.500'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <InputGroup size='md' w={'40%'}>
                    <Input
                        color={'whiteAlpha.500'}
                        pr='4.5rem'
                        pl='7rem'
                        type={'text'}
                        placeholder={ddPlaceholder}
                        value={inputValue}
                        onChange={(input) => setInputValue(input.target.value)}
                    />
                    <InputLeftElement width={'6.5rem'}>
                        <Select
                            backgroundColor={'white'}
                            onChange={(input) =>
                                setDDOperation(
                                    input.target
                                        .value as BlockedSiteDDOperations
                                )
                            }
                        >
                            <option value={'Filter'} color='black'>
                                Filter
                            </option>
                            <option value={'Add'}>Add</option>
                        </Select>
                    </InputLeftElement>
                    <InputRightElement width='4.5rem'>
                        <Button
                            h='1.75rem'
                            size='sm'
                            onClick={() => ddCallback(inputValue ?? '')}
                        >
                            {'Enter'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Flex>
        </Grid>
    )
}

export default BlockedSites
