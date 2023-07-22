import Box from "./Box";

function BoxContainer({n}) {
    const boxes = [...Array(n).keys()]; // generate an array [0, 1, ..., n-1]

    return (
        <div style={{
            display: 'flex', 
            flexWrap: 'wrap',
            height: '60px'
        }}>
            {boxes.map((num, index) => <Box/>)}
        </div>
    );
}

export default BoxContainer;
