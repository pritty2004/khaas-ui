import { Instagram, Facebook, Twitter } from "lucide-react";
import { useState } from "react";

const FooterSection = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-secondary border-t border-border">
      {/* Newsletter */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-16 text-center">
          <h3 className="text-2xl lg:text-3xl font-serif gold-text mb-3">
            Join the Inner Circle
          </h3>
          <p className="text-sm text-muted-foreground font-sans mb-8 max-w-md mx-auto">
            Be the first to discover new collections, exclusive offers, and stories from our artisans.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 bg-background border border-border px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
            <button
              type="submit"
              className="gold-gradient px-6 py-3 text-xs font-sans tracking-widest uppercase text-primary-foreground hover:opacity-90 transition-all gold-shimmer"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-sm font-sans tracking-widest uppercase text-primary mb-4">
              Shop
            </h4>
            <ul className="space-y-2">
              {["All Bangles", "Kundan", "Minimal", "Antique", "Meenakari"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground font-sans hover:text-primary transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-sans tracking-widest uppercase text-primary mb-4">
              About
            </h4>
            <ul className="space-y-2">
              {["Our Story", "Artisans", "Sustainability", "Press"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground font-sans hover:text-primary transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-sans tracking-widest uppercase text-primary mb-4">
              Help
            </h4>
            <ul className="space-y-2">
              {["Contact Us", "Shipping", "Returns", "Size Guide"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground font-sans hover:text-primary transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-sans tracking-widest uppercase text-primary mb-4">
              Connect
            </h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-2xl font-serif tracking-[0.3em] gold-text font-semibold">
            Dharohar
          </p>
          <p className="text-xs text-muted-foreground font-sans">
            © 2026 Dharohar. All rights reserved. Handcrafted with love in India.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
