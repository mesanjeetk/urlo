"use client";

import React, { useState, useRef } from "react";
import { ArrowRight, Copy, Check, Zap, BarChart3, Globe2 } from "lucide-react";
import Logo from "@/components/Logo";
import QRCode from "react-qr-code";
import { motion } from "framer-motion";
export const metadata = {
  title: "URLO",
  description:
    "URLO is the fastest way to shorten, track, and share URLs. Boost your digital reach with lightning speed.",
  openGraph: {
    title: "URLO",
    description:
      "URLO is the fastest way to shorten, track, and share URLs. Boost your digital reach with lightning speed.",
    url: "https://urlo.vercel.app",
    siteName: "URLO",
    images: [
      {
        url: "https://urlo.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "URLO - URL Shortener",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "URLO",
    description:
      "URLO is the fastest way to shorten, track, and share URLs. Boost your digital reach with lightning speed.",
    images: ["https://urlo.vercel.app/og-image.png"],
  },
};

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const qrWrapperRef = useRef(null);

  // Add loading state
  const [loading, setLoading] = useState(false);

  // Updated handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (response.ok) {
        setShortUrl(data.shortUrl);
        setCopied(false);
      } else {
        alert(data.error || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQRCode = () => {
    const svg = qrWrapperRef.current?.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      URL.revokeObjectURL(url);

      const pngUrl = canvas.toDataURL("image/png");

      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = "qr-code.png";
      a.click();
    };
    img.src = url;
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-8">
            Build stronger digital connections
          </h2>
          <p className="text-xl text-foreground mb-8">
            Transform long URLs into memorable, shareable links in seconds. Perfect for social media, marketing campaigns, and personal use.
          </p>

          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste your long URL here..."
                className="flex-1 px-4 py-3 rounded-lg bg-foreground border border-border text-[#f8f8f2] placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-[#8be9fd] focus:border-transparent transition-all"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className={`bg-[#8be9fd] text-black px-6 py-3 rounded-lg transition-all transform flex items-center justify-center gap-2 group ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-[#6ddde3] hover:scale-105"
                  }`}
              >
                {loading ? (
                  <>
                    <span className="animate-spin h-5 w-5 border-2 border-t-transparent border-black rounded-full" />
                    <span>Shortening...</span>
                  </>
                ) : (
                  <>
                    Shorten URL
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

            </div>
          </form>

          {shortUrl && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#1e1e1e] text-white p-6 rounded-xl mt-6 max-w-xl mx-auto"
            >
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8be9fd] underline break-all flex-1 min-w-[200px]"
                >
                  {shortUrl}
                </a>
                <button
                  onClick={handleCopy}
                  className="text-[#8be9fd] hover:text-[#6ddde3] transition-colors"
                  aria-label="Copy short URL"
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                </button>
              </div>

              <div className="mt-6 flex flex-col items-center gap-4">
                <div
                  ref={qrWrapperRef}
                  className="bg-white p-4 rounded-lg shadow-lg"
                  style={{ width: "max-content" }}
                >
                  <QRCode
                    value={shortUrl}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    size={180}
                    viewBox="0 0 256 256"
                  />
                </div>
                <button
                  onClick={downloadQRCode}
                  className="bg-[#8be9fd] text-black px-5 py-2 rounded-md hover:bg-[#6ddde3] transition-colors"
                >
                  Download QR Code
                </button>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
            {[
              ["10M+", "Links Shortened"],
              ["5M+", "Monthly Clicks"],
              ["100K+", "Active Users"],
            ].map(([stat, label]) => (
              <div
                key={label}
                className="bg-[#EAC599] p-6 rounded-xl hover:bg-[#1e1e1e] transition-all transform hover:scale-105 border border-border"
              >
                <div className="text-3xl font-bold text-black">{stat}</div>
                <div className="text-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-[#EAC599]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-foreground">
            Why Choose URLO?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8 text-[#8be9fd]" />,
                title: "Lightning Fast",
                description: "Generate short URLs instantly with our optimized infrastructure.",
              },
              {
                icon: <Globe2 className="w-8 h-8 text-[#8be9fd]" />,
                title: "Global CDN",
                description: "Fast redirect speeds from anywhere in the world.",
              },
              {
                icon: <BarChart3 className="w-8 h-8 text-[#8be9fd]" />,
                title: "API Access",
                description: "Integrate URL shortening into your applications.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-background p-6 rounded-xl hover:bg-[#1e1e1e] transition-all transform hover:scale-105 border border-[#2a2a2a]"
              >
                {feature.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
                <p className="text-[#262626]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#EAC599] text-black py-12 border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Logo />
              <p className="text-sm">
                Making the web more accessible, one short link at a time.
              </p>
            </div>
          </div>
          <div className="border-t border-[#1a1a1a] mt-12 pt-8 text-sm text-center">
            © {new Date().getFullYear()} URLO.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
