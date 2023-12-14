window['isWasmCardanoSerializationLibLoaded'] = false

const { Buffer } = require('buffer')
const wasmHeaders = require('./cardano_serialization_lib_bg')
const wasmBase64Lib = require('./cardano_serialization_lib_bg-in-base-64.wasm')

async function load() {
    if (window['isWasmCardanoSerializationLibLoaded']) {
        return
    }

    window['isWasmCardanoSerializationLibLoaded'] = true

    const { instance } = await WebAssembly.instantiate(
        Buffer.from(wasmBase64Lib),
        { './cardano_serialization_lib_bg.js': wasmHeaders }
    )
    wasmHeaders.setWasm(instance.exports)
}

module.exports = {
    load,
    ...wasmHeaders,
}
