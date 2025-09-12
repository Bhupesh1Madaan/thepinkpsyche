import { useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/navbar';


export default function Home() {
  const heroTextRef = useRef(null);
  const stickyHeaderRef = useRef(null);
  const contentSectionRef = useRef(null);
  const categoriesSectionRef = useRef(null);
  const slideContainerRef = useRef(null);
  const currentSlideRef = useRef(0);
  const tickingRef = useRef(false);

  // Categories animation handler
  const handleCategoriesAnimation = () => {
    const categoriesSection = categoriesSectionRef.current;
    const categoryCards = categoriesSection?.querySelectorAll('.category-card');
    const progressDots = categoriesSection?.querySelectorAll('.progress-dot');

    if (!categoriesSection || !categoryCards) return;

    const sectionTop = categoriesSection.offsetTop;
    const sectionHeight = categoriesSection.offsetHeight;
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;

    // Only animate when we're inside the categories section
    if (scrolled < sectionTop - windowHeight * 0.2 || scrolled > sectionTop + sectionHeight) {
      return;
    }

    // Calculate progress through the section (0 to 1)
    const sectionProgress = Math.max(0, Math.min(1, (scrolled - sectionTop + windowHeight * 0.2) / sectionHeight));

    // Calculate current active card (0 to 4)
    const totalCards = categoryCards.length;
    const cardProgress = sectionProgress * totalCards;
    const currentCardIndex = Math.floor(cardProgress);
    const nextCardProgress = cardProgress - currentCardIndex;

    // Reset all cards
    categoryCards.forEach((card, index) => {
      card.className = 'category-card';
      card.style.transform = '';
      card.style.opacity = '';
      card.style.zIndex = '';

      if (index < currentCardIndex) {
        // Previous cards - stack them
        const stackLevel = Math.min(currentCardIndex - index, 3);
        card.classList.add(`stack-${stackLevel}`);
      } else if (index === currentCardIndex) {
        // Current active card
        card.classList.add('show');
      } else if (index === currentCardIndex + 1 && nextCardProgress > 0.2) {
        // Next card coming in
        const comeInProgress = Math.max(0, Math.min(1, (nextCardProgress - 0.2) / 0.8));
        card.style.transform = `translateY(${(1 - comeInProgress) * 100}vh)`;
        card.style.opacity = comeInProgress;
        card.style.zIndex = 11;
      } else {
        // Hidden cards
        card.classList.add('hide');
      }
    });

    // Update progress dots
    progressDots?.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentCardIndex);
    });
  };

  // Scroll handler
  const handleScroll = () => {
    if (!tickingRef.current) {
      requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const heroText = heroTextRef.current;
        const stickyHeader = stickyHeaderRef.current;
        const contentSection = contentSectionRef.current;

        // Move hero text up as user scrolls
        if (heroText) {
          heroText.style.transform = `translateY(-${scrolled * 0.5}px)`;
        }

        // Show sticky header when content section is reached
        if (contentSection && stickyHeader) {
          const contentTop = contentSection.offsetTop;
          if (scrolled >= contentTop - 100) {
            stickyHeader.classList.add('visible');
          } else {
            stickyHeader.classList.remove('visible');
          }
        }

        // Categories scroll animation
        handleCategoriesAnimation();

        tickingRef.current = false;
      });
      tickingRef.current = true;
    }
  };

  // Slideshow functionality
  const showSlide = (n) => {
    const slides = slideContainerRef.current?.querySelectorAll('.slide');
    if (!slides) return;

    slides[currentSlideRef.current].classList.remove('active');
    currentSlideRef.current = (n + slides.length) % slides.length;
    slides[currentSlideRef.current].classList.add('active');
  };

  const nextSlide = () => {
    showSlide(currentSlideRef.current + 1);
  };

  // Progress dot click handler
  const handleProgressDotClick = (index) => {
    const categoriesSection = categoriesSectionRef.current;
    if (categoriesSection) {
      const sectionTop = categoriesSection.offsetTop;
      const sectionHeight = categoriesSection.offsetHeight;
      const targetScroll = sectionTop + (sectionHeight / 5) * index;

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Start slideshow
    const slideInterval = setInterval(nextSlide, 5000);

    // Initial call
    handleCategoriesAnimation();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(slideInterval);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Transform Your Life - Blog Homepage</title>
        <meta name="description" content="Overcome self-sabotage and transform your life with expert insights and practical guidance." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          overflow-x: hidden;
        }

        /* Header */
        .sticky-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 1rem 2rem;
          z-index: 1000;
          transform: translateY(-100%);
          transition: transform 0.3s ease;
          box-shadow: 0 2px 20px rgba(0,0,0,0.1);
        }

        .sticky-header.visible {
          transform: translateY(0);
        }

        .sticky-header h1 {
          font-size: 1.5rem;
          color: #2c3e50;
          text-align: center;
        }

        /* Section 1: Hero */
        .hero-section {
          height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.3;
          z-index: 1;
        }

        .hero-text {
          position: relative;
          z-index: 2;
          text-align: center;
          color: white;
          font-size: 4rem;
          font-weight: bold;
          text-shadow: 2px 2px 10px rgba(0,0,0,0.5);
          transition: transform 0.3s ease;
        }

        /* Section 2: Content */
        .content-section {
          padding: 5rem 2rem;
          background: #f8f9fa;
        }

        .content-block {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 3rem;
          background: white;
          padding: 3rem;
          border-radius: 20px;
          box-shadow: 0 10px 50px rgba(0,0,0,0.1);
        }

        .content-image {
          flex: 1;
          position: relative;
          height: 300px;
        }

        .content-text {
          flex: 1;
        }

        .content-text h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        .content-text p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #666;
          margin-bottom: 1.5rem;
        }

        .btn {
          display: inline-block;
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          padding: 12px 30px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: bold;
          transition: transform 0.3s ease;
        }

        .btn:hover {
          transform: translateY(-2px);
        }

        /* Section 3: Divider */
        .divider-section {
          padding: 4rem 2rem;
          background: #2c3e50;
          position: relative;
        }

        .divider-line {
          height: 2px;
          background: linear-gradient(to right, transparent, #667eea, transparent);
          position: relative;
        }

        .divider-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #2c3e50;
          color: white;
          padding: 0 2rem;
          font-size: 1.2rem;
          font-weight: bold;
        }

        /* Section 4: Slideshow */
        .slideshow-section {
          height: 70vh;
          position: relative;
          overflow: hidden;
        }

        .slideshow-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .slide {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 1s ease-in-out;
        }

        .slide.active {
          opacity: 1;
        }

        .slide-content {
          position: absolute;
          bottom: 20%;
          left: 5%;
          color: white;
          z-index: 2;
        }

        .slide-content h3 {
          font-size: 3rem;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 10px rgba(0,0,0,0.7);
        }

        .slide-content p {
          font-size: 1.2rem;
          text-shadow: 1px 1px 5px rgba(0,0,0,0.7);
        }

        /* Section 5: Categories */
        .categories-section {
          background: white;
          height: 500vh;
          position: relative;
        }

        .categories-title {
          position: sticky;
          top: 10vh;
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 3rem;
          color: #2c3e50;
          z-index: 100;
          background: white;
          padding: 2rem 0;
        }

        .categories-container {
          position: sticky;
          top: 25vh;
          max-width: 600px;
          margin: 0 auto;
          height: 50vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .category-card {
          position: absolute;
          width: 100%;
          max-width: 500px;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          transition: all 0.3s ease;
          transform: translateY(100vh);
          opacity: 0;
        }

        .category-card.show {
          transform: translateY(0);
          opacity: 1;
          z-index: 10;
        }

        .category-card.stack-1 {
          transform: translateY(-15px) scale(0.97);
          opacity: 0.8;
          z-index: 9;
        }

        .category-card.stack-2 {
          transform: translateY(-25px) scale(0.94);
          opacity: 0.6;
          z-index: 8;
        }

        .category-card.stack-3 {
          transform: translateY(-35px) scale(0.91);
          opacity: 0.4;
          z-index: 7;
        }

        .category-card.hide {
          transform: translateY(-100vh);
          opacity: 0;
          z-index: 1;
        }

        .category-card-content {
          padding: 2rem;
          text-align: center;
        }

        .category-card h4 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        .category-card p {
          color: #666;
          font-size: 1rem;
          line-height: 1.6;
        }

        .category-progress {
          position: fixed;
          top: 50%;
          right: 2rem;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 10px;
          z-index: 200;
        }

        .progress-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ddd;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .progress-dot.active {
          background: #667eea;
          transform: scale(1.2);
        }

        /* Section 6: Founder */
        .founder-section {
          padding: 5rem 2rem;
          background: #f8f9fa;
        }

        .founder-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 3rem;
        }

        .founder-image {
          flex: 1;
          position: relative;
          height: 400px;
        }

        .founder-text {
          flex: 1;
        }

        .founder-text h2 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          color: #2c3e50;
        }

        .founder-text p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #666;
          margin-bottom: 2rem;
        }

        /* Footer */
        .footer {
          background: #2c3e50;
          color: white;
          padding: 3rem 2rem 2rem;
          text-align: center;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .footer-section h3 {
          margin-bottom: 1rem;
          color: #667eea;
        }

        .footer-section p, .footer-section a {
          color: #bbb;
          text-decoration: none;
          line-height: 1.6;
        }

        .footer-section a:hover {
          color: white;
        }

        .footer-bottom {
          border-top: 1px solid #34495e;
          padding-top: 1rem;
          color: #bbb;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-text {
            font-size: 2.5rem;
          }

          .content-block {
            flex-direction: column;
            text-align: center;
          }

          .founder-content {
            flex-direction: column;
            text-align: center;
          }

          .slide-content h3 {
            font-size: 2rem;
          }

          .categories-container {
            max-width: 90%;
          }
          
          .category-card {
            max-width: 90%;
          }
          
          .category-progress {
            right: 1rem;
          }
        }
      `}</style>

      <div>
        {/* Sticky Header */}
        {/* <header className="sticky-header" ref={stickyHeaderRef}>
          <h1>Transform Your Life Today</h1>
        </header> */}
        <Navbar ref={stickyHeaderRef} />

        {/* Section 1: Hero */}
        <section className="hero-section">
          <div className="hero-bg">
            <Image
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&h=1080&fit=crop"
              alt="Hero Background"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <h1 className="hero-text" ref={heroTextRef}>Transform Your Life Today</h1>
        </section>

        {/* Section 2: Content */}
        <section className="content-section" ref={contentSectionRef}>
          <div className="content-block">
            <div className="content-image">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                alt="Content"
                fill
                style={{ objectFit: 'cover', borderRadius: '15px' }}
              />
            </div>
            <div className="content-text">
              <h2>Discover Your Potential</h2>
              <p>Welcome to a journey of self-discovery and growth. Our blog is dedicated to helping you overcome obstacles, build confidence, and create the life you've always dreamed of.</p>
              <p>Through expert insights, practical tips, and inspiring stories, we provide you with the tools you need to break free from limiting beliefs and unlock your true potential.</p>
              <Link href="#" className="btn">Start Your Journey</Link>
            </div>
          </div>
        </section>

        {/* Section 3: Divider */}
        <section className="divider-section">
          <div className="divider-line">
            <div className="divider-text">Your self sabotage? ends here.</div>
          </div>
        </section>

        {/* Section 4: Slideshow */}
        <section className="slideshow-section">
          <div className="slideshow-container" ref={slideContainerRef}>
            <div className="slide active">
              <Image
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
                alt="Slide 1"
                fill
                style={{ objectFit: 'cover' }}
              />
              <div className="slide-content">
                <h3>Embrace Change</h3>
                <p>Every great journey begins with a single step forward.</p>
              </div>
            </div>
            <div className="slide">
              <Image
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop"
                alt="Slide 2"
                fill
                style={{ objectFit: 'cover' }}
              />
              <div className="slide-content">
                <h3>Find Your Purpose</h3>
                <p>Discover what truly drives you and make it your reality.</p>
              </div>
            </div>
            <div className="slide">
              <Image
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
                alt="Slide 3"
                fill
                style={{ objectFit: 'cover' }}
              />
              <div className="slide-content">
                <h3>Achieve Greatness</h3>
                <p>Transform your dreams into tangible achievements.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Categories */}
        <section className="categories-section" ref={categoriesSectionRef}>
          <h2 className="categories-title">Explore Our Categories</h2>
          <div className="categories-container">
            <div className="category-card" data-index="0">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=250&fit=crop"
                alt="Personal Growth"
                width={500}
                height={250}
                style={{ objectFit: 'cover' }}
              />
              <div className="category-card-content">
                <h4>Personal Growth</h4>
                <p>Develop yourself mentally, emotionally, and spiritually with our comprehensive guides and expert insights for lasting transformation.</p>
              </div>
            </div>
            <div className="category-card" data-index="1">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=250&fit=crop"
                alt="Career Success"
                width={500}
                height={250}
                style={{ objectFit: 'cover' }}
              />
              <div className="category-card-content">
                <h4>Career Success</h4>
                <p>Advance your professional life with proven strategies, networking tips, and leadership development techniques.</p>
              </div>
            </div>
            <div className="category-card" data-index="2">
              <Image
                src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=500&h=250&fit=crop"
                alt="Relationships"
                width={500}
                height={250}
                style={{ objectFit: 'cover' }}
              />
              <div className="category-card-content">
                <h4>Relationships</h4>
                <p>Build stronger, more meaningful connections and improve communication in all areas of your personal and professional life.</p>
              </div>
            </div>
            <div className="category-card" data-index="3">
              <Image
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=250&fit=crop"
                alt="Mindfulness"
                width={500}
                height={250}
                style={{ objectFit: 'cover' }}
              />
              <div className="category-card-content">
                <h4>Mindfulness & Wellness</h4>
                <p>Discover inner peace through meditation, mindfulness practices, and holistic wellness approaches for mind-body balance.</p>
              </div>
            </div>
            <div className="category-card" data-index="4">
              <Image
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=250&fit=crop"
                alt="Productivity"
                width={500}
                height={250}
                style={{ objectFit: 'cover' }}
              />
              <div className="category-card-content">
                <h4>Productivity & Success</h4>
                <p>Master time management, goal setting, and productivity systems to achieve extraordinary results in less time.</p>
              </div>
            </div>
          </div>

          <div className="category-progress">
            <div className="progress-dot active" onClick={() => handleProgressDotClick(0)}></div>
            <div className="progress-dot" onClick={() => handleProgressDotClick(1)}></div>
            <div className="progress-dot" onClick={() => handleProgressDotClick(2)}></div>
            <div className="progress-dot" onClick={() => handleProgressDotClick(3)}></div>
            <div className="progress-dot" onClick={() => handleProgressDotClick(4)}></div>
          </div>
        </section>

        {/* Section 6: Founder */}
        <section className="founder-section">
          <div className="founder-content">
            <div className="founder-image">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
                alt="Founder"
                fill
                style={{ objectFit: 'cover', borderRadius: '20px' }}
              />
            </div>
            <div className="founder-text">
              <h2>Meet Our Founder</h2>
              <p>John Doe is a renowned life coach, author, and speaker who has helped thousands of people transform their lives. With over 15 years of experience in personal development, he brings a unique blend of practical wisdom and deep compassion to his work.</p>
              <p>His mission is to help you break free from self-limiting beliefs and create the extraordinary life you deserve.</p>
              <Link href="/about" className="btn">Learn More About John</Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        {/* <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>About Us</h3>
              <p>We're dedicated to helping you overcome self-sabotage and create lasting positive change in your life.</p>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <p><Link href="/">Home</Link></p>
              <p><Link href="/about">About</Link></p>
              <p><Link href="/blog">Blog</Link></p>
              <p><Link href="/contact">Contact</Link></p>
            </div>
            <div className="footer-section">
              <h3>Connect</h3>
              <p><a href="#">Facebook</a></p>
              <p><a href="#">Twitter</a></p>
              <p><a href="#">Instagram</a></p>
              <p><a href="#">LinkedIn</a></p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Your Blog. All rights reserved.</p>
          </div>
        </footer> */}
      </div>
    </>
  );
}