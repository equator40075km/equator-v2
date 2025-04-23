import React, { useEffect, useState } from 'react'
import { Button, CloseButton, Dialog, Field, Flex, Input, Portal } from '@chakra-ui/react'
import { useFetching } from '../../hooks/useFetching'
import { toaster } from '../UI/chakra/toaster'
import AdminService from '../../API/AdminService'
import { useTourStore } from '../../store/tours'

function CreateDateDialog({open, setOpen}) {
    const dates = useTourStore(state => state.tourDates)
    const setDates = useTourStore(state => state.setTourDates)
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')

    const [createDate, isCreating, createError] = useFetching(async () => {
        const response = await AdminService.createTourDate(start, end)
        if (response?.status === 201) {
            setDates([...dates, response.data])
            toaster.success({ title: 'Даты созданы' })
        }
        setOpen(false)
        setStart('')
        setEnd('')
    })

    useEffect(() => {
        if (createError)
            toaster.error({ title: 'Не удалось создать даты' })
    }, [createError])

    return (
        <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
            <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content>
                <Dialog.Header>
                    <Dialog.Title>Создание дат тура</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <Flex
                        flexWrap='wrap'
                        gap='var(--small-gap)'
                        justify='space-between'
                    >
                        <Field.Root maxW='200px'>
                            <Field.Label>Дата старта тура</Field.Label>
                            <Input
                                size='sm'
                                type='date'
                                value={start}
                                onChange={e => setStart(e.target.value)}
                            />
                        </Field.Root>
                        <Field.Root maxW='200px'>
                            <Field.Label>Дата окончания тура</Field.Label>
                            <Input
                                size='sm'
                                type='date'
                                value={end}
                                onChange={e => setEnd(e.target.value)}
                            />
                        </Field.Root>
                    </Flex>
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                        <Button variant='blackOutline' size='sm'>
                            Отмена
                        </Button>
                    </Dialog.ActionTrigger>
                    <Button
                        variant='greenOutline'
                        size='sm'
                        disabled={isCreating}
                        onClick={createDate}
                    >
                        Создать
                    </Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                </Dialog.CloseTrigger>
                </Dialog.Content>
            </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

export default CreateDateDialog
