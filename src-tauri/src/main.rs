// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

mod about_json;
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
#[tauri::command]
fn test()-> Vec<crate::about_json::get_json::my_lib::Guashu>{
     about_json::get_json::my_lib::gua_data()
}



fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet,test])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
