import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { apiRest } from './api/hello'

export default function Home() {
  const [resp, setResp] = useState('');
  const [data, setData] = useState('');

  const buscarApi = async () => {
    const { data } = await axios.get(apiRest())
    setData(data);
    if(data.alive===true){
      console.log("É TRUE")
      setResp("API online");
    }else if(data.alive===false){
      console.log("É FALSE")
      setResp("API offline");
    }
  }
  
  useEffect(()=> {
    buscarApi();
  },[])
  return (
    <div className={styles.container}>
      <h1>Doação de computadores usados</h1>
      <p>
        {resp}
      </p>
    </div>
  )
}
