import { getPeople } from '../get-people.mjs'

export async function getPeopleRoute(call, callback) {
    const filter = call.request
    const people = await getPeople(filter)
    for (const person of people) {
        call.write(person)
    }
    call.end()
}