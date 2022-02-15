import Box from "./Box";

//creating the 7 by 6 board.
const Board = (props) => {
    return <div onClick={() => props.handleClick()}>
    {[...Array(props.box.length)].map((x, j) => 
        <Box key={j} value={props.box[j]}></Box>)}
    </div>
}

export default Board;