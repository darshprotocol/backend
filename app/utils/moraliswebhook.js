const decoder = require('./decoder.js')

exports.resolve = (request) => {
    const webhook = request.body

    let collection = webhook.tag
    console.log('webhook', webhook)

    if (!webhook || !webhook.logs || webhook.confirmed) return null

    try {
        for (const log of webhook.logs) {
            const format = decoder.format(collection)
            
            console.log('inouts', webhook.abi[0].inputs)

            // abi format does not exists for event data
            if (format == null || typeof format === 'undefined') continue

            const data = decoder.decode(format, log.data)
            console.log('data', data)

            return decoder.toObject(collection, data)
        }
    } catch (error) {
        return null
    }

    return null
}