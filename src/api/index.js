export const getRazas = async () => {
    try {
        const response = await fetch('http://localhost:1337/razas');
        const data = await response.json();
        return data
    }
    catch(error){
        console.log(error);
    }
}

export const postPets = async (data, years, months) => {
    let aprox = false
    if(years !== 0 || months !== 0) aprox = true
    const response = await fetch('http://localhost:1337/mascotas', {
        method: 'POST',
        body: JSON.stringify({
            Nombre: data.nombre,
            Raza: data.raza,
            Edad: data.edad,
            Sexo: data.sexo,
            Año: years,
            Mes: months,
            Aproximado: aprox
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await response.json();
    return result;
}