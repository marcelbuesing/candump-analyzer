mod utils;

use wasm_bindgen::prelude::*;
use can_dbc::DBC;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn run() -> Result<(), JsValue> {
    set_panic_hook();
    Ok(())
}

fn set_panic_hook() {
    // When the `console_error_panic_hook` feature is enabled, we can call the
    // `set_panic_hook` function to get better error messages if we ever panic.
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();
}

#[wasm_bindgen]
pub fn from_dbc(dbc_in: &str) -> JsValue {
    let dbc = DBC::from_slice(dbc_in.as_bytes()).expect("Failed to parse dbc file");
    JsValue::from_serde(&dbc).unwrap()
}