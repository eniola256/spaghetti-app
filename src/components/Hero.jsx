import './Hero.css'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-col hero-text-col">
        <h1 className="hero-title">Spag <br /> <span>Zone</span></h1>
        <p className="hero-subtitle">Deliciousness awaits you <br />just a click away!</p>
        <Link to="/order" className="hero-cta">Order Now</Link>
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
    </section>
  )
}

export default Hero