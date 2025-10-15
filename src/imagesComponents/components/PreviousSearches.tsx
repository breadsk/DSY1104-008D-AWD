
interface Props {
    searches: string[];
}


export const PreviousSearches = ({searches}:Props) => {
  return (
     <div className="previous-searches">
        <h2>Búsquedas previas</h2>
        <ul className="previous-searches-list">
            {
                searches.map( ( termino ) => {
                    return (
                        <li key={ termino }>{ termino }</li>
                    )
                })
            }
        </ul>
    </div>
  )
}
