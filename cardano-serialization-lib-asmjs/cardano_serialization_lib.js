const wasm = require("./cardano_serialization_lib.asm.js");
const CardanoWasm = require("./cardano_serialization_lib_bg.js");
CardanoWasm.__wbg_set_wasm(wasm);
module.exports = CardanoWasm
