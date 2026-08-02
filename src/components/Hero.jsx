import './Hero.css'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1 className="hero-title">Fuck "U" Spag</h1>
        <p className="hero-subtitle">Dished to perfection</p>
        <Link to="/order" className="hero-cta">Go to Menu</Link>
      </div>
    </section>
  )
}

export default Hero