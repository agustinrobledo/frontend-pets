import React from "react";
import { useEffect, useState } from "react";
import '../../scss/form.scss'
import { getRazas, postPets} from '../../api'
import img from '../../img/illustration.png'

const today = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
};


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
    const [years, setYears] = useState(0);
    const [months, setMonths] = useState(0);
    const onClickChange = () => {
        setDisabled(!disabled)
        if(disabled){
            setForm({
                ...form,
                edad: '',
            })
        }
        else{
            setMonths(0)
            setYears(0)
        }
    }
    const [disabledAge, setDisabledAge] = useState(true);
    const onClickChangeAge = () => {
        setDisabledAge(!disabledAge)
        if(disabledAge){
            setYears(0);
        }
        else{
            setMonths(0);
        }
    }
    const formSubmit = (e) => {
        e.preventDefault();
        postPets(form, years, months)
        .then(res => {
            alert('Mascota creada con exito')
        })
        .catch(err => {
            alert('Error al crear mascota')
        })
    }
        

    useEffect(() => {
        getRazas().then(data => {
            setRazas(data);
        });
    }, [])

    return (
        <div className="container">
            <h1>Registra a tu mascota</h1>
            <img src={img} alt=""/>
            <form className="form-container" onSubmit={formSubmit}>
                <h4>Nombre:</h4>
                <input type="text" className={!form.nombre ? "danger" : undefined} name="nombre" placeholder="Nombre" onChange={formChange} />
                <h4>Fecha de nacimiento:</h4>
                {disabled && <input type="date" className={!form.edad ? "danger" : undefined} name="edad" placeholder="Age" onChange={formChange} max={today()} />}
                {disabled && <h4>¿No sabes cuando nació exactamente tu mascota?</h4>}
                <button
                type="button"
                onClick={onClickChange}
                >{disabled ? "Puedes decirme un estimado ➡" : "⬅ Ya recuerdo cuando nacio" }</button>
                {!disabled &&
                    <div>
                        {disabledAge ?
                        <div>
                            <h3 className="age-aprox">Años</h3>
                            <div className="age-counter">
                                <button
                                type="button"
                                onClick={() => setYears(years - 1)}
                                disabled={years === 0}
                                >-</button>
                                <h1>{years}</h1>
                                <button 
                                type="button"
                                onClick={() => setYears(years + 1)}
                                >+</button>
                            </div>
                        </div>
                        :
                        <div>
                            <h3 className="age-aprox">Meses</h3>
                            <div className="age-counter">
                                <button
                                type="button"
                                onClick={() => setMonths(months - 1)}
                                disabled={months === 0}
                                >-</button>
                                <h1>{months}</h1>
                                <button
                                type="button"
                                onClick={() => setMonths(months + 1)}
                                disabled={months === 11}
                                >+</button>
                            </div>
                        </div>
                        }
                        <button 
                        type="button"
                        onClick={onClickChangeAge}
                        >
                        {disabledAge ? '¿Tiene menos de un año?' : '¿Tiene mas de un año?'}
                        </button>
                    </div>
                }
                <h4>Raza:</h4>
                <select
                onChange={formChange}
                name="raza"
                className={!form.raza ? "danger" : undefined}
                >
                    <option value=""> </option>
                    {razas?.map(raza => (
                        <option key={raza.id} value={raza.nombre_raza}>{raza.nombre_raza}</option>
                    ))}
                </select>
                <h4>Sexo:</h4>
                <select name="sexo" onChange={formChange} className={!form.sexo ? "danger" : undefined}>
                    <option value=""> </option>
                    <option value="Macho">Macho</option>
                    <option value="Hembra">Hembra</option>
                </select>
                <button 
                type="submit"
                disabled={!form.nombre || !form.raza || !form.sexo || (!form.edad && (months === 0 && years === 0 )) || (form.edad && (months !== 0 && years !== 0 ))}
                >Enviar</button>
                <p>
                    *Todos los campos son obligatorios
                </p>
            </form>
        </div>
    );
}

export default Form;