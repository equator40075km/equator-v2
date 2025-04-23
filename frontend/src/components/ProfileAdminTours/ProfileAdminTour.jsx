import React, { useState } from 'react'
import cl from './ProfileAdminTour.module.css'
import { Button, Flex, Grid, Heading, Tag } from '@chakra-ui/react'
import { getDateFromUTC } from '../../utils/datetime'
import ImageWithLoader from '../ImageWithLoader/ImageWithLoader'
import { IoMdAdd } from "react-icons/io";
import { useAddDateToTourDialogStore, useTourDialogStore } from '../../store/dialogs'
import { toaster } from '../UI/chakra/toaster'
import AdminService from '../../API/AdminService'
import { useAdminStore } from '../../store/admin'

function ProfileAdminTour({tour}) {
    const tourDialog = useTourDialogStore(state => state.dialog)
    const setDialogTour = useTourDialogStore(state => state.setTour)
    const setDialogIsChange = useTourDialogStore(state => state.setIsChange)
    const addDateDialog = useAddDateToTourDialogStore(state => state.dialog)
    const setAddDateDialogTour = useAddDateToTourDialogStore(state => state.setTour)
    const [dateDeleting, setDateDeleting] = useState(false)
    const updateAdminTours = useAdminStore(state => state.updateAdminTours)

    const deleteDateFromTour = (dateId) => {
        setDateDeleting(true)
        toaster.promise(
            AdminService.deleteDateFromTour(tour.id, dateId),
            {
                success: () => {
                    updateAdminTours({...tour, dates: tour.dates.filter(d => d.id !== dateId)})
                    return { title: 'Дата тура удалена' }
                },
                error: { title: 'Не удалось удалить дату тура' },
                loading: { title: 'Удаляем дату тура' },
                finally: () => setDateDeleting(false)
            }
        )
    }

    return (
        <Grid className={cl.container}>
            <Flex className={cl.tour}>
                <Heading size='xl'>{tour.title}</Heading>
                <Tag.Root
                    size='lg'
                    marginRight='auto'
                    variant={tour.active ? 'green' : 'orange'}
                >
                    <Tag.Label>
                        {tour.active ? 'Действующий тур' : 'Деактивирован'}
                    </Tag.Label>
                </Tag.Root>
                <Button
                    size='xs'
                    variant='green'
                    marginRight='auto'
                    onClick={() => {
                        setDialogIsChange(true)
                        setDialogTour(tour)
                        tourDialog.setOpen(true)
                    }}
                >
                    Редактировать тур
                </Button>
                <Heading size='lg' as='h3'>Даты тура</Heading>
                <Flex className={cl.dates}>
                    {tour.dates.map(date => (
                        <Tag.Root size='lg' key={date.id}>
                            <Tag.Label>
                                {`${getDateFromUTC(date.start)} – ${getDateFromUTC(date.end)}`}
                            </Tag.Label>
                            <Tag.EndElement>
                                <Tag.CloseTrigger
                                    disabled={dateDeleting}
                                    onClick={() => deleteDateFromTour(date.id)}
                                    _hover={{ cursor: 'pointer' }}
                                />
                            </Tag.EndElement>
                        </Tag.Root>
                    ))}
                    <Tag.Root
                        size='lg'
                        onClick={() => {
                            setAddDateDialogTour(tour)
                            addDateDialog.setOpen(true)
                        }}
                        _hover={{
                            bg: 'green.50',
                            cursor: 'pointer',
                        }}
                    >
                        <IoMdAdd />
                    </Tag.Root>
                </Flex>
            </Flex>
            <ImageWithLoader
                src={tour.img}
                alt='Tour image'
                borderRadius='var(--border-radius)'
            />
        </Grid>
    )
}

export default ProfileAdminTour