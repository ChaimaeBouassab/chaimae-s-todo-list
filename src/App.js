import React, { useState } from "react";
import "./App.css";

function App() {
  const backgroundStyle = {
    backgroundImage: 'url("/babeeeen.png")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };
  // State Hook - `useState`
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  const [showEdit, setShowEdit] = useState(-1);
  const [updatedText, setUpdatedText] = useState("");

  // Helper Functions

  /* Adds a new item to the list array*/
  function addItem() {
    // ! Check for empty item
    if (!newItem) {
      alert("Please enter an item.");
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    };

    // Add new item to items array
    setItems((oldList) => [...oldList, item]);

    // Reset newItem back to the original state
    setNewItem("");
  }

  /* Deletes an item based on the `item.id` key */
  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  }

  /* Edit an item text after creating it. */
  function editItem(id, newText) {
    // Get the current item
    const currentItem = items.find((item) => item.id === id);

    if (!currentItem) {
      return;
    }

    // Create a new item with the same id
    const newItem = {
      id: currentItem.id,
      value: newText,
    };

    // Find the index of the item to replace
    const itemIndex = items.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return;
    }

    // Replace the item in the item list
    const updatedItems = [...items];
    updatedItems[itemIndex] = newItem;

    setItems(updatedItems);
    setUpdatedText("");
    setShowEdit(-1);
  }

  // Main part of app
  return (
    <div style={backgroundStyle} className="app">
      {/* 1. Header  */}
      <h1>Chaimae's To-Do List</h1>

      {/* 2. Add new item (input) */}
      <input
        type="text"
        placeholder="Add an item..."
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />

      {/* Add (button) */}
      <button onClick={() => addItem()}>Add</button>

      {/* 3. List of todos (unordered list) */}
      <ul>
        {items.map((item) => {
          return (
            <div>
              <li key={item.id} onClick={() => setShowEdit(item.id)}>
                {item.value}
                <button
                  className="delete-button"
                  onClick={() => deleteItem(item.id)}
                >
                  ❌
                </button>
              </li>

              {showEdit === item.id ? (
                <div>
                  <input
                    type="text"
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                  />
                  <button onClick={() => editItem(item.id, updatedText)}>
                    Update
                  </button>
                </div>
              ) : null}
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
