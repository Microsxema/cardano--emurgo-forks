let isLibLoaded = false

const { Buffer } = require("buffer")
const wasmHeaders = require('./cardano_message_signing')
const wasmBase64Lib = require('./cardano-message-signing-in-base-64.wasm')

async function load() {
    if (isLibLoaded) {
        return
    }

    isLibLoaded = true

    const { instance } = await WebAssembly.instantiate(
        Buffer.from(wasmBase64Lib),
        { '__wbindgen_placeholder__': wasmHeaders },
    )
    wasmHeaders.setWasm(instance.exports)
}

module.exports = {
    load,
    ...wasmHeaders,
}
