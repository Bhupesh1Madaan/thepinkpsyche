// import React, { useState, useEffect, useRef } from 'react';
// import Head from 'next/head';
// import Footer from '../components/footer';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import Navbar from '../components/navbar';

// const styles = {
//   categoryContainer: {
//     display: 'flex',
//     width: '100%',
//     maxWidth: '1300px',
//     height: '400px', // fixed container height
//     overflow: 'hidden',
//     margin: '50px auto'
//   },
//   categoryBox: {
//     flex: 1,               // default width
//     height: '100%',        // full container height
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     color: 'black',
//     position: 'relative',
//     transition: 'all 0.5s ease',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'flex-end',
//     alignItems: 'flex-end',
//     cursor: 'pointer',
//     minWidth: '150px',     // minimum width so it doesn't shrink too much
//   },
//   categoryBoxActive: {
//     flex: 3,               // hover expand width
//     color: 'white'
//   },
//   categoryTitle: {
//     fontSize: '32px',
//     fontWeight: 'bold',
//     margin: 0,
//     alignSelf: 'flex-start',
//     color: 'white',
//     textShadow: '0 2px 4px rgba(0,0,0,0.6)'
//   },
//   categoryDescription: {
//     fontSize: '16px',
//     marginTop: '10px',
//     maxWidth: '80%',
//     color: 'white',
//     alignSelf: 'flex-start',
//     textShadow: '0 2px 4px rgba(0,0,0,0.6)'
//   }
// };

// const CategorySection = ({ categories, activeCategory, setActiveCategory }) => {
//   const router = useRouter();

//   return (
//     <>
//       <h2 className="scroll-fade" style={styles.scrollFade}>Articles Category</h2>
//       <div className="scroll-fade" style={{ ...styles.categoryContainer, ...styles.scrollFade }}>
//         {categories.map((cat) => (
//           <div
//             key={cat._id}
//             style={{
//               ...styles.categoryBox,
//               ...(activeCategory === cat._id ? styles.categoryBoxActive : {}),
//               backgroundImage: `url(${cat.image})`
//             }}
//             onMouseEnter={() => setActiveCategory(cat._id)}
//             onClick={() => router.push(`/blogs?category=${encodeURIComponent(cat.name)}`)}
//           >
//             <div style={{ textAlign: 'left', width: '100%' }}>
//               <h3 style={styles.categoryTitle}>{cat.name}</h3>
//               {activeCategory === cat._id && (
//                 <p style={styles.categoryDescription}>{cat.description}</p>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// // Removed duplicate export default Hero function as it is not used in the file.

// export default function Home() {
//   const [categories, setCategories] = useState([]);
//   const [activeCategory, setActiveCategory] = useState('');
//   const [bannerTextStyle, setBannerTextStyle] = useState({});
//   const [headerStyle, setHeaderStyle] = useState({ top: '-100px' });
//   const [headerLogoText, setHeaderLogoText] = useState('');
//   const observerRef = useRef();

//   // Load categories data (you'll need to create this JSON file or API endpoint)
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get('/api/categories');
//         setCategories(res.data);
//         if (res.data.length > 0) setActiveCategory(res.data[0]._id);
//       } catch (err) {
//         console.error('Error fetching categories:', err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Scroll fade observer
//   useEffect(() => {
//     observerRef.current = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           entry.target.style.opacity = '1';
//           entry.target.style.transform = 'translateY(0)';
//         }
//       });
//     });

//     const scrollFadeElements = document.querySelectorAll('.scroll-fade');
//     scrollFadeElements.forEach(el => observerRef.current.observe(el));

//     return () => {
//       if (observerRef.current) {
//         observerRef.current.disconnect();
//       }
//     };
//   }, []);

