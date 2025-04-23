import React, { useEffect, useRef, useState } from 'react'
import cl from './Tours.module.css'
import { Box, Button, Flex, Grid, Heading, Input, Text } from '@chakra-ui/react'
import TourService from '../../API/TourService'
import TourPreview from '../../components/TourPreview/TourPreview'
import Select from '../../components/UI/Select'
import { getDateFromUTC } from '../../utils/datetime'
import { useTourStore } from '../../store/tours'
import { toaster } from '../../components/UI/chakra/toaster'

function Tours() {
    const formRef = useRef(null)
    const tours = useTourStore(state => state.tours)
    const fetchTours = useTourStore(state => state.fetchTours)
    const [selectedTour, setSelectedTour] = useState(null)
    const [selectedDate, setSelectedDate] = useState(null)
    const [contact, setContact] = useState('')
    const [requestLoading, setRequestLoading] = useState(false)

    useEffect(() => {
        if (tours.length < 1)
            fetchTours()
    }, [])

    const createTourRequest = async () => {
        setRequestLoading(true)
        toaster.promise(
            TourService.createTourRequest(selectedTour.id, selectedDate.id, contact),
            {
                success: () => {
                    setSelectedTour(null)
                    setSelectedDate(null)
                    setContact('')
                    return { title: 'Заявка на тур создана', description: 'С вами свяжутся в ближайшее время' }
                },
                error: (e) => {
                    if (e?.status === 401)
                        return {
                            title: 'Ошибка авторизации',
                            description: 'Для записи необходимо зарегистрироваться или войти в учетную запись'
                        }
                    if (e?.status === 409)
                        return { title: 'Невозможно создать заявку', description: 'У вас есть неподтвержденные заявки на тур' }
                    if (e?.status === 422)
                        return { title: 'Некорректный способ связи' }
                    return { title: 'Не удалось создать заявку на тур' }
                },
                loading: { title: 'Создаем заявку на тур' },
                finally: () => setRequestLoading(false)
            }
        )
    }

    return (
        <Grid className={cl.container}>
            <Box position='relative'>
                <Flex className={cl.warning}>
                    <Heading>На данный момент EQUATOR не организовывает туры</Heading>
                </Flex>
            </Box>
            <Grid gap='var(--small-gap)'>
                <Heading>Куда с нами можно поехать?</Heading>
                <Text>
                    {'Сейчас мы путешествуем в четырех разных направлениях, которые кардинально отличаются друг от друга. '}
                    {'Но мы растем с каждым днем и скоро откроем новые горизонты.'}
                </Text>
            </Grid>
            {tours.map((tour, i) => (
                <TourPreview
                    tour={tour}
                    number={i + 1}
                    scrollRef={formRef}
                    key={tour.id}
                />
            ))}
            <Grid className={cl.form} ref={formRef}>
                <Heading
                    size='3xl'
                    textAlign='center'
                >
                    Забронируйте поездку уже сейчас
                </Heading>
                <Select
                    isSearchable={false}
                    placeholder='Куда хотите поехать'
                    options={tours.map(t => {return {...t, value: t.id, label: t.title}})}
                    defaultValue={selectedTour}
                    value={selectedTour}
                    onChange={setSelectedTour}
                />
                <Select
                    isSearchable={false}
                    noOptionsMessage={() => 'Выберите тур'}
                    placeholder='Когда хотите поехать'
                    options={selectedTour?.dates && selectedTour.dates.map(d => {
                        return {...d, value: d.id, label: `${getDateFromUTC(d.start)} - ${getDateFromUTC(d.end)}`}
                    })}
                    defaultValue={selectedDate}
                    value={selectedDate}
                    onChange={setSelectedDate}
                />
                <Input
                    variant='green'
                    placeholder='Способ связи (номер телефона/ссылка на соц. сеть)'
                    value={contact}
                    onChange={e => setContact(e.target.value)}
                />
                <Button
                    variant='green'
                    disabled={requestLoading || !selectedTour || !selectedDate || contact.length < 11}
                    onClick={createTourRequest}
                >
                    Забронировать
                </Button>
            </Grid>
        </Grid>
    )
}

export default Tours
