
import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';

const ItemDetailView = ({ itemId, fetchItemDetails }) => {
    const [item, setItems] = useState()
    useEffect(() => {
        const fetchDataFromApi = async () => {
          const data = await fetchItemDetails(itemId);
          setItems(data)
        };
        fetchDataFromApi();
    }, [itemId, fetchItemDetails]);
    console.log('Child component re-renderd due to props change');
  return (
    <View key={itemId} style={{ paddingTop: 20}}>
      {/* Display fetched details here */}
      <Text>Details of Item</Text>
      <Text>Item Name : {item?.title} </Text>
      <Text>Brand : {item?.brand}</Text>
      <Text>category : {item?.category}</Text>
      <Text>description : {item?.description}</Text>
      <View style={{flexDirection:'row', overflow:'scroll'}}>
        {item?.images?.map((img, index)=> <View key={index} style={{margin:5, marginTop:15}}><Image src={img} style={{width:50, height: 50}} /></View>)}
      </View>
    </View>
  );
};

export default React.memo(ItemDetailView);
