import { PEOPLE } from './people-mock.mjs'

export async function getPerson(id) {
    return PEOPLE.find((person) => person.id == id)
}