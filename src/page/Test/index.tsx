import { message } from '@tauri-apps/plugin-dialog';
function Test(){

    return (
        <div>
            test
            <button onClick={dia}>
                hello
            </button>
        </div>
    )
}

export async function dia() {
    await message('File not found', {title: 'Tauri', kind: 'error'});
}

export default Test;