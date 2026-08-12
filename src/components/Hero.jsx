import './Hero.css'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-col hero-text-col">
        <h1 className="hero-title">
          <span>Spag</span>
          <span className="btm-tit">
            <img src="/logospag.png" alt="spaglogo" />
            Zone
          </span>
        </h1>
        <p className="hero-subtitle">Deliciousness awaits you <br />just a click away!</p>
        <Link to="/dashboard" className="hero-cta">Order Now</Link>
      </div>

      <div className="hero-col hero-image-col">
        <img src="/spag2.png" alt="Spaghetti" className="spag-img" />
      </div>

      <div className="hero-col hero-pills-col">
        <div className="pill pill-active">
          <img src="/spag2.png" alt="Spaghetti" className="pill-img" />
          <div className="pill-txt">
            <span>Spaghetti</span>
            <span>₦500</span>
          </div>
          
        </div>
        <div className="pill">
          <img src="/spag2.png" alt="Spaghetti" className="pill-img" />
          <div className="pill-txt">
            <span>Fish</span>
            <span>₦800</span>
          </div>
        </div>
        <div className="pill">
          <img src="/spag2.png" alt="Spaghetti" className="pill-img" />
          <div className="pill-txt">
            <span>Plantain</span>
            <span>₦500</span>
          </div>
        </div>
      </div>
       <Link to="/order" className="hero-cta small-cta ">Order Now</Link>
    </section>
  )
}

export default Hero