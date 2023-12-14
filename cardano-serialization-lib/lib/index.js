let isLibLoaded = false
let loadPromise = null

const { Buffer } = require('buffer')
const wasmHeaders = require('./cardano_serialization_lib_bg')
const wasmBase64Lib = require('./cardano_serialization_lib_bg-in-base-64.wasm')

function load() {
    if (isLibLoaded) {
        return
    }

    loadPromise = WebAssembly.instantiate(
        Buffer.from(wasmBase64Lib, 'base64'),
        { './cardano_serialization_lib_bg.js': wasmHeaders }
    )
        .then(({ instance }) => wasmHeaders.setWasm(instance.exports))
        .catch(error => { throw error })

    isLibLoaded = true
    return loadPromise
}

module.exports = {
    load,
    ...wasmHeaders,
}
