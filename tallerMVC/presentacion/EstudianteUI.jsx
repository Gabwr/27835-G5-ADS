import { useState, useEffect } from 'react';
import { EstudianteService } from '../logica_negocio/EstudianteServicio'
import './App.css';
const controlador=new EstudianteService();
function App() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [id_es,setId]=useState("");
  const [nombre_es,setNombre]=useState("");
  const [edad_es,setEdad]=useState(0);
  const [formulario_crear_abierto,setFormularioCrearAbierto]=useState(false);
  const [formulario_modificar_abierto,setFormularioModificarAbierto]=useState(false);
  const [formulario_eliminar_abierto,setFormularioEliminarAbierto]=useState(false);

  const abrirFormularioCrear = () => {
    setFormularioCrearAbierto(true);
    setFormularioEliminarAbierto(false);
    setFormularioModificarAbierto(false);
  };
  const cerrarFormularioCrear = () => {
    setFormularioCrearAbierto(false);
    setNombre("");
    setEdad(0);
  };
  const abrirFormularioModificar = () => {
    obtenerEstudiantes();
    setFormularioModificarAbierto(true);
    setFormularioCrearAbierto(false);
    setFormularioEliminarAbierto(false);
  };
  const cerrarFormularioModificar = () => {
    setFormularioModificarAbierto(false);
    setNombre("");
    setEdad(0);
  };
  const abrirFormularioEliminar = () => {
    obtenerEstudiantes();
    setFormularioEliminarAbierto(true);
    setFormularioCrearAbierto(false);
    setFormularioModificarAbierto(false);
  };
  const cerrarFormularioEliminar = () => {
    setFormularioEliminarAbierto(false);
    setNombre("");
    setEdad(0);
  }

  let formularioCrear = (formulario_crear_abierto? "container m-auto py-4 py-8 w-fit" : "hidden");
  let formularioEliminar = (formulario_eliminar_abierto ? "container m-auto py-4 py-8 w-fit" : "hidden");
  let formularioModificar = (formulario_modificar_abierto ? "container m-auto py-4 py-8 w-fit" : "hidden");
  const obtenerEstudiantes = () =>{
    setEstudiantes(controlador.listar());
  }

  const agregarEstudiante = () =>{
    controlador.registrar(nombre_es,edad_es);
    setNombre("");
    setEdad(0);
    cerrarFormularioCrear();
    obtenerEstudiantes();
  }

  const buscarEstudiante = (id) =>{
    const estudiante = controlador.obtener_por_id(id);
    console.log(estudiante.nombre);
    setNombre(estudiante.nombre);
    console.log(estudiante.edad);
    setEdad(estudiante.edad);
  }
  const modificarEstudiante = (id_estudiante) =>{
    controlador.modificar_con_id(id_estudiante, nombre_es, edad_es);
    cerrarFormularioModificar();
    obtenerEstudiantes();
  };


  const eliminarEstudiante = (id_estudiante) =>{
    controlador.eliminar(id_estudiante);
    cerrarFormularioEliminar();
    obtenerEstudiantes();
  }

  
  useEffect(() => {
        obtenerEstudiantes();
    }, []);
  return (
    <>
      <h1 className=' font-bold text-3xl text-center'>Estudiantes</h1>
      <div className='container m-auto'>
        <div className='grid grid-cols-3 justify-items-between gap-1 m-auto w-fit py-3'>
          <button className='rounded-full mx-3 bg-blue-500 text-white' onClick={abrirFormularioCrear}>
          Agregar Alumno
        </button>
        <button className='rounded-full mx-3 bg-blue-500 text-white' onClick={abrirFormularioModificar}>
          Editar Alumno
        </button>
        <button className='rounded-full mx-3 bg-blue-500 text-white' onClick={abrirFormularioEliminar}>
          Eliminar Alumno
        </button>
        </div>
      </div>
      
      {/*Formulario para agregar estudiante*/}

      <div className={formularioCrear}>
        <h2 className='text-center'></h2>
        <div className=' columns-2 gap-4'>
          <div>
            <label>Nombre:</label>
            <input type='text' className=' border-2' value={nombre_es} onChange={(e)=>{setNombre(e.target.value)}}/>
          </div>
          <div>
            <label>Edad:</label>
            <input type='number' className=' border-2' value={edad_es} onChange={(e)=>{setEdad(e.target.value)}}/>
          </div>
        </div>
        <div className='justify-items-center m-auto w-fit my-3 py-2 gap-2'>
          <button className='mx-1 border border-white hover:bg-blue-950' onClick={agregarEstudiante}>Agregar</button>
          <button className='mx-1 border border-white hover:bg-red-950 hover:border-red-500' onClick={cerrarFormularioCrear}>Cancelar</button>
        </div>
      </div>


      {/*Formulario para eliminar estudiante*/}

      <div className={formularioEliminar}>
        <h2 className='text-center'></h2>
        <div className='container w-fit items-center my-2'>
          <label>Id del estudiante:</label>
          <select defaultValue=" " onChange={(e)=>{setId(e.target.value); buscarEstudiante(e.target.value);}}>
             <option value="">
                </option>
            {
              estudiantes.map((estudiante) => (
                <option key={estudiante.id} value={estudiante.id}>
                  {estudiante.id}
                </option>
              ))
            }
          </select>
        </div>
        <div className=' columns-2 gap-4'>
          <div>
            <label>Nombre:</label>
            <input type='text' className=' border-2' value={nombre_es} readOnly onChange={(e)=>{setNombre(e.target.value)}}/>
          </div>
          <div>
            <label>Edad:</label>
            <input type='number' className=' border-2' value={edad_es} readOnly onChange={(e)=>{setEdad(e.target.value)}}/>
          </div>
        </div>
        <div className='justify-items-center m-auto w-fit my-3 py-2 gap-2'>
          <button className='mx-1 border border-white hover:bg-blue-950' onClick={()=>eliminarEstudiante(id_es)}>Eliminar</button>
          <button className='mx-1 border border-white hover:bg-red-950 hover:border-red-500' onClick={cerrarFormularioEliminar}>Cancelar</button>
        </div>
      </div>


      {/*Formulario para modificar estudiante*/}
      <div className={formularioModificar}>
        <h2 className='text-center'></h2>
        <div className='container w-fit items-center my-2'>
          <label>Id del estudiante:</label>
          <select defaultValue=" " onChange={(e)=>{setId(e.target.value); buscarEstudiante(e.target.value);}}>
             <option value="">
                </option>
            {
              estudiantes.map((estudiante) => (
                <option key={estudiante.id} value={estudiante.id}>
                  {estudiante.id}
                </option>
              ))
            }
          </select>
        </div>
        <div className=' columns-2 gap-4'>
          <div>
            <label>Nombre:</label>
            <input type='text' className=' border-2' value={nombre_es} onChange={(e)=>{setNombre(e.target.value)}}/>
          </div>
          <div>
            <label>Edad:</label>
            <input type='number' className=' border-2' value={edad_es} onChange={(e)=>{setEdad(e.target.value)}}/>
          </div>
        </div>
        <div className='justify-items-center m-auto w-fit my-3 py-2 gap-2'>
          <button className='mx-1 border border-white hover:bg-blue-950' onClick={()=>modificarEstudiante(id_es)}>Modificar</button>
          <button className='mx-1 border border-white hover:bg-red-950 hover:border-red-500' onClick={cerrarFormularioModificar}>Cancelar</button>
        </div>
      </div>

      <div className='container m-auto w-full items-center justify-center mt-4'>
        <table border={1} className='table-auto m-auto border-gray-100 border-2'>
          <tbody> 
            <tr className='bg-gray-800 text-white'>
            <th className='border-gray-100 border p-4'>
              Id
            </th>
            <th className='border-gray-100 border p-4'>
              Nombre
            </th>
            <th className='border-gray-100 border p-4'>
              Edad
            </th>
          </tr>
            {
            estudiantes.map((estudiante) => (
              <tr key={estudiante.id} className="text-center">
                <td className='border-gray-100 border p-4'>{estudiante.id}</td>
                <td className='border-gray-100 border p-4'>{estudiante.nombre}</td>
                <td className='border-gray-100 border p-4'>{estudiante.edad}</td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
