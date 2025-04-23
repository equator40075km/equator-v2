import React from 'react'
import { ButtonGroup, Flex, IconButton } from '@chakra-ui/react'
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

function Pagination({ pagination, disabled, ...props }) {
    return (
        <Flex {...props} justify='center'>
            <ButtonGroup>
                <IconButton
                    variant='green'
                    onClick={pagination.prev}
                    size='xs'
                    disabled={pagination.page === 1 || disabled}
                >
                    <LuChevronLeft />
                </IconButton>

                {Array.from({ length: pagination.maxPage }, (_, i) => i + 1).map((page) => (
                    <IconButton
                        variant='green'
                        onClick={() => pagination.jump(page)}
                        size='xs'
                        disabled={pagination.page === page || disabled}
                        key={`pagination-btn-${page}`}
                    >
                        {page}
                    </IconButton>
                ))}

                <IconButton
                    variant='green'
                    onClick={pagination.next}
                    size='xs'
                    disabled={pagination.page === pagination.maxPage || disabled}
                >
                    <LuChevronRight />
                </IconButton>
            </ButtonGroup>
        </Flex>
    )
}

export default Pagination