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
    addSiteToBlackList,
    removeSiteFromBlackList,
} from '../utility/storage'

import { site } from '../utility/storage'

import { IoMdClose } from 'react-icons/io'
import { isSimilar } from '../utility/strings'
import {
    siteRecordToUrl,
    urlToSiteRecord,
    createValidURL,
} from '../utility/tabs'

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
                isTruncated={true}
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
    const [blockedSites, setBlockedSites] = useState<extensionData['list']>([])
    const [ddOperation, setDDOperation] =
        useState<BlockedSiteDDOperations>('Filter')
    const [inputValue, setInputValue] = useState<string>('')

    const getBlockedSites = async () => {
        const data = await getExtensionData()
        const { list: blockedSites } = data
        setBlockedSites(blockedSites)
    }

    const removeBlockedSite = async (siteName: string) => {
        try {
            const siteToRemove = urlToSiteRecord(siteName)
            removeSiteFromBlackList(siteToRemove)
            const copy = [...blockedSites]
            const updatedCopy = copy.filter((site) => {
                return (
                    siteToRemove.domain != site.domain ||
                    siteToRemove.path != site.path
                )
            })
            setBlockedSites(updatedCopy)
        } catch (e) {}
    }

    const addSiteToBlockList = async (siteName: string) => {
        try {
            const url = urlToSiteRecord(siteName)
            console.log('attempting to block', url)
            addSiteToBlackList(url)
        } catch (e) {}
    }

    const filterBlockList = (query: string): extensionData['list'] => {
        if (!query) return blockedSites ?? []
        const sites: extensionData['list'] = blockedSites ?? []
        const relevantSites = sites.filter((site) => {
            if (isSimilar(query, site.domain, 0.45)) {
                return true
            } else if (isSimilar(query, site.path, 0.45)) {
                return true
            }
        })
        return relevantSites
    }

    const handleSubmit = (value: string) => {
        if (ddOperation === 'Add') {
            const site = urlToSiteRecord(value)
            addSiteToBlackList(site)
            const copy = [...blockedSites]
            copy.push(site)
            setBlockedSites(copy)
        } else {
            filterBlockList(value)
        }
    }

    useEffect(() => {
        getBlockedSites()
    }, [])

    const temp: site[] = [
        {
            domain: 'https://reddit.com',
            path: '',
        },
    ]

    const ddPlaceholder = ddOperation == 'Add' ? 'Add Website' : 'Filter List'
    const ddCallback =
        ddOperation == 'Add' ? addSiteToBlockList : filterBlockList

    const siteCardsJsx = (
        ddOperation === 'Filter'
            ? filterBlockList(inputValue ?? '')
            : blockedSites ?? []
    ).map((site) => (
        <SiteCard
            siteName={site.domain}
            removeSite={() => removeBlockedSite(siteRecordToUrl(site))}
        />
    ))

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
                            onClick={() => handleSubmit(inputValue)}
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
