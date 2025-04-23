import React from 'react'
import cl from './Header.module.css'
import { Flex, Grid, Link as ChakraLink, Button, Avatar } from '@chakra-ui/react'
import Logo from '../UI/Logo'
import { navbarLinks } from '../../utils/constants'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalStore } from '../../store/global'
import { showHeaderContent } from '../../utils/logic'
import HeaderContent from '../HeaderContent/HeaderContent'

function Header() {
    const navigate = useNavigate()
    const currentPage = useGlobalStore(state => state.currentPage)
    const whiteNavbar = showHeaderContent(currentPage)
    const color = whiteNavbar ? 'white' : 'var(--equator-black)'
    const user = useGlobalStore(state => state.user)

    return (
        <Grid>
            <Grid className={cl.navbar}>
                <Logo black={!whiteNavbar} />
                <Flex className={cl.links}>
                    {navbarLinks.map(link => (
                        <ChakraLink
                            as={Link}
                            to={link.to}
                            key={`navbar-${link.to}`}
                            color={color}
                            _hover={{textShadow: `.4px .4px 0 ${color}`}}
                            _focus={{outline: "0"}}
                        >
                            {link.text}
                        </ChakraLink>
                    ))}
                </Flex>
                {
                    user
                    ?
                    <Avatar.Root
                        size='lg'
                        className={cl.avatar}
                        onClick={() => navigate('/profile')}
                    >
                        <Avatar.Fallback
                            name={user.last_name && user.first_name && `${user.last_name} ${user.first_name}`}
                        />
                        <Avatar.Image src={user.avatar} />
                    </Avatar.Root>
                    :
                    <Button
                        variant={whiteNavbar ? 'whiteOutline' : 'blackOutline'}
                        className={cl.loginBtn}
                        onClick={() => navigate('/auth/login')}
                    >
                        Войти
                    </Button>
                }
            </Grid>
            <HeaderContent />
        </Grid>
    )
}

export default Header