//   // Scroll handler for banner text and header
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 100) {
//         setHeroStyle({
//           top: "20px",
//           left: "20px",
//           transform: "translate(0, 0)",
//           fontSize: "24px",
//           color: "#333",
//           textShadow: "none"
//         });
//         setShowNavbar(true); // 👈 text upar gaya toh navbar dikhao
//       } else {
//         setHeroStyle({
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           fontSize: "5vw",
//           color: "#fff500",
//           textShadow: "0 0 10px rgba(0,0,0,0.5)"
//         });
//         setShowNavbar(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleCategoryHover = (categoryKey) => {
//     setActiveCategory(categoryKey);
//   };

//     const handleContactSubmit = (e) => {
//       e.preventDefault();
//       // Handle form submission here
//       const formData = new FormData(e.target);
//       console.log('Form submitted:', Object.fromEntries(formData));
//       document.getElementById('response-message').textContent = 'Message sent successfully!';
//     };

//     const styles = {
//       global: {
//         margin: 0,
//         padding: 0,
//         boxSizing: 'border-box'
//       },
//       body: {
//         fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//         backgroundColor: '#fefefe',
//         lineHeight: 1.6,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         margin: 0
//       },
//       videoBanner: {
//         position: 'relative',
//         height: '100vh',
//         width: '100%',
//         overflow: 'hidden'
//       },
//       bannerImage: {
//         width: '100%',
//         height: '100%',
//         objectFit: 'cover'
//       },
//       bannerText: {
//         position: 'absolute',
//         color: '#fff500',
//         fontWeight: 700,
//         textTransform: 'uppercase',
//         letterSpacing: '2px',
//         transition: 'all 0.5s ease',
//         zIndex: 2,
//         whiteSpace: 'nowrap',
//         ...bannerTextStyle
//       },
//       mainHeader: {
//         position: 'fixed',
//         left: 0,
//         width: '100%',
//         padding: '20px',
//         backgroundColor: 'rgba(249, 249, 241, 0.98)',
//         boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//         display: 'flex',
//         alignItems: 'center',
//         transition: 'all 0.5s ease',
//         zIndex: 100,
//         ...headerStyle
//       },
//       headerLogo: {
//         fontSize: '24px',
//         fontWeight: 700,
//         color: '#333',
//         textTransform: 'uppercase',
//         letterSpacing: '1px',
//         marginLeft: '20px'
//       },
//       navLinks: {
//         marginLeft: 'auto',
//         display: 'flex',
//         gap: '30px'
//       },
//       navLink: {
//         textDecoration: 'none',
//         color: '#333',
//         fontSize: '16px',
//         transition: 'color 0.3s ease'
//       },
//       main: {
//         maxWidth: '100%',
//         margin: 'auto',
//         padding: '20px',
//         textAlign: 'center'
//       },
//       bg1: {
//         backgroundColor: 'pink',
//         width: '100%',
//         padding: '40px'
//       },
//       scrollFade: {
//         opacity: 0,
//         transform: 'translateY(40px)',
//         transition: 'opacity 1s ease, transform 1s ease'
//       },
      
//       aboutMe: {
//         backgroundColor: '#0f5101',
//         padding: '30px',
//         color: 'white',
//         width: '100%',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center'
//       },
//       hdImg: {
//         height: '700px',
//         width: '500px'
//       },
//       textAbout: {
//         color: '#f6cc77',
//         width: '700px',
//         marginLeft: '50px'
//       },
//       contactSection: {
//         padding: '40px 20px'
//       },
//       contactWrapper: {
//         display: 'flex',
//         gap: '30px',
//         justifyContent: 'center',
//         alignItems: 'flex-start',
//         flexWrap: 'wrap'
//       },
//       mapContainer: {
//         flex: 1,
//         minWidth: '300px'
//       },
//       map: {
//         height: '400px',
//         width: '100%',
//         borderRadius: '10px',
//         backgroundColor: '#e0e0e0',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center'
//       },
//       contactForm: {
//         flex: 1,
//         minWidth: '300px',
//         backgroundColor: 'white',
//         padding: '25px',
//         borderRadius: '10px',
//         boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
//       },
//       formInput: {
//         width: '100%',
//         padding: '12px',
//         marginBottom: '15px',
//         border: '1px solid #ccc',
//         borderRadius: '6px'
//       },
//       formButton: {
//         width: '100%',
//         padding: '12px',
//         backgroundColor: '#0f5101',
//         color: 'white',
//         fontWeight: 'bold',
//         cursor: 'pointer',
//         border: 'none',
//         borderRadius: '6px'
//       },
//       footer: {
//         background: '#222',
//         color: 'white',
//         textAlign: 'center',
//         padding: '15px',
//         marginTop: '40px',
//         width: '100%'
//       },
//       footerNav: {
//         listStyle: 'none',
//         display: 'flex',
//         justifyContent: 'center',
//         gap: '20px',
//         paddingBottom: '15px',
//         marginBottom: '15px',
//         borderBottom: '1px solid #666'
//       },
//       footerLink: {
//         color: '#ccc',
//         textDecoration: 'none'
//       }
//     };

//     const getCategoryBackgroundImage = (key) => {
//       const images = {
//         travel: '/assets/Travel-Russia.jpeg',
//         books: '/assets/reading-book.png',
//         consciousness: '/assets/consciousness.jpeg',
//         encouragement: '/assets/Travel-Russia.jpeg',
//         howtodo: '/assets/TPP 1.jpeg'
//       };
//       return images[key] || '';
//     };

//     return (
//       <>
//         {/* <Head>
//           <title>Home - The Pink Psyche</title>
//           <link rel="preconnect" href="https://fonts.googleapis.com" />
//           <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
//           <link href="https://fonts.googleapis.com/css2?family=Fjalla+One&display=swap" rel="stylesheet" />
//           {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" /> *
//         </Head> */}


//         <div style={styles.body}>
//           <div className='hero'>
//             <img
//               src="/assets/The Pink Psyche.png"
//               alt="MIND, SOUL, BODY"
//               className='heroImage'
//             />
//             <div
//               className="heroText"
//               id="heroText"
//               style={bannerTextStyle}
//             >
//               The Pink Psyche
//             </div>
//           </div>

//           <Navbar animate={true} forceShow={showNavbar} />

//           {/* <header id="main-header" style={styles.mainHeader}>
//             <div style={styles.headerLogo}>
//               {headerLogoText}
//             </div>
//             <nav style={styles.navLinks}>
//               <a href="/" style={styles.navLink}>Home</a>
//               <a href="/about" style={styles.navLink}>About</a>
//               <a href="/blogs" style={styles.navLink}>Blogs</a>
//               <a href="/contactus" style={styles.navLink}>Contact</a>
//             </nav>
//           </header> */}
//           <Navbar />
//           <main style={styles.main}>
//             <div className="scroll-fade" style={{ ...styles.bg1, ...styles.scrollFade }}>
//               <h1>My Real Competition? Your Self Sabotage</h1>
//             </div>

//             <CategorySection
//               categories={categories}
//               activeCategory={activeCategory}
//               setActiveCategory={setActiveCategory}
//             />
            
//             <div className="scroll-fade" style={{ ...styles.aboutMe, ...styles.scrollFade }}>
//               <img
//                 src="/assets/Founder of TPP.png"
//                 alt="Harsha Dabas - Founder of The Pink Psyche"
//                 style={styles.hdImg}
//               />
//               <div style={styles.textAbout}>
//                 <h2 style={{ fontSize: '50px', marginBottom: '20px' }}>Meet Our Founder</h2>
//                 <p>There was a time when my tears felt endless and my future was a blank page. But sometimes, the darkest moments spark the brightest change.</p>
//                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis facilisis dignissim mauris. Proin eget erat et enim lacinia tempus vel pharetra mi. In tempus, libero et consectetur gravida, mi leo gravida quam, vitae condimentum quam enim quis nisl. Aenean in porta sapien, vel varius felis. Etiam erat eros, ultricies dictum aliquam et, blandit in sapien. Vivamus eget suscipit erat. Maecenas pharetra aliquam urna at congue. Suspendisse tempor, tellus a suscipit lobortis, sapien dolor viverra mi, sed pretium orci dolor eu lectus.</p>
//               </div>
//             </div>

//             <section className="scroll-fade" style={{ ...styles.contactSection, ...styles.scrollFade }}>
//               <h2>Contact Us</h2>
//               <div style={styles.contactWrapper}>
//                 <div style={styles.mapContainer}>
//                   <div id="map" style={styles.map}>
//                     Map will load here
//                   </div>
//                 </div>

//                 <form onSubmit={handleContactSubmit} style={styles.contactForm}>
//                   <input
//                     type="text"
//                     name="name"
//                     placeholder="Your Name"
//                     required
//                     style={styles.formInput}
//                   />
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Your Email"
//                     required
//                     style={styles.formInput}
//                   />
//                   <textarea
//                     name="message"
//                     placeholder="Your Message"
//                     required
//                     style={{ ...styles.formInput, minHeight: '100px', resize: 'vertical' }}
//                   />
//                   <button
//                     type="submit"
//                     style={styles.formButton}
//                     onMouseOver={(e) => e.target.style.backgroundColor = '#0c3d01'}
//                     onMouseOut={(e) => e.target.style.backgroundColor = '#0f5101'}
//                   >
//                     Send
//                   </button>
//                   <p id="response-message" style={{ marginTop: '10px', color: 'green' }}></p>
//                 </form>
//               </div>
//             </section>
//           </main>

//           {/* <footer style={styles.footer}>
//           <ul style={styles.footerNav}>
//             <li><a href="#" style={styles.footerLink}>Home</a></li>
//             <li><a href="#" style={styles.footerLink}>Features</a></li>
//             <li><a href="#" style={styles.footerLink}>Pricing</a></li>
//             <li><a href="#" style={styles.footerLink}>FAQs</a></li>
//             <li><a href="#" style={styles.footerLink}>About</a></li>
//           </ul>
//           <p>© 2025 Company, Inc</p>
//         </footer> */}
//         </div>
//         <Footer />
//       </>

//     );
// }

import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Footer from '../components/footer';
import axios from 'axios';
import { useRouter } from 'next/router';
import Navbar from '../components/navbar';

const styles = {
  categoryContainer: {
    display: 'flex',
    width: '100%',
    maxWidth: '1300px',
    height: '400px',
    overflow: 'hidden',
    margin: '50px auto'
  },
  categoryBox: {
    flex: 1,
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'black',
    position: 'relative',
    transition: 'all 0.5s ease',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    cursor: 'pointer',
    minWidth: '150px',
  },
  categoryBoxActive: {
    flex: 3,
    color: 'white'
  },
  categoryTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    margin: 0,
    alignSelf: 'flex-start',
    color: 'white',
    textShadow: '0 2px 4px rgba(0,0,0,0.6)'
  },
  categoryDescription: {
    fontSize: '16px',
    marginTop: '10px',
    maxWidth: '80%',
    color: 'white',
    alignSelf: 'flex-start',
    textShadow: '0 2px 4px rgba(0,0,0,0.6)'
  }
};

