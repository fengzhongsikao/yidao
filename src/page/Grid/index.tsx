import {quan} from '@/values/quangua.ts';

import {useNavigate} from 'react-router'
import Button from "@mui/material/Button";

function itemList() {
    const navigator = useNavigate();
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, minmax(0, 1fr))',
            gap: '1rem',
            marginTop: '5rem',
            marginRight: '2.5rem',
            marginBottom: '5rem',
            marginLeft: '2.5rem'
        }}>
            {quan.map((item, index) => (
                <Button key={index} variant={quan.indexOf(item) === index ? "outlined":"contained"} onClick={() =>
                    navigator('/portraitDetail?id='+index)} sx={{ maxWidth: 'fit-content' }}>{item}</Button>
            ))}
        </div>

    );
}

export default itemList;