import { useRef, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';

import ThemedView from '@/components/shared/ThemedView';
import ThemedText from '@/components/shared/ThemedText';
import { FormsInputs } from '@/constants/forms/Forms';
import { FormProvider } from '@/contexts/FormContext';
import FormInput from '@/components/FormInput';
import { useFormContext } from '@/hooks/useFormContext';

const RegistrarEmpenio = () => {

  const { handleSubmit, validationErrors } = useFormContext();

  const [clientDocumentFile, setClientDocumentFile] = useState<File | null>(null);
  const [articleImageFile, setArticleImageFile] = useState<File | null>(null);

  const clientDocumentInputRef = useRef<HTMLInputElement>(null);
  const articleImageInputRef = useRef<HTMLInputElement>(null);

  const { fieldsArticle, fieldsClient, fieldsJewes } = FormsInputs;

  const handleClientDocumentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === 'application/pdf') {
        setClientDocumentFile(file);
      } else {
        window.alert('Por favor selecciona un archivo PDF.');
        setClientDocumentFile(null);
        if (clientDocumentInputRef.current) {
          clientDocumentInputRef.current.value = '';
        }
      }
    }
  };

  const handleArticleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type.startsWith('image/')) {
        setArticleImageFile(file);
      } else {
        window.alert('Por favor selecciona un archivo de imagen.');
        setArticleImageFile(null);
        if (articleImageInputRef.current) {
          articleImageInputRef.current.value = '';
        }
      }
    }
  };

  const triggerClientDocumentSelect = () => {
    clientDocumentInputRef.current?.click();
  };

  const triggerArticleImageSelect = () => {
    articleImageInputRef.current?.click();
  };

  return (
    <FormProvider>
      <ThemedView className='flex-1 bg-light-background rounded-tl-3xl'>
        <ThemedText type='semi-bold' className="text-center py-4">Registrar Empeño</ThemedText>
        <ScrollView className='flex flex-1 p-6 mx-[50] bg-white rounded-3xl items-center'>

          <ThemedText type='h2' className='text-center pb-2 font-semibold'>Datos del Cliente</ThemedText>
          <ThemedView className='flex flex-row flex-wrap gap-4 justify-center'>
            {
              fieldsClient.map((item, index) => {
                if (index === 0) return;
                const error = validationErrors.cliente[item.name];
                return (
                  <FormInput
                    item={item}
                    form='cliente'
                    error={error}
                    consultCi={index === 1 ? true : undefined}
                  />
                );
              })
            }
            <input
              type="file"
              ref={clientDocumentInputRef}
              onChange={handleClientDocumentChange}
              style={{ display: 'none' }}
              accept="application/pdf"
            />
            <ThemedView className='w-[250]'>
              <ThemedText>Fotocopia de CI *</ThemedText>
              <TouchableOpacity onPress={triggerClientDocumentSelect} className='bg-light-primary rounded-xl p-1'>
                <ThemedText className='text-white text-center'>Seleccionar PDF</ThemedText>
              </TouchableOpacity>
              <ThemedText className='italic'>
                {clientDocumentFile && clientDocumentFile.name ? `Archivo: ${clientDocumentFile.name}` : 'Ningún archivo seleccionado'}
              </ThemedText>
            </ThemedView>
          </ThemedView>

          <ThemedText type='h2' className='text-center pb-2 font-semibold'>Datos del Artículo</ThemedText>
          <ThemedView className='flex flex-row flex-wrap gap-4 justify-center'>
            {
              fieldsArticle.map((item) => {
                const error = validationErrors.articulo[item.name];
                return (
                  <FormInput
                    item={item}
                    form='articulo'
                    error={error}
                  />
                );
              })
            }
            <input
              type="file"
              ref={articleImageInputRef}
              onChange={handleArticleImageChange}
              style={{ display: 'none' }}
              accept="image/*"
            />
            <ThemedView className='w-[250]'>
              <ThemedText>Imagen del Artículo *</ThemedText>
              <TouchableOpacity onPress={triggerArticleImageSelect} className='bg-light-primary rounded-xl p-1'>
                <ThemedText className='text-white text-center'>Seleccionar Imagen</ThemedText>
              </TouchableOpacity>
              <ThemedText className='italic'>
                {articleImageFile && articleImageFile.name ? `Archivo: ${articleImageFile.name}` : 'Ningún archivo seleccionado'}
              </ThemedText>
            </ThemedView>
          </ThemedView>

          <TouchableOpacity className='bg-light-secondary w-min h-min rounded-3xl my-4 mx-auto' onPress={handleSubmit}>
            <ThemedText type='h2' className='text-white px-6 py-3 text-center'>Enviar</ThemedText>
          </TouchableOpacity>

        </ScrollView>
      </ThemedView>
    </FormProvider>
  )
}

export default RegistrarEmpenio