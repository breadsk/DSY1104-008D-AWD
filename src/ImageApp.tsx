import { HeaderComponents , SearchBar  } from './sharedComponents'

import { ImageList , PreviousSearches } from './imagesComponents'


import { robots } from './mock-data/robots.mocks'

import './index.css'


export const ImageApp = () => {

  //Comunicación entre componentes
  const handleTermClicked = ( term:string ) => {
    console.log({ term });
  }

  //Query a la consulta que el usuario escriba
  const handleSearch = ( query:string ) => {
    console.log(query);
  }

  return (
    <>        
        <HeaderComponents 
            title="Busca tu imagen"
            text="Bienvenido a la pagina para buscar tus imagenes favoritas"
            />

        
        <SearchBar  
            placeHolder="Ingrese el nombre de su imagen"
            onQuery = { handleSearch }
            />

        
       <PreviousSearches 
            searches={['protoman','snakeman','bubleman','quickman']}
            onLabelClicked = { handleTermClicked }
       />

        
        <ImageList 
            robots={ robots } />
       
    </>
  )
}
