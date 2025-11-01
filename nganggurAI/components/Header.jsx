export default function Header(){
  return (
    <header style={{background:'linear-gradient(90deg,#f5f7fa,#e9eef8)',padding:20,boxShadow:'0 6px 18px rgba(10,10,25,0.08)'}}>
      <div style={{maxWidth:1100,margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <h1 style={{margin:0,color:'#1b0b3a'}}>Nganggur Aja Bisa</h1>
          <div style={{fontSize:13,color:'#4b4b6b'}}>Semua akan Nganggur Pada waktunya</div>
        </div>
        <div>
          <a href="https://wa.me/6282240003131" target="_blank" rel="noreferrer" style={{padding:'8px 12px',background:'#0f62fe',color:'#fff',borderRadius:10,textDecoration:'none',fontWeight:600}}>Chat WhatsApp</a>
        </div>
      </div>
    </header>
  )
}
