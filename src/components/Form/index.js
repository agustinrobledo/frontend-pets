import React from "react";
import { useEffect, useState } from "react";
import '../../scss/form.scss'
import { getRazas, postPets} from '../../api'
const Form = (props) => {
    const [razas, setRazas] = useState([]);
    const [form, setForm] = useState({
        nombre: '',
        edad: '',
        raza: '',
        sexo: ''
    });
    const [disabled, setDisabled] = useState(true);
    const formChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const formSubmit = (e) => {
        e.preventDefault();
        postPets(form)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }
        

    useEffect(() => {
        getRazas().then(data => {
            setRazas(data);
        });
    }, [])

    return (
        <div className="container">
            <h1>Form</h1>
            <form className="form-container" onSubmit={formSubmit}>
                <input type="text" name="nombre" placeholder="Name" onChange={formChange} />
                <input type="date" name="edad" placeholder="Age" onChange={formChange} />
                <select name="raza" onChange={formChange}>
                    <option value="">Raza</option>
                    {razas.map(raza => (
                        <option key={raza.id} value={raza.nombre_raza}>{raza.nombre_raza}</option>
                    ))}
                </select>
                <h2>¿No sabes cuando nació exactamente tu mascota?</h2>
                <h3>Puedes decirme un estimado</h3>
                <input type="radio"/>Tiene mas de un año?
                    <label for="Años">Años</label>
                    <input type="Number"></input>
                <input type="radio"/>Tiene menos de un año?
                    <label for="Meses">Meses</label>
                    <input type="Number"></input>
                <select name="sexo" onChange={formChange}>
                    <option value="">Sexo</option>
                    <option value="Macho">Macho</option>
                    <option value="Hembra">Hembra</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Form;