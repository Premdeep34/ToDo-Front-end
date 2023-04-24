import './App.css';
import { useEffect, useState } from 'react';
import Item from './item';

function App() {
  const [item, setItem] = useState("");
  const [itemList, setItemList] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [id, setId] = useState(-1);

  //------------Calling the get API
  useEffect(() => {
    fetch("http://localhost:8080/todos").then((result) => {
      result.json().then((resp) => {
        result = resp.map(toDos => toDos.toDo);
        setItemList(result);
      })
    })
  }, []);

  //---------- Calling the add API
  function addToDo() {
    let id = itemList.length + 1;
    const data = {
      "id": id,
      "toDo": item, 
      "completed": false};

    fetch("http://localhost:8080/todos", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((result) => {
      console.log(result);
    })
  }

  //------------ Calling the update API
  function updateToDo(id, toDo) {
    let item = {
      "id": id,
      "toDo": toDo,
      "completed": false
    };

    fetch("http://localhost:8080/todos", {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp);
      })
    })
  }

//-------------- Calling the delete API
 function deleteToDo(id) {
  fetch(`http://localhost:8080/todos/${id}`, {
    method: 'DELETE'
  }).then((result) => {
    result.json().then((resp) => {
      console.log(resp);
    })
  })
 }

  const addItem = () => {
    if (toggle) {
      addToDo();
      setItem("");
      setItemList((oldItems) => {
        return [...oldItems, item];
      })
    } else {
      updateToDo(id + 1, item);
      const updateList = itemList;
      updateList[id] = item;
      // console.log(updateList);
      setItemList(updateList);
      setToggle(true);
      setItem("");
    }
  };

  const updateItem = (id) => {
    setToggle(false);
    setItem(itemList[id]);
    setId(id);
  }

  const deleteItem = (id) => {
    deleteToDo(id + 1);

    setItemList((oldItems) => {
      return oldItems.filter((item, idx) => {
        return id !== idx;
      })
    })
  };

  return (
    <div className='main_div'>
      <div className='center_div'>
        <br />
        <h1>ToDo List</h1>
        <br />
        <input type='text'
          placeholder='Enter an Item'
          value={item}
          onChange={(e) => {setItem(e.target.value)}} />
        <button onClick={addItem}>
          {toggle ? "+" : "Update"}
        </button>

        <ul>
          {itemList.map((item, index) => {
            return <Item 
            item={item} 
            key={index} 
            id={index}
            update={updateItem}
            delete={deleteItem}/>
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
