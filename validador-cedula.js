// Validador de Cédula Ecuatoriana - Algoritmo Módulo 10
function validarCedula(cedula) {
    // Verificar que tenga 10 dígitos y sea numérica
    if (cedula.length !== 10 || isNaN(cedula)) {
        return "❌ CÉDULA INCORRECTA - Debe tener exactamente 10 dígitos numéricos";
    }

    let suma = 0;
    for (let i = 0; i < 9; i++) {
        let digito = parseInt(cedula[i]);
        // Posiciones impares (0, 2, 4, 6, 8) se multiplican por 2
        if (i % 2 === 0) {
            let multiplicacion = digito * 2;
            // Si es mayor a 9, restar 9
            suma += (multiplicacion > 9) ? multiplicacion - 9 : multiplicacion;
        } else {
            // Posiciones pares se suman directamente
            suma += digito;
        }
    }

    // Calcular dígito verificador
    const digitoVerificador = (suma % 10 === 0) ? 0 : 10 - (suma % 10);
    const ultimoDigito = parseInt(cedula[9]);

    if (digitoVerificador === ultimoDigito) {
        return "✅ CÉDULA CORRECTA - La cédula es válida según el algoritmo Módulo 10";
    } else {
        return `❌ CÉDULA INCORRECTA - Dígito verificador debería ser ${digitoVerificador}`;
    }
}

// Función para probar múltiples cédulas
function probarCedulas() {
    const cedulasEjemplo = [
        "1710034065", // Correcta
        "0953582781", // Correcta  
        "1713175071", // Correcta
        "1710034066", // Incorrecta
        "1234567890", // Incorrecta
        "0953582782"  // Incorrecta
    ];

    console.log("🔍 PROBANDO VALIDADOR DE CÉDULAS");
    console.log("=================================");
    
    cedulasEjemplo.forEach(cedula => {
        console.log(`${cedula} → ${validarCedula(cedula)}`);
    });
}

// Ejecutar pruebas
probarCedulas();

// También puedes probar una cédula específica
console.log("\n🎯 Validar cédula específica:");
console.log("1710034065 →", validarCedula("1710034065"));