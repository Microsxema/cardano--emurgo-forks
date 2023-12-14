let isLibLoaded = false

const { Buffer } = require('buffer')
const wasmHeaders = require('./cardano_serialization_lib_bg')
const wasmBase64Lib = require('./cardano_serialization_lib_bg-in-base-64.wasm')

async function load() {
    if (isLibLoaded) {
        return
    }

    isLibLoaded = true

    const { instance } = await WebAssembly.instantiate(
        Buffer.from(wasmBase64Lib, 'base64'),
        { './cardano_serialization_lib_bg.js': wasmHeaders }
    )
    wasmHeaders.setWasm(instance.exports)
}

module.exports = {
    load,
    ...wasmHeaders,
}
