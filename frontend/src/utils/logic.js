const pagesWithHeaderContent = [
    '/', '/tour-detail',
]

export const showHeaderContent = (location) => {
    return pagesWithHeaderContent.includes(location)
}

export const userHasAccess = (user, roleIdentifier) => {
    if (!user || user?.roles === undefined)
        return false
    const roleIdentifiers = user.roles.map(r => r.identifier)
    if (roleIdentifiers.includes('admin'))
        return true
    return roleIdentifiers.includes(roleIdentifier)
}

export const userHasRole = (user, roleIdentifier) => {
    if (!user || user?.roles === undefined)
        return false
    return user.roles.map(r => r.identifier).includes(roleIdentifier)
}
