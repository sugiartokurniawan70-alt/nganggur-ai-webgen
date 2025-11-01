import Header from '../components/Header'
import Generator from '../components/Generator'
import Footer from '../components/Footer'

export default function Home(){
  return (
    <main>
      <Header />
      <section style={{padding:'24px',maxWidth:1100,margin:'0 auto'}}>
        <h2 style={{marginTop:8}}>All‑in‑One AI Generator — Nganggur Aja Bisa</h2>
        <p style={{opacity:0.85}}>Semua akan Nganggur Pada waktunya</p>
        <Generator />
      </section>
      <Footer />
    </main>
  )
}
