// mod about_json;
use serde::{Deserialize, Serialize};
use std::env;
use std::fs;
#[derive(Serialize, Deserialize, Debug)]
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
fn json() -> Vec<Guashu> {
    // let current_dir = env::current_dir();
    // let current_path = current_dir.unwrap().join("assets\\data.json");

    // let json_data = fs::read_to_string(current_path).unwrap().to_string();

    // // 解析JSON数据
    // let guashu_data: GuashuData =
    //     serde_json::from_str(&json_data).expect("JSON was not well-formatted");

    // // println!("{:?}", guashu_data);

    // // for guashu in guashu_data.data {
    // //     println!("ID: {}", guashu.id);
    // //     println!("卦名: {}", guashu.gua_name);
    // //     println!("上下: {}", guashu.up_down);
    // //     println!("卦辞: {}", guashu.gua_ci);
    // //     println!("爻辞:");
    // //     for yao in guashu.yao_ci {
    // //         println!("  {}", yao);
    // //     }
    // // }
    // guashu_data.data


  let current_dir = env::current_dir()
        .expect("无法获取当前目录");
    
    let current_path = current_dir.join("assets\\data.json");
    
    let json_data = fs::read_to_string(&current_path)
        .expect(&format!("无法读取文件 {}", current_path.display()));
    
    // 解析JSON数据
    let guashu_data: GuashuData = serde_json::from_str(&json_data)
        .expect("JSON解析失败");
    
    guashu_data.data
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
