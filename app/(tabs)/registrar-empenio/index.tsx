import { useState } from 'react';
import { TextInput, ScrollView, KeyboardType, Alert, TouchableOpacity } from 'react-native'

import ThemedView from '@/components/shared/ThemedView';
import ThemedText from '@/components/shared/ThemedText';

interface ClientData {
  [key: string]: string | number;
}

interface ArticleData {
  [key: string]: string | number | Date;
}

interface FormData {
  cliente: ClientData;
  articulo: ArticleData;
}

interface FormSection {
  [key: string]: any;
}

const RegistrarEmpenio = () => {

  const [formData, setFormData] = useState<{
    cliente: FormSection;
    articulo: FormSection;
  }>({
    cliente: {},
    articulo: {},
  });

  const fieldsClient = [
    {
      label: 'Id',
      name: 'Id',
      placeholder: '',
      type: 'numeric',
      required: false,
    },
    {
      label: 'Cédula de Identidad',
      name: 'CI',
      placeholder: '1234567...',
      type: 'text',
      required: true,
    },
    {
      label: 'Nombres',
      name: 'Nombres',
      placeholder: 'Juan Fernando...',
      type: 'text',
      required: true,
    },
    {
      label: 'Apellido Paterno',
      name: 'Paterno',
      placeholder: 'Pérez...',
      type: 'text',
      required: false,
    },
    {
      label: 'Apellido Materno',
      name: 'Materno',
      placeholder: 'Martínez...',
      type: 'text',
      required: false,
    },
    {
      label: 'Correo Electrónico',
      name: 'Correo',
      placeholder: 'correo@correo.com...',
      type: 'email',
      required: true,
    },
    {
      label: 'Teléfono',
      name: 'Telefono',
      placeholder: '70123456...',
      type: 'phone',
      required: true,
    },
  ];

  const fieldsArticle = [
    {
      label: 'Nombre',
      name: 'Nombre',
      placeholder: 'Anillo de oro...',
      type: 'text',
      required: true,
    },
    {
      label: 'Descripción',
      name: 'Descripcion',
      placeholder: 'Anillo de oro de 18k...',
      type: 'text',
      required: true,
    },
    {
      label: 'Precio de Empeño',
      name: 'Precio_Empeno',
      placeholder: '800.00...',
      type: 'numeric',
      required: true,
    },
  ];

  const handleInputChange = (
    section: 'cliente' | 'articulo',
    name: string,
    value: string | number
  ) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [name]: value
      }
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('localhost:3000/registrar-cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', 'Datos enviados correctamente');
        setFormData({
          cliente: {},
          articulo: {},
        });
      } else {
        Alert.alert('Error', data.message || 'Error al enviar datos');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema con la conexión');
      console.error('Error al enviar datos:', error);
    }
  };

  return (
    <ThemedView className='flex-1 bg-light-background rounded-tl-3xl'>
      <ThemedText type='semi-bold' className="text-center py-4">Registrar Emepeño</ThemedText>
      <ScrollView className='flex flex-1 p-6 mx-[50] bg-white rounded-3xl items-center'>

        <ThemedText type='h2' className='text-center pb-2 font-semibold'>Datos del Cliente</ThemedText>
        <ThemedView className='flex flex-row flex-wrap gap-4 justify-center'>
          {
            fieldsClient.map((item, index) => {
              const isRequiredAndEmpty = item.required && (!formData.articulo[item.name] || formData.articulo[item.name] === '');
              return index !== 0
                ? (
                  <ThemedView className='w-[250]' key={item.name}>
                    <ThemedText>
                      {item.label}
                      {item.required
                        ? ' *'
                        : null}
                    </ThemedText>
                    <TextInput
                      className={`border rounded-xl p-2 text-gray-500  ${isRequiredAndEmpty ? 'border-red-500' : ''}`}
                      placeholder={item.placeholder}
                      value={formData.cliente[item.name] || ''}
                      onChangeText={(text) => handleInputChange('cliente', item.name, text)}
                      keyboardType={item.type as KeyboardType}
                      textContentType='emailAddress'
                    />
                  </ThemedView>
                )
                : null;
            })
          }
        </ThemedView>

        <ThemedText type='h2' className='text-center pb-2 font-semibold'>Datos del Artículo</ThemedText>
        <ThemedView className='flex flex-row flex-wrap gap-4 justify-center'>
          {
            fieldsArticle.map((item) => {
              const isRequiredAndEmpty = item.required && (!formData.articulo[item.name] || formData.articulo[item.name] === '');
              return (
                <ThemedView className='w-[250]' key={item.name}>
                  <ThemedText>
                    {item.label}
                    {item.required
                      ? ' *'
                      : null}
                  </ThemedText>
                  <TextInput
                    className={`border rounded-xl p-2 text-gray-500 ${isRequiredAndEmpty ? 'border-red-500' : ''}`}
                    placeholder={item.placeholder}
                    value={formData.articulo[item.name] || ''}
                    onChangeText={(text) => handleInputChange('articulo', item.name, text)}
                    keyboardType={item.type as KeyboardType}
                  />
                </ThemedView>
              )
            })
          }
        </ThemedView>

        <TouchableOpacity className='bg-light-secondary w-min h-min rounded-3xl my-4 mx-auto' onPress={handleSubmit}>
          <ThemedText type='h2' className='text-white px-6 py-3 text-center'>Enviar</ThemedText>
        </TouchableOpacity>

      </ScrollView>
    </ThemedView>
  )
}

export default RegistrarEmpenio