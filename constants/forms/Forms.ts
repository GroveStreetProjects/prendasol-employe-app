export const FormsInputs = {

  fieldsClient: [
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
      minLength: 7,
      maxLength: 12,
      pattern: /^[0-9,-]+$/,
      errorMessage: 'Solo números permitidos'
    },
    {
      label: 'Nombres',
      name: 'Nombres',
      placeholder: 'Juan Fernando...',
      type: 'text',
      required: true,
      minLength: 2,
      pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      errorMessage: 'Solo letras permitidas'
    },
    {
      label: 'Apellido Paterno',
      name: 'Paterno',
      placeholder: 'Pérez...',
      type: 'text',
      required: true,
      minLength: 2,
      pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      errorMessage: 'Solo letras permitidas'
    },
    {
      label: 'Apellido Materno',
      name: 'Materno',
      placeholder: 'Martínez...',
      type: 'text',
      required: false,
      pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/,
      errorMessage: 'Solo letras permitidas'
    },
    {
      label: 'Correo Electrónico',
      name: 'Correo',
      placeholder: 'correo@correo.com...',
      type: 'email',
      required: true
    },
    {
      label: 'Celular',
      name: 'Telefono',
      placeholder: '70123456...',
      type: 'phone',
      required: true,
      minLength: 7,
      maxLength: 15
    },
  ],

  fieldsArticle: [
    {
      label: 'Nombre',
      name: 'Nombre',
      placeholder: 'Anillo de oro...',
      type: 'text',
      required: true,
      minLength: 5
    },
    {
      label: 'Descripción',
      name: 'Descripcion',
      placeholder: 'Anillo de oro de 18k...',
      type: 'text',
      required: true,
      minLength: 15
    },
    {
      label: 'Precio de Empeño',
      name: 'Precio_Empeno',
      placeholder: '800.00...',
      type: 'numeric',
      required: true,
      pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
      errorMessage: 'Formato inválido (ej. 800.00)'
    },
  ],

  typesArticle: [
    {
      label: 'Joyas',
      value: '1'
    },
    {
      label: 'Piedras',
      value: '2'
    },
    {
      label: 'Electrodomésticos',
      value: '3'
    },
    {
      label: 'Vehículos',
      value: '4'
    },
  ],

  fieldsJewes: [
    {
      label: 'Material',
      name: 'material',
      placeholder: 'Selecciona un material...',
      type: 'dropdown',
      required: true,
      minLength: 3,
      data: [{ label: 'Oro', value: 'oro' }, { label: 'Plata', value: 'plata' }]
    },
    {
      label: 'Tipo de Joya',
      name: 'tipo',
      placeholder: 'Selecciona un tipo...',
      type: 'dropdown',
      required: true,
      data: [{ label: 'Anillo', value: 'anillo' }, { label: 'Collar', value: 'collar' }]
    },
    {
      label: 'Kilataje',
      name: 'kilataje',
      placeholder: '18.00...',
      type: 'numeric',
      required: true,
      pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
      errorMessage: 'Formato inválido (ej. 18.00)'
    },
    {
      label: 'Peso (gramos)',
      name: 'peso_gr',
      placeholder: '15.50...',
      type: 'numeric',
      required: true,
      pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
      errorMessage: 'Formato inválido (ej. 15.50)'
    }
  ],

  fieldsGemstones: [
    {
      label: 'Tipo de Piedra',
      name: 'tipo',
      placeholder: 'Selecciona un tipo...',
      type: 'dropdown',
      required: true,
      minLength: 3,
      data: [{ label: 'Diamante', value: 'diamante' }, { label: 'Rubí', value: 'rubí' }]
    },
    {
      label: 'Quilataje',
      name: 'quilataje',
      placeholder: '1.50...',
      type: 'numeric',
      required: true,
      pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
      errorMessage: 'Formato inválido (ej. 1.50)'
    },
    {
      label: 'Color',
      name: 'color',
      placeholder: 'Transparente, Rojo intenso...',
      type: 'text',
      required: true,
    },
    {
      label: 'Peso (gramos)',
      name: 'peso_gr',
      placeholder: '0.30...',
      type: 'numeric',
      required: true,
      pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
      errorMessage: 'Formato inválido (ej. 0.30)'
    }
  ],

  fieldsElectronics: [
    {
      label: 'Tipo de Electrodoméstico',
      name: 'tipo',
      placeholder: 'Selecciona un tipo...',
      type: 'dropdown',
      required: true,
      minLength: 3,
      data: [{ label: 'Televisores', value: 'televisores' }, { label: 'Refrigeradores', value: 'regrigeradores' }]
    },
    {
      label: 'Marca',
      name: 'marca',
      placeholder: 'Samsung, LG...',
      type: 'text',
      required: true,
      minLength: 2
    },
    {
      label: 'Modelo',
      name: 'modelo',
      placeholder: 'QLED 4K 68ATS...',
      type: 'text',
      required: true,
    },
    {
      label: 'Estado',
      name: 'estado',
      placeholder: 'Selecciona una opción...',
      type: 'text',
      required: true,
      minLength: 10,
      data: [{ label: 'Nuevo', value: 'nuevo' }, { label: 'Casi nuevo', value: 'casi nuevo' }]
    }
  ],

  fieldsVehicles: [
    {
      label: 'Tipo de Vehículo',
      name: 'tipo',
      placeholder: 'Automóvil, Motocicleta...',
      type: 'text',
      required: true,
      minLength: 5
    },
    {
      label: 'Marca',
      name: 'marca',
      placeholder: 'Toyota, Honda...',
      type: 'text',
      required: true,
      minLength: 3
    },
    {
      label: 'Modelo',
      name: 'modelo',
      placeholder: 'Corolla, Civic...',
      type: 'text',
      required: true,
    },
    {
      label: 'Placa',
      name: 'placa',
      placeholder: '98S8S4F...',
      type: 'text',
      required: true,
    },
    {
      label: 'Número de Chasis',
      name: 'num_chasis',
      placeholder: 'Ej: 1HGBH41JXMN1022...',
      type: 'text',
      required: true,
    },
    {
      label: 'Kilometraje (km)',
      name: 'kilometraje',
      placeholder: '8500...',
      type: 'numeric',
      required: true,
      pattern: /^[0-9]+$/,
      errorMessage: 'Solo números enteros'
    },
    {
      label: 'Color',
      name: 'color',
      placeholder: 'Rojo, Negro...',
      type: 'text',
      required: true,
    },
    {
      label: 'Estado',
      name: 'estado',
      placeholder: 'En buen estado y sin detalles aparentes...',
      type: 'text',
      required: true,
      minLength: 15
    }
  ],
};

export const fieldsByCategory = {
  '1': FormsInputs.fieldsJewes,
  '2': FormsInputs.fieldsGemstones,
  '3': FormsInputs.fieldsElectronics,
  '4': FormsInputs.fieldsVehicles,
};