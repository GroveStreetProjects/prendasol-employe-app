import React, { useState } from 'react';
import { FlatList, View, Text, Button } from 'react-native'


const menu = [{encabezado: 'Inicio'}, {encabezado: 'Articulos'}];

const Inicio = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <View>
        <Text className="text-4xl text-bold m-5 text-center">Inicio</Text>
      </View>

      <View className="absolute top-0 right-0 z-10">
        <View style={{display: isVisible ? 'flex' : 'none'}}>
          <Text className="m-5" onPress={toggleVisibility}>Menu</Text>
        </View>
        <View style={{width: 250, height: 800, display: isVisible ? 'none' : 'flex'}} className="bg-blue-400 justify-content items-center">
          <Button title='Salida' onPress={toggleVisibility}/>
          <FlatList
            data={menu}
            renderItem={({ item }) => <Text className="mt-20 pr-20 pl-20 pt-3 pb-3 rounded-full bg-blue-300">{item.encabezado}</Text>}
            keyExtractor={item => item.encabezado}
          />
        </View>
      </View>

      <View className='flex justify-center items-center p-10 m-10 bg-blue-400 rounded-3xl z-1'>
        <Text className='text-2xl font-bold'>Articulos empeñados</Text>
        <Text className='text-2xl'>4</Text>
      </View>

      <View className='flex justify-center items-center p-10 m-10 bg-yellow-500 rounded-3xl z-1'>
        <Text className='text-2xl font-bold'>Articulos en vencimiento</Text>
        <Text className='text-2xl'>8</Text>
      </View>

      <View className='flex justify-center items-center p-10 m-10 bg-red-600 rounded-3xl z-1'>
        <Text className='text-2xl font-bold'>Articulos expirados</Text>
        <Text className='text-2xl'>1</Text>
      </View>

    </>
  )
}

export default Inicio