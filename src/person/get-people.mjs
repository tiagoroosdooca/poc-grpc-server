import { PEOPLE } from './people-mock.mjs'

export async function getPeople(filter) {
    if (filter) {
        const byName = (person) => person.name === (filter.name || person.name)
        const byEmail = (person) => person.email === (filter.email || person.email)
        const byIdBiggerThan = (person) => person.id > (filter.idBiggerThan || 0)
        return PEOPLE.filter(byName).filter(byEmail).filter(byIdBiggerThan)
    }
    return PEOPLE
}