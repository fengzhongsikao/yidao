pub mod my_lib{
    use std::fs;
    use serde::{Deserialize, Serialize};
    use std::env;
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



    pub fn gua_data() ->  Vec<Guashu> {

        let current_dir = env::current_dir();
        let current_path = current_dir.unwrap().join("assets\\data.json");

        let json_data = fs::read_to_string(current_path).unwrap().to_string();


        // 解析JSON数据
        let guashu_data:GuashuData = serde_json::from_str(&json_data).expect("JSON was not well-formatted");

        // println!("{:?}", guashu_data);

        // for guashu in guashu_data.data {
        //     println!("ID: {}", guashu.id);
        //     println!("卦名: {}", guashu.gua_name);
        //     println!("上下: {}", guashu.up_down);
        //     println!("卦辞: {}", guashu.gua_ci);
        //     println!("爻辞:");
        //     for yao in guashu.yao_ci {
        //         println!("  {}", yao);
        //     }
        // }
        guashu_data.data
    }
}
