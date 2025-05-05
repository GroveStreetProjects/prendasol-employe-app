import { TouchableOpacity } from 'react-native'
import { Href, router, Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';

import ThemedText from '@/components/shared/ThemedText'
import ThemedView from '@/components/shared/ThemedView'
import { allRoutes, rutasCliente, rutasEmpenio } from '@/constants/Routes'
import { Colors } from '@/constants/Colors';

const TabsLayout = () => {
  return (
    <ThemedView className='flex flex-1 flex-row'>
      <Sidebar />
      <ThemedView className='flex-1'>
        <Stack
          screenOptions={{
            headerShadowVisible: false,
          }}
        >
          {
            allRoutes.map(route => (
              <Stack.Screen
                key={route.name}
                name={route.name}
                options={{
                  title: route.title,
                  contentStyle: {
                    backgroundColor: '#ffffff'
                  }
                }}
              />
            ))
          }
        </Stack>
      </ThemedView>
    </ThemedView>
  )
}

const Sidebar = () => {

  return (
    <ThemedView className='w-[220] p-4 flex'>
      <ThemedText type='h1' className='text-center'>Prendasol</ThemedText>
      <ThemedView className='flex flex-1 justify-center'>

        <TouchableOpacity className='py-3 flex flex-row items-center' onPress={() => router.navigate('/inicio')}>
          <Ionicons
            name='home-outline'
            size={30}
            color={Colors.light.text}
          />
          <ThemedText className='pl-2'>Inicio</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity className='py-3 flex flex-row items-center'>
          <Ionicons
            name='pricetag-outline'
            size={30}
            color={Colors.light.text}
          />
          <ThemedText className='pl-2'>Empeños</ThemedText>
        </TouchableOpacity>
        {
          rutasEmpenio.map(route => {
            const [routeName] = route.name.split('/');
            return (
              <TouchableOpacity
                key={route.title}
                className='py-3 pl-[38]'
                onPress={() => router.navigate(routeName as Href)}>
                <ThemedText>· {route.title}</ThemedText>
              </TouchableOpacity>
            )
          })
        }

        <TouchableOpacity className='py-3 flex flex-row items-center'>
          <Ionicons
            name='person-outline'
            size={30}
            color={Colors.light.text}
          />
          <ThemedText className='pl-2'>Clientes</ThemedText>
        </TouchableOpacity>
        {
          rutasCliente.map(route => {
            const [routeName] = route.name.split('/');
            return (
              <TouchableOpacity
                key={route.title}
                className='py-3 pl-4'
                onPress={() => router.navigate(routeName as Href)}>
                <ThemedText>{route.title}</ThemedText>
              </TouchableOpacity>
            )
          })
        }

      </ThemedView>
    </ThemedView>
  );
};

export default TabsLayout