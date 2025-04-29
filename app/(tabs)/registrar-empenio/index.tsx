import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Dropdown } from 'react-native-element-dropdown'

const RegistrarEmpenio = () => {

  const [nombre, setNombre] = useState('');
  const [apPat, setApPat] = useState('');
  const [apMat, setApMat] = useState('');
  const [numCI, setNumCI] = useState('');
  const [numCel, setNumCel] = useState('');
  const [correo, setCorreo] = useState('');

  const [nomArt, setNomArt] = useState('');
  const [preVal, setPreVal] = useState('');
  const [interes, setInteres] = useState('');
  const [desc, setDesc] = useState('');

  const [valor, setValor] = useState(null);

  const tiposArt = [
    { label: 'Joyas', value: '1' },
    { label: 'Piedras', value: '2' },
  ];

  return (
    <SafeAreaView>
      <View style={styles.containerHeader}>
        <Text style={styles.titulos}>Registro de nuevo empeño - Prendasol</Text>
      </View>
      <View style={styles.containerTitulos}>
        <Text style={styles.titulos}>
          Información del cliente:
        </Text>
      </View>
      <View style={styles.containerCliente}>
        <TextInput
          style={styles.input}
          onChangeText={setNombre}
          value={nombre}
          placeholder='Nombre completo del cliente'
          keyboardType='default'
        />
        <TextInput
          style={styles.input}
          onChangeText={setApPat}
          value={apPat}
          placeholder='Apellido Paterno'
          keyboardType='default'
        />
        <TextInput
          style={styles.input}
          onChangeText={setApMat}
          value={apMat}
          placeholder='Apellido Materno'
          keyboardType='default'
        />
      </View>
      <View style={styles.containerCliente}>
        <TextInput
          style={styles.input}
          onChangeText={setNumCI}
          value={numCI}
          placeholder='Cédula de Identidad'
          keyboardType='numeric'
        />
        <TextInput
          style={styles.input}
          onChangeText={setNumCel}
          value={numCel}
          placeholder='Nº de Celular'
          keyboardType='numeric'
        />
        <TextInput
          style={styles.input}
          onChangeText={setCorreo}
          value={correo}
          placeholder='Correo Electrónico'
          keyboardType='default'
        />
      </View>
      <View style={styles.containerTitulos}>
        <Text style={styles.titulos}>
          Información del artículo:
        </Text>
      </View>
      <View style={styles.containerArticulo}>
        <TextInput
          style={styles.input}
          onChangeText={setNomArt}
          value={nomArt}
          placeholder='Nombre del artículo'
          keyboardType='default'
        />
        <TextInput
          style={styles.input}
          onChangeText={setPreVal}
          value={preVal}
          placeholder='Precio valuado'
          keyboardType='numeric'
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={tiposArt}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Seleccione una opción"
          value={valor}
          onChange={item => {
            setValor(item.value);
          }}
          search={false}
        />
      </View>
      <View style={styles.containerDescripcion}>
        <TextInput
          style={styles.inputDesc}
          onChangeText={setDesc}
          value={desc}
          placeholder='Descripción general'
          keyboardType='default'
          multiline={true}
          numberOfLines={4}
          textAlign='left'
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  containerHeader: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerTitulos: {
    flex: 1,
    padding: 15,
    width: 'auto',
    height: 'auto',
  },
  titulos: {
    fontSize: 16,
  },
  containerCliente: {
    flexDirection: 'row',
    gap: 10,
    padding: 10,
  },
  containerArticulo: {
    flexDirection: 'row',
    gap: 10,
    padding: 10,
  },
  containerDescripcion: {
    flexDirection: 'row',
    gap: 10,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    width: 250,
    padding: 10,
    margin: 3,
  },
  inputDesc: {
    borderWidth: 1,
    borderRadius: 10,
    width: 800,
    padding: 10,
    margin: 3
  },
  dropdown: {
    margin: 1,
    height: 50,
    width: 280,
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default RegistrarEmpenio