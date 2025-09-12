import React from "react";

const Intro = () => {
    return (
        <section className="content-section" id="contentSection">
            <div className="content-block">
                <div className="content-image">
                    <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                        alt="Content"
                    />
                </div>
                <div className="content-text">
                    <h2>Discover Your Potential</h2>
                    <p>
                        Welcome to a journey of self-discovery and growth. Our blog is
                        dedicated to helping you overcome obstacles, build confidence, and
                        create the life you've always dreamed of.
                    </p>
                    <p>
                        Through expert insights, practical tips, and inspiring stories, we
                        provide you with the tools you need to break free from limiting
                        beliefs and unlock your true potential.
                    </p>
                    <a href="#" className="btn">
                        Start Your Journey
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Intro;
