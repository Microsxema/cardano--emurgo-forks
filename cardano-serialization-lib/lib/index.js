const wasmHeaders = require('./cardano_serialization_lib_bg')
const wasmBase64Lib = require('./cardano_serialization_lib_bg-in-base-64.wasm')

const wasmModule = new WebAssembly.Module(
    Buffer.from(wasmBase64Lib, 'base64'),
)

const wasmInstance = new WebAssembly.Instance(
    wasmModule,
    { './cardano_serialization_lib_bg.js': wasmHeaders },
)

wasmHeaders.setWasm(wasmInstance.exports)

module.exports = wasmHeaders
