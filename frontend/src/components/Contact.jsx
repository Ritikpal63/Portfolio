import { useState } from "react";
import { Mail, Globe, Phone, MapPin, ArrowRight } from "lucide-react";
import { contact } from "../data/portfolioData";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { sendContactMessage } from "../api/contact";

const contactItems = [
  { icon: Mail, label: "email" },
  { icon: Globe, label: "website" },
  { icon: Phone, label: "phone" },
  { icon: MapPin, label: "location" },
];

const Contact = () => {
  const containerRef = useScrollReveal(".reveal-item");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState({ state: "idle", text: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: "loading", text: "" });
    try {
      const res = await sendContactMessage(form);
      console.log("Portfolio Contact Form Data", res);
      setStatus({ state: "success", text: res.message });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus({
        state: "error",
        text: err.response?.data?.message || "Kuch galat ho gaya, dobara try karo",
      });
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28">
      <div ref={containerRef} className="section-container grid lg:grid-cols-2 gap-14 items-start">
        {/* Left: heading + contact details + form */}
        <div>
          <h2 className="reveal-item font-display text-3xl md:text-4xl mb-4">
            {contact.heading}
          </h2>
          <p className="reveal-item text-gray-400 text-sm max-w-md mb-8 leading-relaxed">
            {contact.description}
          </p>

          <div className="reveal-item space-y-4 mb-8">
            {contactItems.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-sm text-gray-300">
                <span className="w-9 h-9 rounded-full border border-base-border flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-brand-red" />
                </span>
                {contact[label]}
              </div>
            ))}
          </div>

          <a
            href="#contact-form"
            className="reveal-item inline-flex items-center gap-2 text-brand-red text-sm tracking-widest font-medium"
          >
            <ArrowRight size={16} /> {contact.ctaLine}
          </a>
        </div>

        {/* Right: laptop-style mockup + simple contact form */}
        <div className="reveal-item">
          <div className="relative rounded-2xl overflow-hidden border border-base-border mb-8">
            <img
              src={contact.mockupImage}
              alt="Portfolio preview"
              className="w-full h-56 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base-black via-black/20 to-transparent" />
          </div>

          <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="bg-base-panel border border-base-border rounded-lg px-4 py-3 text-sm outline-none focus:border-brand-red transition-colors"
              />
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="bg-base-panel border border-base-border rounded-lg px-4 py-3 text-sm outline-none focus:border-brand-red transition-colors"
              />
            </div>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full bg-base-panel border border-base-border rounded-lg px-4 py-3 text-sm outline-none focus:border-brand-red transition-colors"
            />
            <textarea
              required
              rows={4}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full bg-base-panel border border-base-border rounded-lg px-4 py-3 text-sm outline-none focus:border-brand-red transition-colors resize-none"
            />
            <button
              type="submit"
              disabled={status.state === "loading"}
              className="w-full bg-brand-red hover:bg-brand-red-light transition-colors rounded-lg py-3 text-sm font-semibold tracking-wide disabled:opacity-60"
            >
              {status.state === "loading" ? "SENDING..." : "SEND MESSAGE"}
            </button>

            {status.text && (
              <p
                className={`text-xs ${
                  status.state === "success" ? "text-green-400" : "text-red-400"
                }`}
              >
                {status.text}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
