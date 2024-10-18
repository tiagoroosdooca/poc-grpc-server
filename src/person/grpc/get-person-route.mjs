import grpc from '@grpc/grpc-js'
import { getPerson } from '../get-person.mjs'

export async function getPersonRoute(call, callback) {
    const id = call.request.id
    const person = await getPerson(id)
    if (!person) {
        callback({
            code: grpc.status.NOT_FOUND,
            details: 'Person not found',
            metadata: new grpc.Metadata()
        })
        return
    }
    callback(null, person)
}