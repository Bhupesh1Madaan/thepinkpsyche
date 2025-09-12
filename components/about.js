import React from "react";

const About = () => {
    return (
        <section className="founder-section">
            <div className="founder-content">
                <div className="founder-image">
                    <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
                        alt="Founder"
                    />
                </div>
                <div className="founder-text">
                    <h2>Meet Our Founder</h2>
                    <p>
                        John Doe is a renowned life coach, author, and speaker who has
                        helped thousands of people transform their lives. With over 15 years
                        of experience in personal development, he brings a unique blend of
                        practical wisdom and deep compassion to his work.
                    </p>
                    <p>
                        His mission is to help you break free from self-limiting beliefs and
                        create the extraordinary life you deserve.
                    </p>
                    <a href="/about" className="btn">
                        Learn More About John
                    </a>
                </div>
            </div>
        </section>
    );
};

export default About;
