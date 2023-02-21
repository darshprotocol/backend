const decoder = require('./decoder.js')

exports.resolve = (request) => {
    const webhook = request.body
    let collection = webhook.tag

    if (!webhook || !webhook.logs) return null

    try {
        for (const log of webhook.logs) {
            const format = decoder.format(collection)
            
            // abi format does not exists for event data
            if (format == null || typeof format === 'undefined') continue

            const data = decoder.decode(format, log.data)

            return decoder.toObject(collection, data)
        }
    } catch (error) {
        console.error(error);
        return null
    }
}