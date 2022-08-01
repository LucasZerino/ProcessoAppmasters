import axios from 'axios';
import { useState } from 'react';


export default function Home() {

  const [resposta, setResposta] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const [number, setNumber] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [neighborhood, setNeighborhood] = useState();
  const [streetAddress, setStreetAddress] = useState();
  const [complement, setComplement] = useState();
  const [deviceCount, setDeviceCount] = useState('1');
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState()
  const [devices, setDevices] = useState([
    {type: '', condition: ''},
  ]);
  const [data, setData] = useState();


  const proximo = () => {
    console.log('ITEMS DO FORM: ', name, email, phone, zip, city, state, streetAddress, number, complement, deviceCount)
    document.getElementById('container-login').classList.remove("sign-up-mode");
  }
  

  const setarQTform = () => {
    var i;0
    for(i; i<setDeviceCount; i++) {
      console.log('quantidade aumentada em: ', i);
    }
  }

  const voltar = () => {
    document.getElementById('container-login').classList.add("sign-up-mode");
  }

  if(zip!=null ){
    console.log(zip.length);
    console.log(streetAddress)
    if(zip.length=== 8 ){
      console.log("buscarcep")
      checkCEP();
    }
  }
  

  function checkCEP(){
    document.getElementById('loading').classList.add("ativo");
    console.log(zip);
    fetch(`https://viacep.com.br/ws/${zip}/json/`).then(res => res.json()).then(data => {
      console.log(data);
      setStreetAddress(data.logradouro);
      setNeighborhood(data.bairro);
      setCity(data.localidade);
      setState(data.uf);
      if(loading===true){
        document.getElementById("number").focus()
        setLoading(false)
      }
    });
    document.getElementById('loading').classList.remove("ativo");
  }
 
  console.log( "TEXTOS")

  const definirForm = (index, event) => {
    console.log(index, event.target.name)
    const valor = [...devices]
    valor[index][event.target.name] = event.target.value
    setDevices(valor);
  }

  const addform = () => {
    var number = parseInt(deviceCount);
    var novo = number + 1;
    setDeviceCount(novo)
    setDevices([...devices, {type: '', condition: ''}])
  }

  function enviar(){
    setItems(
      {
        name,
        email,
        phone,
        zip,
        city,
        state,
        streetAddress,
        number,
        complement,
        neighborhood,
        deviceCount,
        devices
      } 
    )
    console.log("ITEMS AQUI!", items)
    enviarform(items)
  }

  const enviarform = async () => {
    await axios.post('https://doar-computador-api.herokuapp.com/donation', items)
    .then(()=>{
      console.log("deu tudo certo")
      setResposta('ENVIADO')
    })
    .catch(()=> {
      console.log("deu tudo errado")
      setResposta('TENTE NOVAMENTE, NÃO ENVIADO')
    })
  }

  console.log(resposta, "ENVIADO!!!!")

  return (
    <div id='container-login' className='container-login sign-up-mode'>
      <div id='loading' className='loading'>
        <h1>CARREGANDO!!!</h1>
      </div>
       <div className="forms-container-login">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <h2 className="title">Equipamentos</h2>
            {devices.map((form, index) => {
              return(


                <div key={index}>
                  <select className="input-field"
                  name='type'
                  onChange={event => definirForm(index, event)}
                  value={form.type}
                  >
                    <option value=''>--Equipamento {index+1}</option>
                    <option value='Notebook'>Notebook</option>
                    <option value='Desktop'>Desktop</option>
                    <option value='Netbook'>Netbook</option>
                    <option value='Monitor'>Monitor</option>
                    <option value='Impressora'>Impressora</option>
                    <option value='Scanner'>Scanner</option>
                  </select>
                  <label>Estado de Conservação</label>
                  <select className="input-field"
                    name='condition'
                    onChange={event => definirForm(index, event)}
                    value={form.condition}
                  >
                    <option>--Estado do Equipamento {index+1}</option>
                    <option
                    value='working'
                    >Tem todas as partes, liga e funciona normalmente</option>
                    <option
                    value='notWorking'
                    >Tem todas as partes, mas não liga mais</option>
                    <option
                    value='broken'
                    >Faltam peças, funciona só as vezes ou está quebrado</option>
                  </select>
            </div>
              ) 
            })}
            <a>{resposta}</a>
            <div className='form-footer'>
            <a onClick={voltar} className="nav-btn"><span>Voltar</span></a>
              <a onClick={enviar} className="nav-btn"><span>Enviar</span></a>
            </div>
          </form>
          <form action="#" className="sign-up-form">
            <h2 className="title">Doar computadores - Fomulário</h2>
              <div className="input-field">
                <i className='userico'><img src='/icons/user.png' className='userimg'></img></i>
                <input type="text" placeholder="Nome" 
                 value={name}
                 onChange={(e)=> setName(e.target.value)}
                />
              </div>
              <div className="input-field">
                <i className='userico'><img src='/icons/email.png' className='userimg'></img></i>
                <input type="text" placeholder='Email' 
                 value={email}
                 onChange={(e)=> setEmail(e.target.value)}
                />
              </div>
              <div className="input-field">
                <i className='userico'><img src='/icons/phone-call.png' className='userimg'></img></i>
                <input type="text" placeholder='Telefone' 
                value={phone}
                onChange={(e)=> setPhone(e.target.value)}
                />
              </div>
              <div className="input-field">
                <i className='userico'><img src='/icons/adress.png' className='userimg'></img></i>
                <input type="text" 
                 value={zip}
                 onChange={(e)=> setZip(e.target.value.replace(/\D/g, ''))} placeholder='CEP' 
                 />
              </div>
              <div className='row'>
                <div className="input-field">
                  <i className='userico'><img src='/icons/street-sign.png' className='userimg'></img></i>
                  <input type="text" placeholder='Rua' 
                  value={streetAddress}
                  onChange={(e)=> setStreetAddress(e.target.value)}
                  />
                </div>
                <div className="input-field">
                  <i className='userico'><img src='/icons/one.png' className='userimg'></img></i>
                  <input type="text" placeholder='Número' className='number' id='number'
                  value={number}
                  onChange={(e)=> setNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className='row'>
                <div className="input-field">
                      <i className='userico'><img src='/icons/village.png' className='userimg'></img></i>
                      <input type="text" placeholder='Bairro' 
                      value={neighborhood}
                      onChange={(e)=> setNeighborhood(e.target.value)}
                      />
                </div>
                <div className="input-field">
                      <i className='userico'><img src='/icons/file.png' className='userimg'></img></i>
                      <input type="text" placeholder='Complemento' 
                      value={complement}
                      onChange={(e)=> setComplement(e.target.value)}
                      />
                </div>
              </div>
              <div className='row'>
                <div className="input-field">
                    <i className='userico'><img src='/icons/buildings.png' className='userimg'></img></i>
                    <input type="text" placeholder='Cidade' 
                    value={city}
                    onChange={(e)=> setCity(e.target.value)}
                    />
                </div>
                <div className="input-field">
                    <i className='userico'><img src='/icons/united-states.png' className='userimg'></img></i>
                    <input type="text" placeholder='Estado' 
                    value={state}
                    onChange={(e)=> setState(e.target.value)}
                    />
                </div>
              </div>
              <div className='row'>
              <div className="input-field">
                    <i className='userico'><img src='/icons/monitor.png' className='userimg'></img></i>
                    <input type="number" placeholder='Quantos equipamentos serão doados' 
                    value={deviceCount}
                    disabled
                    />
                </div>
                <a onClick={addform} type="submit" className="nav-btn"><span>+1</span></a>
              </div>
            <div className='form-footer'>
              <a onClick={proximo} type="submit" className="nav-btn"><span>Próximo</span></a>
            </div>
          </form>
        </div>
      </div>


      <div className="panels-container-login">
        <div className="panel left-panel">
          <div className="content">
            <h3>Agradecemos a sua doação!</h3>
            <p>
              Obrigado por ser um colaborador!
            </p>
          </div>
          <img className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Obrigado por estar fazendo a doação!</h3>
            <p>
              Preencha os dados do formulário para continuar!
            </p>
          </div>
          <im className="image" alt="" />
        </div>
      </div>
    </div>
  )
}
