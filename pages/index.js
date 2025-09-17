import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function Home() {
  const [categories, setCategories] = useState({});
  const [activeCategory, setActiveCategory] = useState('');
  const [bannerTextStyle, setBannerTextStyle] = useState({});
  const [headerStyle, setHeaderStyle] = useState({ top: '-100px' });
  const [headerLogoText, setHeaderLogoText] = useState('');
  const observerRef = useRef();

  // Load categories data (you'll need to create this JSON file or API endpoint)
  useEffect(() => {
    // Mock data - replace with actual fetch from blogs.json
    const mockData = {
      categories: {
        travel: { name: 'Travel' },
        books: { name: 'Books' },
        consciousness: { name: 'Consciousness' },
        encouragement: { name: 'Encouragement' },
        howtodo: { name: 'How to Do' }
      }
    };
    setCategories(mockData.categories);
    setActiveCategory('travel');
  }, []);

  // Scroll fade observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    });

    const scrollFadeElements = document.querySelectorAll('.scroll-fade');
    scrollFadeElements.forEach(el => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Scroll handler for banner text and header
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 100) {
        setBannerTextStyle({
          top: "25px",
          left: "70px",
          transform: "translate(0, 0)",
          fontSize: "24px",
          color: "#333",
          textShadow: "none"
        });
        setHeaderStyle({ top: "0" });
        setHeaderLogoText("The Pink Psyche");
      } else {
        setBannerTextStyle({
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "5vw",
          color: "#fff500",
          textShadow: "0 0 10px rgba(0,0,0,0.5)"
        });
        setHeaderStyle({ top: "-100px" });
        setHeaderLogoText("");
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryHover = (categoryKey) => {
    setActiveCategory(categoryKey);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    const formData = new FormData(e.target);
    console.log('Form submitted:', Object.fromEntries(formData));
    document.getElementById('response-message').textContent = 'Message sent successfully!';
  };

  const styles = {
    global: {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    },
    body: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#fefefe',
      lineHeight: 1.6,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: 0
    },
    videoBanner: {
      position: 'relative',
      height: '100vh',
      width: '100%',
      overflow: 'hidden'
    },
    bannerImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    bannerText: {
      position: 'absolute',
      color: '#fff500',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '2px',
      transition: 'all 0.5s ease',
      zIndex: 2,
      whiteSpace: 'nowrap',
      ...bannerTextStyle
    },
    mainHeader: {
      position: 'fixed',
      left: 0,
      width: '100%',
      padding: '20px',
      backgroundColor: 'rgba(249, 249, 241, 0.98)',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      transition: 'all 0.5s ease',
      zIndex: 100,
      ...headerStyle
    },
    headerLogo: {
      fontSize: '24px',
      fontWeight: 700,
      color: '#333',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      marginLeft: '20px'
    },
    navLinks: {
      marginLeft: 'auto',
      display: 'flex',
      gap: '30px'
    },
    navLink: {
      textDecoration: 'none',
      color: '#333',
      fontSize: '16px',
      transition: 'color 0.3s ease'
    },
    main: {
      maxWidth: '100%',
      margin: 'auto',
      padding: '20px',
      textAlign: 'center'
    },
    bg1: {
      backgroundColor: 'pink',
      width: '100%',
      padding: '40px'
    },
    scrollFade: {
      opacity: 0,
      transform: 'translateY(40px)',
      transition: 'opacity 1s ease, transform 1s ease'
    },
    categoryContainer: {
      display: 'flex',
      width: '100%',
      maxWidth: '1300px',
      height: '400px',
      overflow: 'hidden',
      margin: '50px auto'
    },
    categoryBox: {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'black',
      position: 'relative',
      transition: 'all 0.5s ease',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      cursor: 'pointer',
      flex: 1
    },
    categoryBoxActive: {
      flex: 3,
      color: 'white'
    },
    aboutMe: {
      backgroundColor: '#0f5101',
      padding: '30px',
      color: 'white',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    hdImg: {
      height: '700px',
      width: '500px'
    },
    textAbout: {
      color: '#f6cc77',
      width: '700px',
      marginLeft: '50px'
    },
    contactSection: {
      padding: '40px 20px'
    },
    contactWrapper: {
      display: 'flex',
      gap: '30px',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexWrap: 'wrap'
    },
    mapContainer: {
      flex: 1,
      minWidth: '300px'
    },
    map: {
      height: '400px',
      width: '100%',
      borderRadius: '10px',
      backgroundColor: '#e0e0e0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    contactForm: {
      flex: 1,
      minWidth: '300px',
      backgroundColor: 'white',
      padding: '25px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    },
    formInput: {
      width: '100%',
      padding: '12px',
      marginBottom: '15px',
      border: '1px solid #ccc',
      borderRadius: '6px'
    },
    formButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#0f5101',
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer',
      border: 'none',
      borderRadius: '6px'
    },
    footer: {
      background: '#222',
      color: 'white',
      textAlign: 'center',
      padding: '15px',
      marginTop: '40px',
      width: '100%'
    },
    footerNav: {
      listStyle: 'none',
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      paddingBottom: '15px',
      marginBottom: '15px',
      borderBottom: '1px solid #666'
    },
    footerLink: {
      color: '#ccc',
      textDecoration: 'none'
    }
  };

  const getCategoryBackgroundImage = (key) => {
    const images = {
      travel: '/assets/Travel-Russia.jpeg',
      books: '/assets/reading-book.png',
      consciousness: '/assets/consciousness.jpeg',
      encouragement: '/assets/Travel-Russia.jpeg',
      howtodo: '/assets/TPP 1.jpeg'
    };
    return images[key] || '';
  };

  return (
    <>
      <Head>
        <title>Home - The Pink Psyche</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Fjalla+One&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

      <div style={styles.body}>
        <div style={styles.videoBanner}>
          <img
            src="/assets/The Pink Psyche.png"
            alt="MIND, SOUL, BODY"
            style={styles.bannerImage}
          />
          <div
            id="bannerText"
            style={styles.bannerText}
          >
            The Pink Psyche
          </div>
        </div>

        <header id="main-header" style={styles.mainHeader}>
          <div style={styles.headerLogo}>
            {headerLogoText}
          </div>
          <nav style={styles.navLinks}>
            <a href="/hero" style={styles.navLink}>Home</a>
            <a href="/about" style={styles.navLink}>About</a>
            <a href="/blogs" style={styles.navLink}>Services</a>
            <a href="/community" style={styles.navLink}>Contact</a>
          </nav>
        </header>

        <main style={styles.main}>
          <div className="scroll-fade" style={{ ...styles.bg1, ...styles.scrollFade }}>
            <h1>My Real Competition? Your Self Sabotage</h1>
          </div>

          <div className="scroll-fade" style={{ ...styles.scrollFade, margin: '40px 0' }}>
            <h2>Articles Category</h2>
          </div>

          <div className="scroll-fade" style={{ ...styles.categoryContainer, ...styles.scrollFade }}>
            {Object.entries(categories).map(([key, cat], index) => (
              <div
                key={key}
                style={{
                  ...styles.categoryBox,
                  ...(activeCategory === key ? styles.categoryBoxActive : {}),
                  backgroundImage: `url(${getCategoryBackgroundImage(key)})`
                }}
                onMouseEnter={() => handleCategoryHover(key)}
                onClick={() => window.location.href = `/blogs?category=${key}`}
              >
                <h3>{cat.name}</h3>
                <div style={{ display: activeCategory === key ? 'block' : 'none', marginTop: '20px' }}>
                  {/* Category content can go here */}
                </div>
              </div>
            ))}
          </div>

          <div className="scroll-fade" style={{ ...styles.aboutMe, ...styles.scrollFade }}>
            <img
              src="/assets/Founder of TPP.png"
              alt="Harsha Dabas - Founder of The Pink Psyche"
              style={styles.hdImg}
            />
            <div style={styles.textAbout}>
              <h2 style={{ fontSize: '50px', marginBottom: '20px' }}>Meet Our Founder</h2>
              <p>There was a time when my tears felt endless and my future was a blank page. But sometimes, the darkest moments spark the brightest change.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis facilisis dignissim mauris. Proin eget erat et enim lacinia tempus vel pharetra mi. In tempus, libero et consectetur gravida, mi leo gravida quam, vitae condimentum quam enim quis nisl. Aenean in porta sapien, vel varius felis. Etiam erat eros, ultricies dictum aliquam et, blandit in sapien. Vivamus eget suscipit erat. Maecenas pharetra aliquam urna at congue. Suspendisse tempor, tellus a suscipit lobortis, sapien dolor viverra mi, sed pretium orci dolor eu lectus.</p>
            </div>
          </div>

          <section className="scroll-fade" style={{ ...styles.contactSection, ...styles.scrollFade }}>
            <h2>Contact Us</h2>
            <div style={styles.contactWrapper}>
              <div style={styles.mapContainer}>
                <div id="map" style={styles.map}>
                  Map will load here
                </div>
              </div>

              <form onSubmit={handleContactSubmit} style={styles.contactForm}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  style={styles.formInput}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  style={styles.formInput}
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  style={{ ...styles.formInput, minHeight: '100px', resize: 'vertical' }}
                />
                <button
                  type="submit"
                  style={styles.formButton}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#0c3d01'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#0f5101'}
                >
                  Send
                </button>
                <p id="response-message" style={{ marginTop: '10px', color: 'green' }}></p>
              </form>
            </div>
          </section>
        </main>

        <footer style={styles.footer}>
          <ul style={styles.footerNav}>
            <li><a href="#" style={styles.footerLink}>Home</a></li>
            <li><a href="#" style={styles.footerLink}>Features</a></li>
            <li><a href="#" style={styles.footerLink}>Pricing</a></li>
            <li><a href="#" style={styles.footerLink}>FAQs</a></li>
            <li><a href="#" style={styles.footerLink}>About</a></li>
          </ul>
          <p>© 2025 Company, Inc</p>
        </footer>
      </div>
    </>
  );
}