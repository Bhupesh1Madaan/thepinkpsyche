import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Image from "next/image";

export default function About() {
    return (
        <div>
            <Navbar />

            {/* Section 1 – Hero */}
            <section className="hero-section">
                <h1 className="hero-title">HI, I AM HARSHA</h1>
                <div className="hero-content">
                    <Image
                        src="/assets/Harsha-about.png"
                        alt="Harsha"
                        width={250}
                        height={300}
                        className="hero-image"
                        priority
                    />
                    <div className="hero-text-container">
                        <p className="hero-text">
                            There was a time when my tears felt endless and my future was a blank page. But sometimes, the darkest moments spark the brightest change.
                        </p>
                        <p className="hero-quote">“What happens when the person you thought you’d spend your life with is suddenly gone? ”</p>
                    </div>
                </div>
            </section>

            {/* Section 2 – Pink Quote Banner */}
            <section className="pink-banner">
                Choosing to rebuild was scary, but every step, rewrote my story
            </section>

            {/* Section 3 – Story + Pointers */}
            <section className="story-section">
                <div className="story-top">
                    <div>
                        <p>
                            Imagine sitting alone in silence while your mind races with fear and doubt.
                            <br />
                            You wonder:
                        </p>
                        <ul className="story-pointers">
                            <li>If you’re good enough,</li>
                            <li>If you’ll ever feel whole again.</li>
                            <li>Simple things, like going to a shop, feel overwhelming because</li>
                        </ul>
                        <p>I know this feeling because I’ve been there.</p>
                    </div>
                    <p className="story-quote">
                        “The fear of judgment is paralyzing.”
                    </p>
                </div>

                <div className="story-center-image">
                    <Image
                        src="/assets/Sadgirl.png"
                        alt="Story Illustration"
                        width={600}
                        height={250}
                    />
                </div>

                <div className="story-bottom">
                    <div>
                        <p>
                            After a heartbreak that left me questioning everything, anxiety consumed me.
                            I couldn’t sleep for months, and tears seemed endless.
                            But one small question changed everything:
                            What did I love before life became so heavy? The answer was reading psychology books in middle school.
                        </p>

                        <p>
                            That spark became my anchor.
                            Slowly, I rebuilt my life, pivoting from STEM to psychology,
                            reclaiming my confidence one step at a time.
                            I learned that:
                        </p>

                        <ul>
                            <li>Courage is a choice,</li>
                            <li>Vulnerability is strength, and</li>
                            <li>Growth comes from facing challenges.</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Section 4 – Pink Highlight */}
            <section className="pink-highlight">
                Healing isn’t all bubble baths and deep breaths.
            </section>

            {/* Section 5 – Image Left, Text Right */}
            <section className="latest-section">
                <Image
                    src="/assets/about3.png"
                    alt="Healing Journey"
                    width={400}
                    height={500}
                    className="latest-image"
                />
                <div className="latest-text">
                    <p>
                        Sometimes it’s ugly crying in the supermarket aisle.
                        At The Pink Psyche, we believe in truth with teeth: we’ll laugh about the awkward bits, but we’ll never downplay the hard stuff.
                        <br />
                        You get:
                    </p>

                    <ul>
                        <li>honesty,</li>
                        <li>empathy, and</li>
                        <li>a dash of wit – because growth is tough, but your spirit is tougher.</li>
                    </ul>
                </div>
            </section>

            {/* Section 6 – Background Image + Tilted Text */}
            <section className="tilted-section">
                <h2 className="tilted-text">Today, The Pink Psyche is where I share my "truth with teeth"—honest, raw, and designed to help you reclaim your story.</h2>
            </section>

            <div className="about-cta">
                <button className="manifesto-button" onClick={() => window.location.href = '/manifesto'}>
                    Read Manifesto
                </button>
            </div>

            <Footer />

            <style jsx>{`
        /* Section 1 – Hero */
        .hero-section {
          background-color: #e9e69c;
          width: 100%;
          padding: 4rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          text-align: center;
        }
        .hero-title {
          font-size: 5rem;
          font-weight: bold;
          padding-right: 500px;
          margin-bottom: 1rem;
          color: #d63384;
        }
        .hero-content {
          display: flex;
          gap: 2rem;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        }
        .hero-image {
          border-radius: 8px;
        }
        .hero-text-container {
          max-width: 500px;
        }
        .hero-text {
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }
        .hero-quote {
          padding-left: 250px;
          padding-top: 50px;
          font-style: italic;
          color: #113692;
          font-weight: bold;
        }

        /* Section 2 – Pink Banner */
        .pink-banner {
          background-color: #f8d7da;
          width: 100%;
          padding: 1rem 2rem;
          text-align: center;
          font-size: 2rem;
          font-style: italic;
          font-weight: bold;
          color: #4c5c44;
        }

        /* Section 3 – Story */
        .story-section {
          width: 100%;
          padding: 4rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          background-color: #f5f5dc;
        }
        .story-top,
        .story-bottom {
          display: flex;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
          padding: 0 17rem;
        }
        .story-pointers {
          list-style: disc;
          padding-left: 1rem;
          flex: 1;
        }
        .story-quote {
          flex: 1;
          font-size: 1.5rem;
          font-style: italic;
          font-weight: bold;
          color: #113692;
        }
        .story-center-image {
          display: flex;
          justify-content: center;
        }

        /* Section 4 – Pink Highlight */
        .pink-highlight {
          background-color: #f8d7da;
          width: 100%;
          padding: 1rem 1rem;
          text-align: center;
          font-size: 2rem;
          font-style: italic;
          font-weight: bold;
          color: #4c5c44;
        }

        /* Section 5 – Latest Image + Text */
        .latest-section {
          display: flex;
          width: 100%;
          gap: 2rem;
          padding: 4rem 2rem;
          align-items: center;
          flex-wrap: wrap;
          background-color: #fffde7;
        }
        .latest-image {
          flex: 1;
          max-width: 400px;
          border-radius: 8px;
        }
        .latest-text {
          flex: 1;
          font-size: 1.1rem;
          line-height: 1.6;
          color: #4c5c44;
          font-weight: bold;
        }

        /* Section 6 – Tilted Text */
        .tilted-section {
          width: 100%;
          height: 700px;
          background-image: url('/assets/about-6.png');
          background-size: cover;
          background-position: center;
          padding: 6rem 2rem;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .tilted-text {
          font-size: 2rem;
          width: 600px;
          color: #ff66c4;
          font-weight: bold;
          transform: rotate(-5deg);
          transition: transform 0.3s ease;
          display: inline-block;
        }
        .tilted-text:hover {
          transform: rotate(-5deg) translateY(-5px);
        }
        
        .about-cta {
            text-align: center;
            margin: 4rem 0;
        }
        .manifesto-button {
            background-color: #d63384;
            color: #fff;
            border: none;
            padding: 1rem 2rem;
            font-size: 1.2rem;
            font-weight: bold;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .manifesto-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 15px rgba(0,0,0,0.2);
        }

        /* Hover effect on all images */
        img:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-content,
          .story-top,
          .story-bottom,
          .latest-section {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
        </div>
    );
}
