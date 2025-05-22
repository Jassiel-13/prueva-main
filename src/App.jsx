import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users");
        setUsuarios(response.data.data); // ← Aquí se guarda el arreglo
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    getUsers();
  }, []);

  return (
    <div>
      <h1>Lista de usuarios</h1>
      <ul>
        {usuarios.map((usuario, index) => (
          <li key={index}>{usuario}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
