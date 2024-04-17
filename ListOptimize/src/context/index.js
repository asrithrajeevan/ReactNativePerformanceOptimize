import React,{ createContext, useContext, useEffect, useState } from "react";
import { Dimensions, LogBox, View, useWindowDimensions} from "react-native";

export const CreateDimentionsContext = createContext()
export const useDimentionsContext = () => useContext(CreateDimentionsContext) // the only defferent is we use this useContext hook here itself. and we can import it from anywhere

const DimentionsContextProvider = ({children}) => {         // We can import DimentionsContextProvider in our main file.
                                                            // In this case we use the DimentionsContextProvider in our app index. Once we use this in our app the dimentions can use any where from our project.
    const dimentions = useWindowDimensions()                // when the dimention change the usestate will update
    const initHeight = Dimensions.get('window').height
    const initWidth = Dimensions.get('window').width

    const [windowHeight, setHeight] = useState(initHeight)
    const [windowWidth, setWidth] = useState(initWidth)
    
    const [portrait, setPortrait] = useState(false);

    const checkIsPortrait = () => {
        return (initHeight >= initWidth);
    }

    useEffect(() => {
        setPortrait(checkIsPortrait())
        Dimensions.addEventListener('change', () => {
            setPortrait(checkIsPortrait())
        })
        // console.warn("portal");
    },[dimentions]);
    

    useEffect(() => {
        ResetDimentions()
    }, [dimentions])

    const ResetDimentions = () => {
        const {height, width} = dimentions
        setHeight(height)
        setWidth(width)
    }
    return(
        <CreateDimentionsContext.Provider
            value={{
                windowHeight,
                windowWidth,
                portrait
            }}
        >
            {children}
        </CreateDimentionsContext.Provider>
    )
}

export default DimentionsContextProvider

// here we make availability of getWidht and getHeight all places within our project. by using the DimentionsContextProvider as a component our pain app file