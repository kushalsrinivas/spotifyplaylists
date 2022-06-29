
import { getDefaultNormalizer } from '@testing-library/react';
import { useEffect, useState } from 'react';
import pic from "./images/icon3.png"
import filter from "./images/filter.png";
import {HashLoader} from "react-spinners"



function App() {

const [data , setData] = useState({});
const [loading , setLoading] = useState(false);
const [search , setSearch] = useState('top');

const fix = (txt)=>{
  return txt.replace("https://open.spotify.com/playlist/","https://open.spotify.com/embed/playlist/")
}

const getData = async (s)=>{
  await fetch(`https://www.reddit.com/r/SpotifyPlaylists/${s}.json`)
  .then(res =>  res.json()) 
  .then(data => {
      setData(data)
      setLoading(true);
    })
}

useEffect(()=>{
  getData(search)
  console.log(data);  
},[])

useEffect(()=>{
setLoading(false);
getData(search);
},[search])

const handleChange = (e)=>{
  const {value} = e.target;
  setSearch(value);
}

  return (
    <div className="App h-screen p-10 ">
    <div className='text-white text-center bg-black w-full'>
      <label className=' flex justify-center'>

      <img src={filter} alt="sd"/> 
      <select className='bg-black text-white h-auto  px-2 ' onChange={handleChange}>
        <option value="top">top💯</option>
        <option value="rising">rising📈</option>
        <option value="new">new🔥</option>
      </select>
      </label>

    </div>

    {
      loading ?
      <>
{
  data.data.children.map((data, id) => { 
      console.log('====================================');
      console.log(data);
      console.log('====================================');
    return(
    <div key={id} className='text-white  w-4/5 h-4/5 my-10  p-2 rounded-3xl m-auto bg-gradient-to-b from-emerald-900  to-black'>
    
        <div className='h-full p-2  flex flex-row flex-wrap justify-items-center justify-center text-center '>
         <div className=' h-4/5'>

          <iframe
          src={fix(data.data.url)}
          title={data.data.title}
          height = "100%"
          width="100%"
          className='rounded-3xl'
          />
         </div>

          <div className='w-full '>


<div className='justify-center text-center flex justify-items-center mt-5 '>

          <a href={data.data.url} target="none">
          <img  src={pic} alt='play'/>
          </a>
</div>
          </div>
          <h1 className='mt-5 justify-center'>

         #{data.data.link_flair_text}
          
          </h1>
          
          </div>
        </div>
    

    )
  })
}

    
      </>
    
     :
     <div className='mt-[50%]  flex justify-center'>
     <HashLoader
  color="#1f8326"
  speedMultiplier={2}
/>
     </div>
    }
    

    </div>
  );
}

export default App;
