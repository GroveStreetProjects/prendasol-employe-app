import { TouchableOpacity } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';

import ThemedView from '@/components/shared/ThemedView';
import ThemedText from '@/components/shared/ThemedText';
import FormInput from '@/components/FormInput';
import { FormsInputs } from '@/constants/forms/Forms';
import { useFormContext } from '@/hooks/useFormContext';

const RegistrarEmepenioFormulario = () => {

  const {
    handleSubmit,
    validationErrors,
    handleArticleImageChange,
    handleClientDocumentChange,
    triggerArticleImageSelect,
    triggerClientDocumentSelect,
    clientDocumentFile,
    articleImageFile,
    clientDocumentInputRef,
    articleImageInputRef,
  } = useFormContext();

  const { fieldsArticle, fieldsClient, fieldsJewes } = FormsInputs;

  return (
    <>
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
    </>
  )
}

export default RegistrarEmepenioFormulario