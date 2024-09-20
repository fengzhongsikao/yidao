import {useNavigate} from "react-router-dom";

function detailItem(){
    const  navigator=useNavigate();
    return (
        <button onClick={()=>navigator(-1)}>返回</button>
    );
}

export default detailItem;