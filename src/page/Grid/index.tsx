import {quan} from '@/values/quangua.ts';

import {useNavigate} from 'react-router-dom'
function itemList() {
    const  navigator=useNavigate();
    return (
        <div className='grid grid-cols-8 gap-4 mt-20 mr-10 mb-20 ml-10'>

            {quan.map((item, index) => (
                <button className="bg-gray-200 w-25 h-12 px-0 py-auto " key={index}
                        onClick={() => navigator('portraitDetail')}>{item}-{index + 1}</button>
            ))}
        </div>
    );
}

export default itemList;