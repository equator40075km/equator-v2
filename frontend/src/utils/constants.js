export const navbarLinks = [
    { to: '/articles', text: 'Статьи' },
    { to: '/tours', text: 'Туры' },
    { to: '/projects', text: 'Наши проекты' },
    { to: '/about', text: 'О нас' },
]

export const loginPageTexts = {
    login: {
        title: 'Войдите, чтобы начать путешествие',
        vk: 'Войти через ВКонтакте',
        google: 'Войти через Google',
        password: 'Пароль',
        btn: 'Войти',
        link_text: 'Еще нет профиля? ',
        link: 'Зарегистрируйтесь'
    },
    register: {
        title: 'Создайте профиль, чтобы начать путешествие',
        vk: 'Создать через ВКонтакте',
        google: 'Создать через Google',
        password: 'Придумайте пароль',
        btn: 'Создать',
        link_text: 'Уже есть профиль? ',
        link: 'Войти'
    },
}

export const mainPageCardLinks = [
    {
        title: 'Выберите тур',
        description: 'Какой нибудь текст про то какие у нас классные направления туров',
        image: '/static/img/card-link-tours.jpeg',
        url: '/tours',
        external: false,
    },
    {
        title: 'Найдите выгодные былеты',
        description: 'Какой нибудь текст про то что у нас есть классный телеграмм бот в котором можно найти дешевые билеты',
        image: '/static/img/card-link-tickets.jpeg',
        url: 'https://t.me/equator_tickets_bot',
        external: true,
    },
    {
        title: 'Забронируйте отель',
        description: 'Текст про то какой у нас классный бот в телеге для бронирования',
        image: '/static/img/card-link-hotels.jpeg',
        url: 'https://ostrovok.tp.st/4j2wgDAq',
        external: true,
    },
]
