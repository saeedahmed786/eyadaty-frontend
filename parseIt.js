import { parse } from 'bson';
import { useEffect, useState } from 'react';

export const ParseBson = () => {
    const [bsonData, setBsonData] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const bsonFile = parse(event.target.result);
            console.log(bsonFile)
            setBsonData(bsonFile);
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            {bsonData ? <p>{JSON.stringify(bsonData)}</p> : null}
        </div>
    );
}
