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

export const postPets = async (data) => {
    const response = await fetch('http://localhost:1337/mascotas', {
        method: 'POST',
        body: JSON.stringify({
            Nombre: data.nombre,
            Raza: data.raza,
            Edad: data.edad,
            Sexo: data.sexo,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await response.json();
    return result;
}