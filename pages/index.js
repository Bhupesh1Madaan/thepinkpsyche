import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Home() {
  const categories = [
    {
      title: "Love",
      description: "Explore the journey of love and self-discovery.",
      image: "https://picsum.photos/400/200?random=1",
    },
    {
      title: "Relationships",
      description: "Insights into healthy connections and bonds.",
      image: "https://picsum.photos/400/200?random=2",
    },
    {
      title: "Circumstances",
      description: "How to navigate life's unexpected turns.",
      image: "https://picsum.photos/400/200?random=3",
    },
  ];

  const blogs = [
    {
      title: "Embracing Self-Love",
      image: "https://picsum.photos/500/700?random=10",
      summary: "Learn how to truly love yourself.",
    },
    {
      title: "Healthy Relationships 101",
      image: "https://picsum.photos/500/700?random=11",
      summary: "Tips for building strong and lasting bonds.",
    },
    {
      title: "Overcoming Challenges",
      image: "https://picsum.photos/500/700?random=12",
      summary: "Turn obstacles into opportunities.",
    },
    {
      title: "Mindfulness & Growth",
      image: "https://picsum.photos/500/700?random=13",
      summary: "Practice mindfulness for a better life.",
    },
    {
      title: "Empower Yourself",
      image: "https://picsum.photos/500/700?random=14",
      summary: "Steps to take control of your journey.",
    },
  ];

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: 0, padding: 0 }}>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage:
            "linear-gradient(rgba(255,105,180,0.4), rgba(46,139,87,0.4)), url('https://images.unsplash.com/photo-1508780709619-79562169bc64')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "3.5rem",
            backgroundColor: "rgba(34,34,34,0.5)",
            padding: "20px 40px",
            borderRadius: "12px",
          }}
        >
          The Pink Psyche
        </h1>
      </section>

      {/* Intro Section */}
      <section
        style={{
          display: "flex",
          alignItems: "center",
          padding: "60px 20px",
          gap: "40px",
        }}
      >
        <img
          src="https://picsum.photos/400/300?random=20"
          alt="Intro"
          style={{ width: "400px", borderRadius: "12px", objectFit: "cover" }}
        />
        <div>
          <h2 style={{ color: "#2e8b57", fontSize: "2rem", marginBottom: "20px" }}>
            Our Mission
          </h2>
          <p style={{ color: "#222", maxWidth: "500px", lineHeight: "1.6" }}>
            The Pink Psyche empowers women to explore self-love, personal
            growth, and reflection. Through our blogs and community, we inspire
            courage, confidence, and creativity.
          </p>
        </div>
      </section>

      {/* Section Divider */}
      <div
        style={{
          width: "100%",
          background: "#ff69b4",
          textAlign: "center",
          color: "white",
          fontWeight: "bold",
          padding: "10px 0",
        }}
      >
        Your Self-Sabotage Ends Here 🌸
      </div>

      {/* Categories Section */}
      <section
        style={{
          padding: "60px 20px",
          background: "#fff0f5",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#2e8b57", fontSize: "2rem", marginBottom: "40px" }}>
          Categories
        </h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
          {categories.map((cat, i) => (
            <div
              key={i}
              style={{
                width: "240px",
                height: "140px",
                borderRadius: "12px",
                backgroundImage:
                  "linear-gradient(rgba(46,139,87,0.4), rgba(255,105,180,0.4)), url('" +
                  cat.image +
                  "')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "1.2rem",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              }}
            >
              {cat.title}
              <p style={{ fontSize: "0.9rem", marginTop: "10px", fontWeight: "normal" }}>
                {cat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Slideshow Section */}
      <section style={{ padding: "60px 20px", background: "#fff" }}>
        <h2 style={{ color: "#2e8b57", fontSize: "2rem", marginBottom: "30px", textAlign: "center" }}>
          Recent Blogs
        </h2>
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          {blogs.map((blog, i) => (
            <div
              key={i}
              style={{
                width: "500px",
                height: "700px",
                backgroundImage: `url(${blog.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "12px",
                position: i === 0 ? "relative" : "absolute",
                top: 0,
                left: 0,
                boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                color: "white",
                padding: "20px",
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}
            >
              {blog.title}
            </div>
          ))}
        </div>
      </section>

      {/* About Founder + CTA */}
      <section
        style={{
          padding: "60px 20px",
          background: "#2e8b57",
          color: "white",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>Meet Our Founder</h2>
        <p style={{ maxWidth: "700px", margin: "0 auto 30px", lineHeight: "1.6" }}>
          Our founder's journey of empowerment and self-awareness inspires women everywhere. Learn more about her story and mission.
        </p>
        <a
          href="/about"
          style={{
            padding: "12px 25px",
            backgroundColor: "#ff69b4",
            color: "white",
            fontWeight: "bold",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          Read More
        </a>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
