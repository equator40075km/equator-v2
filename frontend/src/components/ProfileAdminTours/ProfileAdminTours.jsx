import React, { useEffect } from 'react'
import cl from './ProfileAdminTours.module.css'
import { Button, Flex, Separator } from '@chakra-ui/react'
import TourDates from './TourDates'
import ProfileAdminTour from './ProfileAdminTour'
import { useAdminStore } from '../../store/admin'
import TourDialog from '../Dialogs/TourDialog'
import AddDateToTourDialog from '../Dialogs/AddDateToTourDialog'
import { useTourDialogStore } from '../../store/dialogs'

function ProfileAdminTours() {
    const tours = useAdminStore(state => state.adminTours)
    const fetchTours = useAdminStore(state => state.fetchAdminTours)
    const tourDialog = useTourDialogStore(state => state.dialog)
    const setDialogIsChange = useTourDialogStore(state => state.setIsChange)

    useEffect(() => {
        if (tours.length < 1)
            fetchTours()
    }, [])

    return (
        <Flex className={cl.wrapper}>
            <TourDates />
            <Separator />
            <Button
                variant='green'
                onClick={() => {
                    setDialogIsChange(false)
                    tourDialog.setOpen(true)
                }}
            >
                Создать новый тур
            </Button>
            {tours.map(tour => (
                <ProfileAdminTour tour={tour} key={tour.id} />
            ))}
            <TourDialog />
            <AddDateToTourDialog />
        </Flex>
    )
}

export default ProfileAdminTours
