import { HeaderComponents , SearchBar  } from './sharedComponents'

import { ImageList , PreviousSearches } from './imagesComponents'


import { robots } from './mock-data/robots.mocks'

import './index.css'


export const ImageApp = () => {


  return (
    <>        
        <HeaderComponents 
            title="Busca tu imagen"
            text="Bienvenido a la pagina para buscar tus imagenes favoritas"
            />

        
        <SearchBar  
            placeHolder="Ingrese el nombre de su imagen"/>

        
       <PreviousSearches 
            searches={['protoman','snakeman','bubleman','quickman']}
       />

        
        <ImageList 
            robots={ robots } />
       
    </>
  )
}
