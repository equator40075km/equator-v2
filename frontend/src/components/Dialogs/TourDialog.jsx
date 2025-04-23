import React, { useEffect, useState } from 'react'
import { Button, Checkbox, CloseButton, Dialog, Field, Grid, Input, Portal, useDialog } from '@chakra-ui/react'
import { useTourDialogStore } from '../../store/dialogs'
import AdminService from '../../API/AdminService'
import { toaster } from '../UI/chakra/toaster'
import { useAdminStore } from '../../store/admin'

function TourDialog() {
    const dialog = useDialog()
    const setTourDialog = useTourDialogStore(state => state.setDialog)
    const updateAdminTours = useAdminStore(state => state.updateAdminTours)
    const addAdminTour = useAdminStore(state => state.addAdminTour)
    const tour = useTourDialogStore(state => state.tour)
    const setTour = useTourDialogStore(state => state.setTour)
    const isChange = useTourDialogStore(state => state.isChange)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setTourDialog(dialog)
    }, [])

    useEffect(() => {
        setData({
            title: tour ? tour.title : '',
            img: tour ? tour.img : '',
            active: tour ? tour.active : false, 
        })
    }, [tour])

    const changeTour = () => {
        setLoading(true)
        toaster.promise(
            isChange ? AdminService.updateTour(tour.id, data) : AdminService.createTour(data),
            {
                success: (response) => {
                    if (isChange)
                        updateAdminTours(response.data)
                    else
                        addAdminTour({...response.data, dates: []})
                    dialog.setOpen(false)
                    return { title: `Тур ${isChange ? 'изменён' : 'создан'}` }
                },
                error: { title: `Не удалось ${isChange ? 'изменить' : 'создать'} тур` },
                loading: { title: `${isChange ? 'Изменяем' : 'Создаём'} тур...` },
                finally: () => setLoading(false)
            }
        )
    }

    return (
        <Dialog.RootProvider value={dialog} onExitComplete={() => setTour(null)} >
            <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content>
                <Dialog.Header>
                    <Dialog.Title>
                        {isChange ? 'Редактирование тура' : 'Создание тура'}
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <Grid gap='var(--small-gap)'>
                        <Field.Root>
                            <Field.Label fontWeight='bold'>Название тура</Field.Label>
                            <Input
                                value={data && data.title}
                                onChange={e => setData({...data, title: e.target.value})}
                            />
                        </Field.Root>
                        <Field.Root>
                            <Field.Label fontWeight='bold'>Ссылка на изображение</Field.Label>
                            <Input
                                value={data && data.img}
                                onChange={e => setData({...data, img: e.target.value})}
                            />
                        </Field.Root>
                        <Field.Root>
                            <Field.Label fontWeight='bold'>Статус тура</Field.Label>
                            <Checkbox.Root
                                checked={data && data.active}
                                onCheckedChange={e => setData({...data, active: !!e.checked})}
                                colorPalette='green'
                                size='sm'
                                _hover={{ cursor: 'pointer' }}
                            >
                                <Checkbox.HiddenInput />
                                <Checkbox.Control />
                                <Checkbox.Label>действующий тур</Checkbox.Label>
                            </Checkbox.Root>
                        </Field.Root>
                    </Grid>
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
                        disabled={loading}
                        onClick={changeTour}
                    >
                        {isChange ? `Сохранить` : 'Создать'}
                    </Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                </Dialog.CloseTrigger>
                </Dialog.Content>
            </Dialog.Positioner>
            </Portal>
        </Dialog.RootProvider>
    )
}

export default TourDialog