import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDimentionsContext } from '../../context'
import styles from './style'
import axios from 'axios'
import ItemDetailView from '../ItemDetailView'
const API_URL = 'https://dummyjson.com/products'

const ItemComponent = ({ item, fetchItemDetails }) => {
    const [selectedItemId, setSelectedItemId] = useState(null);
    const dimentions = useDimentionsContext()
    // Define the memoized computation function
    const responsiveStyle = styles(dimentions.windowHeight, dimentions.windowWidth, dimentions.portrait)
    const heavyComputation = useMemo(() => {
        const startTime = Date.now();
        // Simulating heavy computation
        for (let i = 0; i < 100000000; i++) {}
        const endTime = Date.now();
        console.log(`Heavy computation time for item ${item?.title}: ${endTime - startTime}ms`);
        return `Details for ${item?.title}`;
    }, [item]); // Re-run memo function if item data changes

    return(
        <View style={responsiveStyle.flatlistContainer}>
            <TouchableOpacity style={responsiveStyle.flatlistTouchable} onPress={()=>setSelectedItemId(item.id)}>
                <View>
                    <Text>ID : {item.id}</Text>
                    <Text>Title : {item.title}</Text>
                </View>
                <View>
                    <Image src={item.thumbnail} style={{width:40, height:40}}/>
                </View>
            </TouchableOpacity>
            {selectedItemId === item.id ? (<ItemDetailView itemId={selectedItemId} fetchItemDetails={fetchItemDetails} />) : ''}
        </View>
    )
}  

const Home = () => {
    const dimentions = useDimentionsContext()
    const responsiveStyle = styles(dimentions.windowHeight, dimentions.windowWidth, dimentions.portrait)
    const [data, setData] = useState([])
    useEffect(()=>{
        fetchData()
    },[])

    //fetch data uing axios
    const fetchData = async () => {
        try {
            await axios.get(API_URL).then(res=>{
                if(res.data){
                    setData(res.data.products)
                }
            })
        } catch (error) {
            console.log('Error Catched-->',error);
        }
    }

    const fetchItemDetails = useCallback(async (itemId) => {
        try {
            const response = await axios.get(`https://dummyjson.com/products/${itemId}`);
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            console.error('Error fetching item details:', error);
            throw error;
        }
    }, []);

    const renderItem = ({ item }) => <ItemComponent  item={item} fetchItemDetails={fetchItemDetails}/>

  return (
    <View style={responsiveStyle.container}>
        <FlatList 
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
        />
    </View>
  )
  
}
export default React.memo(Home)