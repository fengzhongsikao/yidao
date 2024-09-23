// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

mod about_json;
use tauri::Manager;

#[tauri::command]
fn json()-> Vec<crate::about_json::get_json::my_lib::Guashu>{
    about_json::get_json::my_lib::gua_data()
}



#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init()).setup(|app| {
        #[cfg(debug_assertions)] // 仅在调试构建时包含此代码
        {
            let window = app.get_webview_window("main").unwrap();
            window.open_devtools();
        }
        Ok(())
    })
        .invoke_handler(tauri::generate_handler![greet,json])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
