import React from 'react'
import { Stack } from 'expo-router'
import { allRoutes } from '@/constants/Routes'

const TabsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {
        allRoutes.map(route => (
          <Stack.Screen
            key={route.name}
            name={route.name}
            options={{
              title: route.title,
            }}
          />
        ))
      }
    </Stack>
  )
}

export default TabsLayout