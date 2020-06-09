import { useReducer, useContext, createContext } from 'react'
import entityReducer from '../../redux/entities/entiryReducer';
import musicReducer from '../../redux/music/musicReducer'

const DataStateContext = createContext();
const DataDispatchContext = createContext();

export const DataProvider = ({children}) => {
    const [state, dispatch] = useReducer(entityReducer, 0)

    return (
        <DataDispatchContext.Provider value={dispatch}>
          <DataStateContext.Provider value={state}>
            {children}
          </DataStateContext.Provider>
        </DataDispatchContext.Provider>
      )
}

export const useData = () => useContext(DataStateContext);
export const useDispatchData = () => useContext(DataDispatchContext)
