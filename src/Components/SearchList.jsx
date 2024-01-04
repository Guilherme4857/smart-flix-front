import '../styles/SearchList.css'

export default function SearchList({itensFinded, handleItemClick}) {

    return (
        <>
        {
            itensFinded.length > 0 ?
                <div className='search-list-container'>
                    <ul className="search-list list-group">
                        {
                            itensFinded.map(item => (
                                <button 
                                    key={ item.id } 
                                    type='button'
                                    value={ item.id } 
                                    className="list-group-item list-group-item-action"
                                    onClick={ handleItemClick }
                                >
                                    { item.name }
                                </button>
                            ))
                        }           
                    </ul>
                </div>
            :
            undefined
            } 
        </>
    )
}