const CategorySection = ({ categories, activeCategory, setActiveCategory }) => {
  const router = useRouter();

  return (
    <>
      <h2 className="scroll-fade" style={styles.scrollFade}>Articles Category</h2>
      <div className="scroll-fade" style={{ ...styles.categoryContainer, ...styles.scrollFade }}>
        {categories.map((cat) => (
          <div
            key={cat._id}
            style={{
              ...styles.categoryBox,
              ...(activeCategory === cat._id ? styles.categoryBoxActive : {}),
              backgroundImage: `url(${cat.image})`
            }}
            onMouseEnter={() => setActiveCategory(cat._id)}
            onClick={() => router.push(`/blogs?category=${encodeURIComponent(cat.name)}`)}
          >
            <div style={{ textAlign: 'left', width: '100%' }}>
              <h3 style={styles.categoryTitle}>{cat.name}</h3>
              {activeCategory === cat._id && (
                <p style={styles.categoryDescription}>{cat.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [bannerTextStyle, setBannerTextStyle] = useState({});
  const [headerStyle, setHeaderStyle] = useState({ top: '-100px' });
  const [headerLogoText, setHeaderLogoText] = useState('');
  const observerRef = useRef();

  // 🔥 Added missing states
  const [heroStyle, setHeroStyle] = useState({
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "5vw",
    color: "#fff500",
    textShadow: "0 0 10px rgba(0,0,0,0.5)"
  });
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('/api/categories');
        setCategories(res.data);
        if (res.data.length > 0) setActiveCategory(res.data[0]._id);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHeroStyle({
          top: "20px",
          left: "20px",
          transform: "translate(0, 0)",
          fontSize: "24px",
          color: "#333",
          textShadow: "none"
        });
        setShowNavbar(true);
      } else {
        setHeroStyle({
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "5vw",
          color: "#fff500",
          textShadow: "0 0 10px rgba(0,0,0,0.5)"
        });
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCategoryHover = (categoryKey) => {
    setActiveCategory(categoryKey);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log('Form submitted:', Object.fromEntries(formData));
    document.getElementById('response-message').textContent = 'Message sent successfully!';
  };

  const styles = {
    global: { margin: 0, padding: 0, boxSizing: 'border-box' },
    body: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#fefefe',
      lineHeight: 1.6,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: 0
    },
    videoBanner: { position: 'relative', height: '100vh', width: '100%', overflow: 'hidden' },
    bannerImage: { width: '100%', height: '100%', objectFit: 'cover' },
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
    navLinks: { marginLeft: 'auto', display: 'flex', gap: '30px' },
    navLink: { textDecoration: 'none', color: '#333', fontSize: '16px', transition: 'color 0.3s ease' },
    main: { maxWidth: '150%', margin: 'auto', padding: '20px', textAlign: 'center' },
    bg1: { backgroundColor: 'pink', width: '100%', padding: '40px' },
    scrollFade: { opacity: 0, transform: 'translateY(40px)', transition: 'opacity 1s ease, transform 1s ease' },
    aboutMe: { backgroundColor: '#0f5101', padding: '30px', color: 'white', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' },
    hdImg: { height: '700px', width: '500px' },
    textAbout: { color: '#f6cc77', width: '700px', marginLeft: '50px' },
    contactSection: { padding: '40px 20px' },
    contactWrapper: { display: 'flex', gap: '30px', justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap' },
    mapContainer: { flex: 1, minWidth: '300px' },
    map: { height: '400px', width: '100%', borderRadius: '10px', backgroundColor: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    contactForm: { flex: 1, minWidth: '300px', backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' },
    formInput: { width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '6px' },
    formButton: { width: '100%', padding: '12px', backgroundColor: '#0f5101', color: 'white', fontWeight: 'bold', cursor: 'pointer', border: 'none', borderRadius: '6px' },
    footer: { background: '#222', color: 'white', textAlign: 'center', padding: '15px', marginTop: '40px', width: '100%' },
    footerNav: { listStyle: 'none', display: 'flex', justifyContent: 'center', gap: '20px', paddingBottom: '15px', marginBottom: '15px', borderBottom: '1px solid #666' },
    footerLink: { color: '#ccc', textDecoration: 'none' }
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
      <Navbar animate={true} forceShow={showNavbar} />
      <div style={styles.body}>
        <div className='hero'>
          <img src="/assets/The Pink Psyche.png" alt="MIND, SOUL, BODY" className='heroImage' />
          <div className="heroText" id="heroText" style={heroStyle}>The Pink Psyche</div>
        </div>

        {/* ✅ Fixed Navbar usage */}
        <Navbar animate={true} forceShow={showNavbar} />

        <main style={styles.main}>
          <div className="scroll-fade" style={{ ...styles.bg1, ...styles.scrollFade }}>
            <h1>My Real Competition? Your Self Sabotage</h1>
          </div>

          <CategorySection categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

          <div className="scroll-fade" style={{ ...styles.aboutMe, ...styles.scrollFade }}>
            <img src="/assets/Founder of TPP.png" alt="Harsha Dabas - Founder of The Pink Psyche" style={styles.hdImg} />
            <div style={styles.textAbout}>
              <h2 style={{ fontSize: '50px', marginBottom: '20px' }}>Meet Our Founder</h2>
              <p>There was a time when my tears felt endless and my future was a blank page. But sometimes, the darkest moments spark the brightest change.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis facilisis dignissim mauris. Proin eget erat et enim lacinia tempus vel pharetra mi...</p>
            </div>
          </div>

          <section className="scroll-fade" style={{ ...styles.contactSection, ...styles.scrollFade }}>
            <h2>Contact Us</h2>
            <div style={styles.contactWrapper}>
              <div style={styles.mapContainer}>
                {/* <div id="map" style={styles.map}>Map will load here</div> */}
                <img src='/assets/contact-us.jpg' alt='Contact-us' style={styles.map}/>
              </div>

              <form onSubmit={handleContactSubmit} style={styles.contactForm}>
                <input type="text" name="name" placeholder="Your Name" required style={styles.formInput} />
                <input type="email" name="email" placeholder="Your Email" required style={styles.formInput} />
                <textarea name="message" placeholder="Your Message" required style={{ ...styles.formInput, minHeight: '100px', resize: 'vertical' }} />
                <button type="submit" style={styles.formButton}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#0c3d01'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#0f5101'}>Send</button>
                <p id="response-message" style={{ marginTop: '10px', color: 'green' }}></p>
              </form>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}