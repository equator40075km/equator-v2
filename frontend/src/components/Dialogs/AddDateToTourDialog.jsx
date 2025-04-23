import React, { useEffect, useState } from 'react'
import { Button, CloseButton, Dialog, Flex, Portal, useDialog } from '@chakra-ui/react'
import { useTourStore } from '../../store/tours'
import { useAddDateToTourDialogStore } from '../../store/dialogs'
import { toaster } from '../UI/chakra/toaster'
import AdminService from '../../API/AdminService'
import { getDateFromUTC } from '../../utils/datetime'
import { useAdminStore } from '../../store/admin'

function AddDateToTourDialog() {
    const dialog = useDialog()
    const setDialog = useAddDateToTourDialogStore(state => state.setDialog)
    const tour = useAddDateToTourDialogStore(state => state.tour)
    const setTour = useAddDateToTourDialogStore(state => state.setTour)
    const dates = useTourStore(state => state.tourDates)
    const fetchDates = useTourStore(state => state.fetchTourDates)
    const updateAdminTours = useAdminStore(state => state.updateAdminTours)
    const [loading, setLoading] = useState(false)
    const [filteredDates, setFilteredDates] = useState([])
    const [selectedDate, setSelectedDate] = useState(null)

    useEffect(() => {
        setDialog(dialog)
        if (dates.length < 1)
            fetchDates()
    }, [])

    useEffect(() => {
        if (tour) {
            const tourDatesIds = tour.dates.map(d => d.id)
            setFilteredDates(dates.filter(d => !tourDatesIds.includes(d.id)))
        }
    }, [tour])

    const addDateToTour = () => {
        setLoading(true)
        toaster.promise(
            AdminService.addDateToTour(tour.id, selectedDate.id),
            {
                success: () => {
                    updateAdminTours({...tour, dates: [...tour.dates, selectedDate]})
                    dialog.setOpen(false)
                    return { title: 'Дата добавлена к туру' }
                },
                error: { title: 'Не удалось добавить дату к туру' },
                loading: { title: 'Добавляем дату к туру' },
                finally: () => setLoading(false)
            }
        )
    }

    const onExitComplete = () => {
        setSelectedDate(null)
        setTour(null)
    }

    return (
        <Dialog.RootProvider value={dialog} onExitComplete={onExitComplete} size='xl'>
            <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content>
                <Dialog.Header>
                    <Dialog.Title>Добавление даты тура</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <Flex flexWrap='wrap' gap='6px'>
                        {filteredDates.map(date => (
                            <Button
                                key={date.id}
                                variant='greenOutline'
                                size='xs'
                                onClick={() => setSelectedDate(date)}
                                style={selectedDate && date.id === selectedDate.id ? {
                                    backgroundColor: 'var(--equator-green)',
                                    color: 'white',
                                } : {}}
                                _hover={{ backgroundColor: 'green.50', color: 'var(--equator-green)' }}
                            >
                                {`${getDateFromUTC(date.start)} – ${getDateFromUTC(date.end)}`}
                            </Button>
                        ))}
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
                        disabled={loading}
                        onClick={addDateToTour}
                    >
                        Добавить
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

export default AddDateToTourDialog