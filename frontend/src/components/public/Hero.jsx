
import heroBanner from "../../assets/images/hero-banner.png";

const styles = `

.hero-section{

    width:100%;

}

.hero-image{

    width:100%;

    display:block;

    object-fit:cover;

}
`


function Hero() {

    return (

        <section className="hero-section">
            <style>{styles}</style>
            <img
                src={heroBanner}
                alt="Vetri Matrimony Banner"
                className="hero-image"
            />

        </section>

    );

}

export default Hero;