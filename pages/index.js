import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Footer from '../components/footer';
import axios from 'axios';
import { useRouter } from 'next/router';
import Navbar from '../components/navbar';

const styles = {
  body: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#fefefe',
    lineHeight: 1.6,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 0
  },
  scrollFade: { opacity: 0, transform: 'translateY(40px)', transition: 'opacity 1s ease, transform 1s ease' },

  // Image Hover Effect
  imageHover: {
    transition: 'transform 0.3s ease',
    cursor: 'pointer'
  },

  // Section 1
  heroSection: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    backgroundImage: "url('/assets/Untitled design (4).png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  heroHeading: { fontSize: '5vw', color: '#fff500', fontWeight: 700 },
  heroSubheading: { fontSize: '2vw', fontStyle: 'italic', color: '#fff', marginTop: '20px' },
  heroButtons: { marginTop: '30px', display: 'flex', gap: '20px' },
  heroButton: {
    padding: '12px 30px',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#0f5101',
    color: '#fff',
    transition: '0.3s'
  },

  // Section 2
  pinkBanner: {
    position: 'relative',
    width: '100%',
    backgroundImage: "url('/assets/Backgrounds .png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '80px 20px'
  },
  pinkBannerHeading: { fontSize: '2.5rem', color: '#000', textAlign: 'center', marginBottom: '40px' },
  pinkBannerImage: { width: '800px', maxWidth: '90%' },

  // Section 3 – Categories
  categoryContainer: {
    display: 'flex',
    width: '100%',
    maxWidth: '1300px',
    height: '400px',
    overflow: 'hidden',
    margin: '50px auto',
    backgroundImage: "url('/assets/blue-bg.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center'
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
  categoryBoxActive: { flex: 3, color: 'white' },
  categoryTitle: { fontSize: '32px', fontWeight: 'bold', margin: 0, alignSelf: 'flex-start', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.6)' },
  categoryDescription: { fontSize: '16px', marginTop: '10px', maxWidth: '80%', color: 'white', alignSelf: 'flex-start', textShadow: '0 2px 4px rgba(0,0,0,0.6)' },

  // Section 4 – Pink Highlight
  pinkHighlight: {
    position: 'relative',
    width: '100%',
    backgroundImage: "url('/assets/Backgrounds Pink.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textAlign: 'center',
    padding: '80px 20px',
    fontStyle: 'italic',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#000'
  },

  // Section 5 – Latest Blogs
  latestBlogsSection: {
    position: 'relative',
    width: '100%',
    backgroundImage: "url('/assets/Backgrounds Blue.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '80px 20px'
  },
  blogsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', maxWidth: '1200px', margin: '0 auto' },
  blogCard: { backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '10px', padding: '20px', textAlign: 'center' },
  blogTitle: { fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' },
  blogExcerpt: { fontSize: '1rem', color: '#333' },

  // Section 6 – Contact
  contactSection: { padding: '40px 20px' },
  contactWrapper: { display: 'flex', gap: '30px', justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap' },
  contactForm: { flex: 1, minWidth: '300px', backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' },
  formInput: { width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '6px' },
  formButton: { width: '100%', padding: '12px', backgroundColor: '#0f5101', color: 'white', fontWeight: 'bold', cursor: 'pointer', border: 'none', borderRadius: '6px' },
};

const CategorySection = ({ categories, activeCategory, setActiveCategory }) => {
  const router = useRouter();

  return (
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
            {activeCategory === cat._id && <p style={styles.categoryDescription}>{cat.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [showNavbar, setShowNavbar] = useState(false);
  const observerRef = useRef();
  const router = useRouter();

  const [latestBlogs, setLatestBlogs] = useState([]);

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

    const fetchBlogs = async () => {
      try {
        const res = await axios.get('/api/blogs?limit=3'); // latest 3 blogs
        setLatestBlogs(res.data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      }
    };
    fetchBlogs();
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
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowNavbar(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log('Form submitted:', Object.fromEntries(formData));
    document.getElementById('response-message').textContent = 'Message sent successfully!';
  };

  // helper function to add image hover effect
  const handleHover = (e) => {
    e.currentTarget.style.transform = 'scale(1.05)';
  };
  const handleLeave = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
  };

  return (
    <>
      <Navbar animate={true} forceShow={showNavbar} />
      <div style={styles.body}>

        {/* Section 1 – Hero */}
        <section style={styles.heroSection} className="scroll-fade">
          <h1 style={styles.heroHeading}>THE PINK PSYCHE</h1>
          <p style={styles.heroSubheading}>Chase Friction, Relentlessly</p>
          <div style={styles.heroButtons}>
            <button style={styles.heroButton} onClick={() => router.push('/manifesto')}>Manifesto</button>
            <button style={styles.heroButton} onClick={() => router.push('/blogs')}>Blogs</button>
          </div>
        </section>

        {/* Section 2 – Pink Banner */}
        <section style={styles.pinkBanner} className="scroll-fade">
          <h2 style={styles.pinkBannerHeading}>My Real Competition? Your Self Sabotage</h2>
          <img
            src="/assets/The Pink Psyche.png"
            alt="Section 2 Image"
            style={styles.pinkBannerImage}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          />
        </section>

        {/* Section 3 – Categories */}
        <section
          style={{
            backgroundImage: "url('/assets/Backgrounds Blue.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '60px 20px',
            textAlign: 'center',
            color: 'white',
            width: '100%'
          }}
        >
          <h1
            style={{
              color: 'black',
              fontSize: '40px',
              fontWeight: '700',
              marginBottom: '40px',
            }}
          >
            Blog Categories
          </h1>

          <CategorySection
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </section>

        {/* Section 4 – Pink Highlight */}
        <section style={styles.pinkHighlight} className="scroll-fade">
          <p>A LITTLE SOMETHING FOR EVERYONE</p>
        </section>

        {/* Section 5 – Latest Blogs */}
        <section style={styles.latestBlogsSection} className="scroll-fade">
          <div style={styles.blogsGrid}>
            {latestBlogs.map(blog => (
              <div
                key={blog._id}
                style={styles.blogCard}
                onClick={() => router.push(`/blog/${blog.slug}`)}
              >
                <h3 style={styles.blogTitle}>{blog.title}</h3>
                <p style={styles.blogExcerpt}>{blog.excerpt}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6 – Contact */}
        <section style={styles.contactSection}>
          <div style={styles.contactWrapper}>
            <div style={styles.contactForm}>
              <form onSubmit={handleContactSubmit}>
                <input type="text" name="name" placeholder="Name" required style={styles.formInput} />
                <input type="email" name="email" placeholder="Email" required style={styles.formInput} />
                <textarea name="message" placeholder="Message" required style={styles.formInput}></textarea>
                <button type="submit" style={styles.formButton}>Send</button>
              </form>
              <p id="response-message" style={{ marginTop: '10px', color: 'green' }}></p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
