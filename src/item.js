
function Item(props) {
    return (
        <div className="item">
            <li>{props.item}</li>
            <button onClick={() => {props.delete(props.id)}}>x</button>
            <button onClick={() => {props.update(props.id)}}>Update</button>
        </div>
    )
}

export default Item;