const wasmHeaders = require('./cardano_message_signing')
const wasmBase64Lib = require('./cardano-message-signing-in-base-64.wasm')

const wasmModule = new WebAssembly.Module(
    Buffer.from(wasmBase64Lib, 'base64'),
)

const wasmInstance = new WebAssembly.Instance(
    wasmModule,
    { '__wbindgen_placeholder__': wasmHeaders },
)

wasmHeaders.setWasm(wasmInstance.exports)

module.exports = wasmHeaders
