import { memo  } from "react";


interface Props {
    searches: string[];
    onLabelClicked?: (term:string) => void;
}


export const PreviousSearches = memo(({searches , onLabelClicked}:Props) => {

  
  const handleClick = (termino: string) => {
        console.log('🖱️ Click en término:', termino);
        onLabelClicked && onLabelClicked(termino);
  };

  return (
     <div className="previous-searches">
        <h2>Búsquedas previas</h2>
        <ul className="previous-searches-list">
            {
                searches.map( ( termino ) => {
                    return (
                        <li 
                            key={ termino }
                            onClick={ () => handleClick(termino) }
                            >{ termino }</li>
                    )
                })
            }
        </ul>
    </div>
  )
})
