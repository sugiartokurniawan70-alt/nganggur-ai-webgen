'use client'
import { useState, useEffect } from 'react'

export default function Generator(){
  const [preset, setPreset] = useState('poster')
  const [aspect, setAspect] = useState('1:1')
  const [res, setRes] = useState('HD')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])

  useEffect(()=>{
    try{
      const raw = localStorage.getItem('nganggur_history_v1')
      if(raw) setHistory(JSON.parse(raw))
    }catch(e){}
  },[])

  const saveHistory = (item) => {
    const next = [item, ...history].slice(0,10)
    setHistory(next)
    try{ localStorage.setItem('nganggur_history_v1', JSON.stringify(next)) }catch(e){}
  }

  const handleGenerate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    try{
      const resRaw = await fetch('/api/generate', {method:'POST', body: JSON.stringify({preset,aspect,res})})
      const j = await resRaw.json()
      setResult(j.url || '/images/placeholder-result.png')
      saveHistory({id:Date.now(),preset,aspect,res,url:j.url||'/images/placeholder-result.png', caption: j.caption||'Caption placeholder'})
    }catch(err){
      console.error(err)
      setResult('/images/placeholder-result.png')
    }
    setLoading(false)
  }

  return (
    <div style={{marginTop:20,background:'rgba(255,255,255,0.9)',padding:18,borderRadius:12,boxShadow:'0 8px 30px rgba(11,9,25,0.06)'}}>
      <form onSubmit={handleGenerate}>
        <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
          <select value={preset} onChange={e=>setPreset(e.target.value)}>
            <option value="poster">Poster Produk</option>
            <option value="karikatur">Karikatur 4D</option>
            <option value="kajian">Cover Kajian</option>
            <option value="caption">Caption Threads</option>
          </select>
          <select value={aspect} onChange={e=>setAspect(e.target.value)}>
            <option>1:1</option>
            <option>4:5</option>
            <option>16:9</option>
            <option>9:16</option>
          </select>
          <select value={res} onChange={e=>setRes(e.target.value)}>
            <option>HD</option>
            <option>2K</option>
            <option>4K</option>
            <option>8K</option>
          </select>
          <button type="submit" style={{padding:'8px 12px',background:'#5b21b6',color:'#fff',borderRadius:8,border:'none'}}>{loading?'Generating...':'Generate'}</button>
        </div>
      </form>

      <div style={{marginTop:18}}>
        {result ? (
          <div>
            <img src={result} alt="hasil" style={{maxWidth:'100%',borderRadius:8,boxShadow:'0 10px 30px rgba(11,9,25,0.12)'}} />
            <div style={{display:'flex',gap:8,marginTop:8,flexWrap:'wrap'}}>
              <button onClick={()=>navigator.clipboard.writeText(result)} style={{padding:8,borderRadius:6}}>Copy Image URL</button>
              <button onClick={()=>{ const c = history[0]?.caption || 'Caption'; navigator.clipboard.writeText(c) }} style={{padding:8,borderRadius:6}}>Copy Caption</button>
              <a href={result} download style={{padding:8,background:'#0f62fe',color:'#fff',borderRadius:6,textDecoration:'none'}}>Download</a>
            </div>
          </div>
        ) : <p style={{opacity:0.7}}>Tekan Generate untuk mencoba (API placeholder).</p>}
      </div>

      <div style={{marginTop:20}}>
        <h4>History (terakhir)</h4>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          {history.length===0 && <div style={{opacity:0.6}}>Belum ada history.</div>}
          {history.map(h=> (
            <div key={h.id} style={{background:'#fff',padding:8,borderRadius:8,boxShadow:'0 6px 18px rgba(10,10,25,0.04)'}}>
              <img src={h.url} style={{width:120,height:80,objectFit:'cover'}} alt="" />
              <div style={{fontSize:12}}>{h.preset} • {h.aspect} • {h.res}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
