import React , {useEffect , useState}from "react";
import backgroundImg from './assets/background.jpeg'
 import api from './services/api'
 import './services/api'
import "./styles.css";

function App() {
  const [repositories , setRepositories] = useState([])
  const [title , setTitle] = useState('')
  const [url , setUrl] = useState('')
  const [techs , setTechs] = useState('')
  const [likes , setLikes] = useState(0)

  useEffect(() => {
    async function LoadRepositories(){
      const response = await api.get('/repositories')
      setRepositories(response.data)
    }
    LoadRepositories()
  }, [])
  async function handleAddRepository() {
      
      //event.preventDefault()
      const response = await api.post('/repositories' , { 
        title,
        url,
        techs ,
        likes: 0
      })
      setTitle('')
      setUrl('')
      setTechs('')
      setRepositories( [...repositories , response.data] )
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`)
    
    setRepositories(repositories.filter(item => item.id !== id));

  }
  async function handleLikes(id){
    
    const response = await api.post(`/repositories/${id}/like`)

    setRepositories(repositories.map(item => {
      if(item.id === id){
        
        setLikes(item.likes+1)
      }
    }));
  }
 
  return (
    <div>
      
      <ul data-testid="repository-list">
      { repositories.map( (repo,index) => (
       <li  key = {repo.id} className = "repository-item">
          <strong> Repositório {index+1}</strong>
          
          <header>
             <div className = "repository_info">
              <strong>{repo.title}</strong> <br></br>
              <span>{  repo.techs}</span> <br></br>
              <strong>Likes:{repo.likes}</strong> <br></br>
             </div>
           </header>

           <div className = "buttons" >
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
            <button className = "likes" onClick={() => handleLikes(repo.id) }>Like </button>
            <button className = "update" onClick={() => { }}>Update </button>
          </div>
        </li>
         ))

        }
      </ul>
    
        <aside>
          <form data-testid="form">
            <div className = "input-block">
              <label htmlFor= "title">Title</label>
              <input name= "title" id= "title"  required value = {title} onChange = {e => setTitle(e.target.value)} />
            </div>
            <div className = "input-block">
              <label htmlFor= "url">Url</label>
              <input name= "url" id= "url"  required value = {url} onChange = {e => setUrl(e.target.value)} />
            </div>
            <div className = "input-block">
              <label htmlFor= "techs">Techs</label>
              <input name= "techs" id= "techs"  required value = {techs} onChange = {e => setTechs(e.target.value)} />
            </div>
           <button type= "submit" onClick={handleAddRepository}>Adicionar</button>
          </form>
        </aside>
      
    </div>
  );
}

export default App;
