import { FlatList, View, Text } from 'react-native'


const menu = [{encabezado: 'Inicio'}, {encabezado: 'Articulos'}];

const Inicio = () => {
  return (
    <>
      <View>
        <Text className="text-4xl text-bold m-5 text-center">Inicio</Text>
      </View>

      <View className="absolute top-0 right-0">
        <View className=''>
          <Text className="hidden m-5">Menu</Text>
        </View>
        <View className="bg-blue-400 flex justify-content items-center" style={{width: 250, height: 800}}>
          <FlatList 
            data={menu}
            renderItem={({ item }) => <Text className="mt-20 pr-20 pl-20 pt-3 pb-3 rounded-full bg-blue-300">{item.encabezado}</Text>}
            keyExtractor={item => item.encabezado}
          />
        </View>
      </View>
    </>
  )
}

export default Inicio