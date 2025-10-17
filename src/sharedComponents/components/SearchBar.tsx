import { useState , useEffect , type FC , type KeyboardEvent, use } from "react";

interface Props{
    placeHolder:string;
    onQuery: (query:string) => void;
}


export const SearchBar:FC<Props> = ({ placeHolder , onQuery}) => {

  const [ query , setQuery ] = useState('Hola');

  // const handleSearch = ( query:string ) => {
  //   console.log(query);
  // }  onQuery = handleSearch
  useEffect(()=> {
    
    const timeOutId = setTimeout(()=> {
      onQuery(query)
    },700)

    return () => {
      //mont & dismount
      clearTimeout(timeOutId) // debounce 
    }

  },[query , onQuery])
  
  


  // const handleSearch = ( query:string ) => {
  //   console.log(query);
  // }  onQuery = handleSearch
  const handleSearch = () => {
    onQuery(query);
  }

  const handleKeyDown = (event:KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter'){
      console.log("Se apretó enter");
    }
  }

  return (
    <div className="search-container">
        <h2>{ query }</h2>
        <input
          type="text" 
          placeholder={ placeHolder }
          value={ query }

          onChange={( event ) => {
            setQuery(event.target.value)
          }}

          onKeyDown={
            handleKeyDown            
          }          
          />
        <button
          onClick={ handleSearch }
        >Buscar</button>
    </div>
  )
}
