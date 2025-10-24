import { useEffect, useState } from 'react'

import { HeaderComponents , SearchBar  } from './sharedComponents'
import { ImageList , PreviousSearches } from './imagesComponents'

import { getImagesByQuery } from './actions/get-images-by-query.actions'
import { getImages } from './actions/get-images.actions'


import './index.css'
import type { robotsProps } from './interfaces/images.interfaces'
import type { responseProps } from './interfaces/images.interfaces'



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

  const handleTermClicked = ( term:string ) => {
    console.log({ term });
  }

  
  const handleSearch = async( query:string ) => {
        
    query = query.trim().toLowerCase();

    if(query.length === 0){     
      // Si la búsqueda está vacía, mostrar todos los robots
      setImages(allImages);
      return;
    }

    if(imagenPrevia.includes(query)) return;
    
    //Cuando usas la función de actualización con callback
    //en un useState que maneja arreglos react automaticamente
    //te pasa el valor más recientemente del estado como parametro
    //por ende nos entrega el arreglo como viene antes de insertar 
    //un nuevo elemento.
    setImagenPrevia((prevSearches) => {
      const updatedSearches = [query, ...prevSearches].slice(0,7);
      return updatedSearches;
    })

    try{         
      const searchResult = await getImagesByQuery(query);         
    
      if(searchResult.robot) {
          console.log('✅ Primer robot:', searchResult.robot); // Debug
          setImages([searchResult.robot]);
      } else {
          return;           
      }
    } catch(error) {
        console.error(`🚨 Error en búsqueda: ${error}`);
        setImages([]);
    }
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
            searches={ imagenPrevia }
            onLabelClicked = { handleTermClicked }
       />

        
        <ImageList 
            robots={ images } />
       
    </>
  )
}
