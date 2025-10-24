import { useCallback, useEffect, useState } from 'react'

import { HeaderComponents , SearchBar  } from './sharedComponents'
import { ImageList , PreviousSearches } from './imagesComponents'

import { getImagesByQuery } from './actions/get-images-by-query.actions'
import { getImages } from './actions/get-images.actions'


import './index.css'
import type { robotsProps } from './interfaces/images.interfaces'


export const ImageApp = () => {

  const [ imagenPrevia , setImagenPrevia ] = useState<string[]>([]);
  const [ images , setImages ] = useState<robotsProps[]>([]);
  const [ allImages , setAllImages ] = useState<robotsProps[]>([]);
  

  useEffect(() => {    
    const fetchData = async() => {
      try{          
          const data = await getImages();
          const robots = data.robots;          
          setImages(robots);
          setAllImages(robots);
      }catch(error){
        console.error(`Error en fetchin data ${ error }`);
      }
    }

    fetchData();
  },[])

  const handleTermClicked = useCallback((term:string) => {    
     handleSearch(term);    
  },[]);// ← dependencias vacías porque handleSearch no cambia
  
  const handleSearch = useCallback(async( query:string ) => {
        
    query = query.trim().toLowerCase();

    if(query.length === 0){      
      setImages(allImages);
      return;
    }

    // Actualizar historial SOLO si el término no es el primero en la lista
    setImagenPrevia((prevSearches) => {
      // Si el término ya es el primero, no actualizar (evitar bucle)
      if(prevSearches[0] === query) {          
          return prevSearches;
      }
               
      const filteredSearches = prevSearches.filter((term) => {
          return term.toLocaleLowerCase() !== query;
      });
      // Agregar el nuevo término al inicio
      const updatedSearches = [query, ...filteredSearches].slice(0,7);      
      return updatedSearches;
    });
    

    try{      
      const searchResult = await getImagesByQuery(query);

      if(searchResult.robot) {          
          setImages([searchResult.robot]);
      } else {          
          return;           
      }
    } catch(error) {        
        setImages([]);
    }
  },[allImages]);

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
            searches={ imagenPrevia }
            onLabelClicked = { handleTermClicked }
       />

        
        <ImageList 
            robots={ images } />
       
    </>
  )
}
