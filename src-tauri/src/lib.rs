// mod about_json;
use serde::Deserialize;
use serde::Serialize;
use std::env;
use std::fs;
use tauri::path::BaseDirectory;
use tauri::AppHandle;
use tauri::Manager;
use tauri_plugin_log::log;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Guashu {
    id: u32,
    gua_name: String,
    up_down: String,
    gua_ci: String,
    yao_ci: Vec<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct GuashuData {
    data: Vec<Guashu>,
}

#[tauri::command]
fn json(app: AppHandle) -> Result<Vec<Guashu>, String> {
    let data_path = app
        .path()
        .resolve("data.json", BaseDirectory::Resource)
        .map_err(|e| {
            log::error!("Failed to resolve data.json path: {e}");
            "Unable to resolve data.json path"
        })?;

    let json_data = fs::read_to_string(data_path).map_err(|e| {
        log::error!("Unable to read file: {e}");
        "Unable to read file"
    })?;

    // 解析JSON数据
    let guashu_data: GuashuData = serde_json::from_str(&json_data).map_err(|e| {
        log::error!("Failed to parse JSON: {e}");
        "JSON was not well-formatted"
    })?;

    // for guashu in &guashu_data.data {
    //     println!("ID: {}", guashu.id);
    //     println!("卦名: {}", guashu.gua_name);
    //     println!("上下: {}", guashu.up_down);
    //     println!("卦辞: {}", guashu.gua_ci);
    //     println!("爻辞:");
    //     for yao in &guashu.yao_ci {
    //         println!("  {}", yao);
    //     }
    // }
    // let GuashuData { data } = guashu_data;
    Ok(guashu_data.data)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![json])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
