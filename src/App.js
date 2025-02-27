import Header from './Header';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import SearchItem from './SearchItem';
import { useState, useEffect } from 'react';
import apiRequest from './apiRequest';

function App() {
    const API_URL = 'http://localhost:3500/items'

    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [search, setSearch] = useState('');
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      
      const fetchItems = async () => {
        try {
          const res = await fetch(API_URL);
          if(!res.ok) throw Error('Did not receive expected data.');
          const listItems =await res.json();
          setItems(listItems);
          setFetchError(null);
        } catch (err) {
          setFetchError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      setTimeout(() => {
        (async () => await fetchItems())();
      }, 2000)
      
    }, [])

    
    const addItem =  async (item) => {
      const id = items.length ? items[items.length - 1].id + 1 : 1
      const myNewItem = { id, checked: false, item }
      const listItems = [...items, myNewItem]
      setItems(listItems);

      const postOption = {
        method: 'POSt',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(myNewItem)
      }
      const result = await apiRequest(API_URL, postOption);
      if(result) setFetchError(result);
    }
    
    const handleCheck = async (id) => {
      const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item)
      setItems(listItems);
      const myItem = items.filter((item) => item.id === id);
      const updateOption = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({checked: myItem[0].checked})
      }
      const reqUrl = `${API_URL}/${id}`
      const result = await apiRequest(reqUrl, updateOption);
      if(result) setFetchError(result);
    }

    const handleDelete = async (id) => {
      const listItems = items.filter((item) => item.id !== id);
      setItems(listItems);
      const deleteOption = { method: 'DELETE'}
      const reqUrl = `${API_URL}/${id}`
      const result = await apiRequest(reqUrl, deleteOption);
      if(result) setFetchError(result);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      if(!newItem) return;
      addItem(newItem);
      setNewItem('');
    }


  return (
    <div className="App">
      <Header  title="Grocery Lists"/>
      <AddItem newItem={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit}/>
      <SearchItem  search={search} setSearch={setSearch}/>
      <main>
        {isLoading && <p>Loading items...</p>}
        {fetchError && <p style={{color: "red"}}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))} 
        handleCheck={handleCheck} 
        handleDelete={handleDelete}/>}
      </main>
      <Footer  items={items.length}/>
      
    </div>
  );
}

export default App;
