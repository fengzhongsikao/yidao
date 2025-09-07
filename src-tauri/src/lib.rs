// mod about_json;
use serde::Deserialize;
use serde::Serialize;
use std::env;
use std::fs;
use tauri::path::BaseDirectory;
use tauri::AppHandle;
use tauri::Manager;
use tauri_plugin_log::log;
use tauri_plugin_http::reqwest;

use serde_json::Value;

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

#[tauri::command]
async fn fetch_external_data(url: String) -> Result<String, String> {
    let client = reqwest::Client::new();

    let response = client
        .get(&url)
        .header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
        .send()
        .await
        .map_err(|e| format!("网络错误: {}", e))?;

    if !response.status().is_success() {
        return Err(format!("HTTP错误: {}", response.status()));
    }

    // 先获取完整的响应文本
    let full_text = response
        .text()
        .await
        .map_err(|e| format!("读取响应失败: {}", e))?;

    // 解析为JSON Value
    let full_json: Value = serde_json::from_str(&full_text)
        .map_err(|e| format!("JSON解析错误: {}", e))?;

    // 检查code字段
    if let Some(code) = full_json.get("code").and_then(|c| c.as_i64()) {
        if code != 1 {
            let msg = full_json.get("msg").and_then(|m| m.as_str()).unwrap_or("未知错误");
            return Err(format!("API错误: {} - {}", code, msg));
        }
    }

    // 提取data字段
    if let Some(data) = full_json.get("data") {
        serde_json::to_string(data)
            .map_err(|e| format!("序列化错误: {}", e))
    } else {
        Err("响应中缺少data字段".to_string())
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![json,fetch_external_data])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
