import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";

const ADMIN_PASSWORD = "Khakhi@2025";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Roboto:wght@300;400;500;700&family=Roboto+Condensed:wght@400;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#f5f5f5}
.sk-portal{font-family:'Roboto',Arial,sans-serif;color:#333;background:#f5f5f5;overflow-x:hidden}
.sk-portal img{max-width:100%;display:block}
.sk-portal a{text-decoration:none;color:inherit}
.sk-portal ul{list-style:none}
.top-bar{background:#1a1a1a;color:#ccc;font-size:.78rem;padding:.45rem 0}
.top-bar-inner{max-width:1200px;margin:0 auto;padding:0 1rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.5rem}
.header{background:linear-gradient(135deg,#8b0000 0%,#c0392b 50%,#a93226 100%);padding:1.2rem 0;position:relative;overflow:hidden}
.header-inner{max-width:1200px;margin:0 auto;padding:0 1rem;display:flex;align-items:center;justify-content:space-between;gap:1.5rem;flex-wrap:wrap;position:relative;z-index:1}
.logo{font-family:'Oswald',sans-serif;font-size:clamp(2.2rem,5vw,3.4rem);font-weight:700;color:#fff;line-height:1}
.logo-sub{font-size:.72rem;color:rgba(255,255,255,.85);font-style:italic;margin-top:.25rem}
.banner-ad{flex:1;max-width:520px;min-height:90px;background:rgba(0,0,0,.35);border:2px dashed rgba(255,255,255,.3);border-radius:4px;display:flex;align-items:center;justify-content:center;text-align:center;color:#fff;padding:.8rem}
.nav{background:white;position:sticky;top:0;z-index:100;box-shadow:0 2px 8px rgba(0,0,0,.3)}
.nav-inner{max-width:1200px;margin:0 auto;padding:0 1rem;display:flex;align-items:center;justify-content:space-between;gap:1rem}
.nav-links{display:flex;align-items:center;flex-wrap:wrap}
.nav-link{font-family:'Oswald',sans-serif;font-size:.88rem;font-weight:500;color:#fff;padding:.85rem 1rem;letter-spacing:.06em;text-transform:uppercase;transition:.25s;cursor:pointer;border:none;background:none;display:flex;align-items:center;gap:.3rem}
.nav-link:hover,.nav-link.active{background:#c0392b;color:#fff}
.hamburger{display:none;background:none;border:none;color:#fff;cursor:pointer;padding:.5rem;font-size:1.4rem}
.tags-bar{background:#fff;border-bottom:1px solid #eee;padding:.6rem 0}
.tags-inner{max-width:1200px;margin:0 auto;padding:0 1rem;display:flex;align-items:center;gap:.5rem;flex-wrap:wrap}
.tag{font-size:.72rem;color:#666;padding:.25rem .65rem;border:1px solid #ddd;border-radius:2px;white-space:nowrap;background:#fafafa}
.breaking{background:#fff;border-bottom:2px solid #eee;padding:.55rem 0}
.breaking-inner{max-width:1200px;margin:0 auto;padding:0 1rem;display:flex;align-items:center;gap:.8rem;overflow:hidden}
.breaking-label{font-family:'Oswald',sans-serif;font-size:.78rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:#c0392b;color:#fff;padding:.3rem .7rem;white-space:nowrap;display:flex;align-items:center;gap:.4rem;flex-shrink:0}
.breaking-dot{width:8px;height:8px;background:#fff;border-radius:50%;animation:pulse 1.2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
.breaking-ticker{flex:1;overflow:hidden}
.breaking-track{display:flex;gap:3rem;animation:ticker 35s linear infinite;white-space:nowrap}
@keyframes ticker{to{transform:translateX(-50%)}}
.breaking-track span{font-size:.82rem;color:#333}
.main-wrap{max-width:1200px;margin:0 auto;padding:1.5rem 1rem}
.top-grid{display:grid;grid-template-columns:1fr;gap:1.5rem;margin-bottom:2.5rem}
@media(min-width:900px){.top-grid{grid-template-columns:280px 1fr 280px}}
.section-title{font-family:'Oswald',sans-serif;font-size:1.05rem;font-weight:600;color:#333;text-transform:uppercase;letter-spacing:.04em;padding-bottom:.55rem;border-bottom:2px solid #c0392b;margin-bottom:1rem;display:flex;align-items:center;gap:.5rem}
.section-title::before{content:'';width:4px;height:18px;background:#c0392b;display:inline-block}
.pick-card{background:#fff;border-radius:4px;overflow:hidden;margin-bottom:1rem;box-shadow:0 1px 4px rgba(0,0,0,.08);transition:.3s;cursor:pointer}
.pick-card:hover{transform:translateY(-3px)}
.pick-img{height:140px;background-size:cover;background-position:center}
.pick-body{padding:.75rem}
.pick-tag{font-size:.6rem;font-weight:700;color:#c0392b;text-transform:uppercase}
.pick-title{font-family:'Oswald',sans-serif;font-size:.92rem;font-weight:600;line-height:1.3;color:#222;margin-bottom:.4rem}
.hero-news{position:relative;border-radius:4px;overflow:hidden;height:420px;cursor:pointer;box-shadow:0 4px 20px rgba(0,0,0,.15)}
.hero-news-img{width:100%;height:100%;background-size:cover;background-position:center;transition:.6s}
.hero-news:hover .hero-news-img{transform:scale(1.04)}
.hero-news-overlay{position:absolute;inset:0;background:linear-gradient(transparent 30%,rgba(0,0,0,.85));display:flex;flex-direction:column;justify-content:flex-end;padding:1.5rem}
.hero-tag{font-size:.65rem;font-weight:700;color:#fff;background:#c0392b;padding:.2rem .5rem;text-transform:uppercase}
.hero-title{font-family:'Oswald',sans-serif;font-size:clamp(1.3rem,3vw,2rem);font-weight:700;color:#fff;line-height:1.2;margin-bottom:.5rem}
.hero-meta{font-size:.75rem;color:rgba(255,255,255,.8);display:flex;gap:.6rem}
.trend-item{display:flex;gap:.7rem;padding:.7rem 0;border-bottom:1px solid #eee;cursor:pointer}
.trend-num{font-family:'Oswald',sans-serif;font-size:1.6rem;font-weight:700;color:#c0392b;width:28px}
.trend-thumb{width:70px;height:55px;background-size:cover;background-position:center;border-radius:3px;flex-shrink:0}
.trend-title{font-size:.82rem;font-weight:500;line-height:1.35;color:#333}
.featured-grid{display:grid;grid-template-columns:1fr;gap:1.2rem}
@media(min-width:600px){.featured-grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:900px){.featured-grid{grid-template-columns:repeat(4,1fr)}}
.feat-card{background:#fff;border-radius:4px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.08);transition:.3s;cursor:pointer}
.feat-img{height:180px;background-size:cover;background-position:center;position:relative}
.feat-img .read-badge{position:absolute;bottom:.6rem;left:.6rem;background:#c0392b;color:#fff;font-size:.65rem;font-weight:700;padding:.2rem .5rem}
.feat-body{padding:.85rem}
.feat-title{font-family:'Oswald',sans-serif;font-size:.95rem;font-weight:600;line-height:1.3;color:#222;margin-bottom:.4rem}
.express-grid{display:grid;grid-template-columns:1fr;gap:2rem;margin-bottom:2.5rem}
@media(min-width:900px){.express-grid{grid-template-columns:1fr 1fr}}
.express-main{display:flex;gap:1rem;margin-bottom:1.2rem;background:#fff;padding:.8rem;border-radius:4px;box-shadow:0 1px 4px rgba(0,0,0,.08);cursor:pointer}
.express-main-img{width:180px;height:140px;background-size:cover;background-position:center;border-radius:3px;flex-shrink:0}
.express-item{display:flex;gap:.7rem;background:#fff;padding:.6rem;border-radius:4px;box-shadow:0 1px 3px rgba(0,0,0,.06);cursor:pointer}
.express-item-img{width:100px;height:75px;background-size:cover;background-position:center;border-radius:3px;flex-shrink:0}
.express-item-title{font-size:.82rem;font-weight:600;line-height:1.3;color:#222}
.single-wrap{max-width:1200px;margin:0 auto;padding:1.5rem 1rem;display:grid;grid-template-columns:1fr;gap:2rem}
@media(min-width:1000px){.single-wrap{grid-template-columns:1fr 340px}}
.single-cat{display:inline-block;background:#c0392b;color:#fff;font-size:.68rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:.3rem .6rem;margin-bottom:.8rem}
.single-title{font-family:'Oswald',sans-serif;font-size:clamp(1.6rem,4vw,2.4rem);font-weight:700;line-height:1.2;color:#111;margin-bottom:.8rem}
.single-meta{font-size:.78rem;color:#777;display:flex;gap:.8rem;flex-wrap:wrap;padding-bottom:1rem;border-bottom:1px solid #eee;margin-bottom:1.2rem}
.single-img{width:100%;height:420px;object-fit:cover;border-radius:4px;margin-bottom:1.5rem}
.single-content p{font-size:1.02rem;line-height:1.8;color:#333;margin-bottom:1.1rem}
.single-content blockquote{border-left:4px solid #c0392b;background:#fff;padding:1rem 1.2rem;margin:1.5rem 0;font-style:italic;color:#444}
.footer{background:#111;color:#ccc;padding:2.5rem 0 0}
.footer-inner{max-width:1200px;margin:0 auto;padding:0 1rem;display:grid;grid-template-columns:1fr;gap:2rem}
@media(min-width:1000px){.footer-inner{grid-template-columns:1.5fr 1fr 1fr 1fr}}
.footer h4{font-family:'Oswald',sans-serif;color:#fff;border-bottom:2px solid #c0392b;padding-bottom:.5rem;margin-bottom:1rem}
.admin-wrap{max-width:820px;margin:2rem auto;background:#fff;padding:1.5rem;border-radius:6px;box-shadow:0 4px 20px rgba(0,0,0,.08)}
.admin-label{font-size:.82rem;font-weight:700;color:#333;margin-bottom:.3rem;display:block}
.admin-input{width:100%;padding:.7rem .8rem;border:1px solid #ddd;border-radius:4px;margin-bottom:1rem;font-family:'Roboto',sans-serif;font-size:.9rem}
.admin-input:focus{outline:none;border-color:#c0392b}
.admin-btn{background:#c0392b;color:#fff;border:none;padding:.75rem 1.4rem;font-family:'Oswald',sans-serif;font-weight:600;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;border-radius:3px}
.admin-btn:hover{background:#a93226}
@media(max-width:899px){.hamburger{display:block}.nav-links{display:none;position:absolute;top:100%;left:0;right:0;background:#111;flex-direction:column}.nav-links.open{display:flex}}
@media(max-width:900px){.admin-home-btn{display:inline}}
`;

const INITIAL_NEWS = [
  {
    id: 1,
    category: "NEWSBEAT",
    read: "2 min read",
    title:
      "Google hit with record EU fine over Shopping service — Cyber Cell issues advisory",
    excerpt:
      "Cyber Cell ne fake shopping links ko lekar advisory jaari ki hai.",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=900&h=600&fit=crop",
    author: "Salam Khakhi Bureau",
    date: "14 May 2025",
    views: 1272,
    content: [
      "Pune/Mumbai — European Union ne Google par Shopping service ko lekar record jurmana lagaya hai, jiske baad Maharashtra Cyber Cell ne ek advisory jaari ki hai.",
      "Police ke anusaar, pichle 30 dino mein fake Google Shopping clone websites se 42 shikayatein darj hui hain.",
      "Cyber Cell ke DCP ne kaha, 'Koi bhi link jo atyadhik discount dikhaye, uspar click karne se pehle URL ko verify karein.'",
    ],
  },
  {
    id: 2,
    category: "BUSINESS",
    read: "2 min read",
    title:
      "Business booming for giant cargo planes — Airport police tightens security",
    excerpt: "Cargo movement 34% badha, airport police ne grid tight kiya.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=900&h=600&fit=crop",
    author: "R. Mehta",
    date: "13 May 2025",
    views: 890,
    content: [
      "Mumbai Air Cargo Complex par cargo movement 34% badha hai. CISF aur Local Police ne joint patrolling badha di hai.",
    ],
  },
  {
    id: 3,
    category: "CRIME",
    read: "2 min read",
    title:
      "'Somebody threatened to burn the school down' — Police cracks case in 6 hours",
    excerpt: "Dhamki bhara email bhejne wala student nikla.",
    image:
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=900&h=600&fit=crop",
    author: "City Desk",
    date: "11 May 2025",
    views: 543,
    content: [
      "Nashik ke school ko dhamki bhara email milne ke baad police ne 6 ghante mein case solve kar diya.",
    ],
  },
];

// --- COMMON COMPONENTS ---
function TopBar() {
  const [d, setD] = useState("");
  useEffect(
    () =>
      setD(
        new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      ),
    [],
  );
  return (
    <div className="top-bar">
      <div className="top-bar-inner">
        <span>{d}</span>
        <span style={{ color: "#e74c3c" }}>● LIVE Police News</span>
      </div>
    </div>
  );
}
function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div>
          <div className="logo">Salam Khakhi</div>
          <div className="logo-sub">
            India's Dedicated Police News Network — सलाम खाकी
          </div>
        </div>
        <div className="banner-ad">
          <div>
            <b>BANNER ADVERTISEMENT</b>
            <br />
            <small>930x110px</small>
          </div>
        </div>
      </div>
    </header>
  );
}
function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="nav">
      <div className="nav-inner">
        <button className="hamburger" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
        <ul className={"nav-links" + (open ? " open" : "")}>
          <li>
            <Link to="/" className="nav-link active">
              Home
            </Link>
          </li>
          <li>
            <a className="nav-link">Crime Beat</a>
          </li>
          <li>
            <a className="nav-link">Transfers</a>
          </li>
          <li>
            <Link
              to="/admin/login"
              className="nav-link"
              style={{ opacity: 0.6 }}
            >
              Admin
            </Link>
          </li>
        </ul>
        <div className="">
          <Link
          to="/"
          className="admin-btn hidden admin-home-btn me-5"
          style={{ padding: ".45rem .9rem", fontSize: ".75rem" }}
        >
          {" "}
          Home
        </Link>
          <Link
          to="/admin"
          className="admin-btn"
          style={{ padding: ".45rem .9rem", fontSize: ".75rem" }}
        >
          {" "}
          + Upload News
        </Link>

        </div>
      </div>
    </nav>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <h4>Salam Khakhi</h4>
          <p style={{ fontSize: ".85rem", color: "#aaa" }}>
            Verified police news network. Day by day updates.
          </p>
        </div>
        <div>
          <h4>Categories</h4>
          <ul>
            <li>
              <a href="#">Crime</a>
            </li>
            <li>
              <a href="#">Transfers</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Admin</h4>
          <ul>
            <li>
              <Link to="/admin/login">Upload News</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Legal</h4>
          <ul>
            <li>
              <a href="#">Privacy</a>
            </li>
          </ul>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          padding: "1rem",
          borderTop: "1px solid #333",
          color: "#888",
          fontSize: ".78rem",
        }}
      >
        © {new Date().getFullYear()} Salam Khakhi
      </div>
    </footer>
  );
}

// --- HOME ---
function HomePage({ newsList }) {
  const navigate = useNavigate();
  const go = (id) => {
    window.scrollTo(0, 0);
    navigate(`/news/${id}`);
  };
  const hero = newsList[0];
  if (!hero)
    return (
      <div style={{ padding: "3rem", textAlign: "center" }}>
        Koi news nahi hai. Admin se upload karo.
      </div>
    );
  return (
    <div className="main-wrap">
      <div className="top-grid">
        <div>
          <h2 className="section-title">Editor's Picks</h2>
          {newsList.slice(1, 4).map((n) => (
            <article key={n.id} className="pick-card" onClick={() => go(n.id)}>
              <div
                className="pick-img"
                style={{ backgroundImage: `url(${n.image})` }}
              />
              <div className="pick-body">
                <span className="pick-tag">{n.category}</span>
                <h3 className="pick-title">{n.title}</h3>
              </div>
            </article>
          ))}
        </div>
        <article className="hero-news" onClick={() => go(hero.id)}>
          <div
            className="hero-news-img"
            style={{ backgroundImage: `url(${hero.image})` }}
          />
          <div className="hero-news-overlay">
            <span className="hero-tag">{hero.category}</span>
            <h2 className="hero-title">{hero.title}</h2>
            <div className="hero-meta">
              <span>{hero.author}</span>
              <span>·</span>
              <span>{hero.views} views</span>
            </div>
          </div>
        </article>
        <div>
          <h2 className="section-title">Trending Now</h2>
          {newsList.map((n, i) => (
            <div key={n.id} className="trend-item" onClick={() => go(n.id)}>
              <span className="trend-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div
                className="trend-thumb"
                style={{ backgroundImage: `url(${n.image})` }}
              />
              <div className="trend-title">{n.title.slice(0, 55)}...</div>
            </div>
          ))}
        </div>
      </div>
      <h2 className="section-title">Featured Posts</h2>
      <div className="featured-grid" style={{ marginBottom: "2.5rem" }}>
        {newsList.map((n) => (
          <article key={n.id} className="feat-card" onClick={() => go(n.id)}>
            <div
              className="feat-img"
              style={{ backgroundImage: `url(${n.image})` }}
            >
              <span className="read-badge">{n.read}</span>
            </div>
            <div className="feat-body">
              <span className="pick-tag">{n.category}</span>
              <h3 className="feat-title">{n.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

// --- DETAIL ---
function NewsDetail({ newsList }) {
  const { id } = useParams();
  const news = newsList.find((n) => String(n.id) === String(id));
  useEffect(() => window.scrollTo(0, 0), [id]);
  if (!news)
    return (
      <div style={{ padding: "4rem", textAlign: "center" }}>
        <h2>News not found</h2>
        <Link to="/" style={{ color: "#c0392b" }}>
          ← Back
        </Link>
      </div>
    );
  return (
    <div className="single-wrap">
      <article>
        <div
          style={{ fontSize: ".78rem", color: "#888", marginBottom: "1rem" }}
        >
          <Link to="/">Home</Link> / {news.category}
        </div>
        <span className="single-cat">{news.category}</span>
        <h1 className="single-title">{news.title}</h1>
        <div className="single-meta">
          <span>
            By <b>{news.author}</b>
          </span>
          <span>{news.date}</span>
          <span>👁 {news.views}</span>
        </div>
        <img src={news.image} alt="" className="single-img" />
        <div className="single-content">
          {news.content.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <Link to="/" className="admin-btn">
            ← Back to Home
          </Link>
        </div>
      </article>
      <aside>
        <div
          style={{
            background: "#fff",
            padding: "1rem",
            boxShadow: "0 1px 4px rgba(0,0,0,.08)",
          }}
        >
          <h2 className="section-title">Trending</h2>
          {newsList.slice(0, 4).map((n, i) => (
            <div key={n.id} className="trend-item">
              <span className="trend-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="trend-title">{n.title}</div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

// --- ADMIN LOGIN ---
function AdminLogin() {
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    if (pwd === ADMIN_PASSWORD) {
      sessionStorage.setItem("sk_admin", "true");
      navigate("/admin");
    } else alert("Invalid Password!");
  };
  return (
    <div className="admin-wrap" style={{ maxWidth: 400, marginTop: "4rem" }}>
      <h2 style={{ fontFamily: "Oswald", marginBottom: "1rem" }}>
        Admin Login
      </h2>
      <p style={{ fontSize: ".85rem", color: "#777", marginBottom: "1rem" }}>
        Sirf aap hi login kar sakte ho. User ko ye page nahi dikhega jab tak
        link pata na ho.
      </p>
      <form onSubmit={submit}>
        <label className="admin-label">Password</label>
        <input
          className="admin-input"
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          placeholder="Khakhi@2025"
        />
        <button className="admin-btn" style={{ width: "100%" }}>
          Login
        </button>
      </form>
    </div>
  );
}

// --- ADMIN DASHBOARD ---
function AdminDashboard({ newsList, setNewsList }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    category: "CRIME",
    image: "",
    excerpt: "",
    content: "",
    author: "Salam Khakhi Bureau",
  });
  const [filePreview, setFilePreview] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("sk_admin") !== "true") navigate("/admin/login");
  }, []);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreview(reader.result);
      setForm({ ...form, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const publish = (e) => {
    e.preventDefault();
    if (!form.title || !form.content) return alert("Title aur Content bharo");
    const newNews = {
      id: Date.now(),
      category: form.category,
      read: "2 min read",
      title: form.title,
      excerpt: form.excerpt,
      image:
        form.image ||
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=900&h=600&fit=crop",
      author: form.author,
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      views: Math.floor(Math.random() * 1000),
      content: form.content.split("\n").filter(Boolean),
    };
    const updated = [newNews, ...newsList];
    setNewsList(updated);
    alert("News Published");
    setForm({
      title: "",
      category: "CRIME",
      image: "",
      excerpt: "",
      content: "",
      author: "Salam Khakhi Bureau",
    });
    setFilePreview("");
  };

  const del = (id) => {
    if (confirm("Do you want to delete?"))
      setNewsList(newsList.filter((n) => n.id !== id));
  };

  return (
    <div className="admin-wrap">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h2 style={{ fontFamily: "Oswald" }}>Upload News — Day by Day</h2>
        <button
          onClick={() => {
            sessionStorage.removeItem("sk_admin");
            navigate("/");
          }}
          style={{
            background: "#111",
            color: "#fff",
            border: "none",
            padding: ".5rem .8rem",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <form
        onSubmit={publish}
        style={{
          border: "1px solid #eee",
          padding: "1.2rem",
          borderRadius: "6px",
          background: "#fafafa",
        }}
      >
        <label className="admin-label">News Title *</label>
        <input
          className="admin-input"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Pune mein bada operation..."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <div>
            <label className="admin-label">Category</label>
            <select
              className="admin-input"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option>CRIME</option>
              <option>NEWSBEAT</option>
              <option>BUSINESS</option>
              <option>NATIONAL</option>
              <option>TECH</option>
              <option>SPORTS</option>
            </select>
          </div>
          <div>
            <label className="admin-label">Author</label>
            <input
              className="admin-input"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
            />
          </div>
        </div>

        <label className="admin-label">Image Upload (File se ya Link se)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          style={{ marginBottom: ".6rem" }}
        />
        <input
          className="admin-input"
          value={form.image.startsWith("data:") ? "" : form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          placeholder="Paste image link here.. (https://...)"
        />
        {filePreview && (
          <img
            src={filePreview}
            style={{
              width: "100%",
              height: 200,
              objectFit: "cover",
              borderRadius: 4,
              marginBottom: "1rem",
            }}
            alt="preview"
          />
        )}

        <label className="admin-label">Short Excerpt</label>
        <input
          className="admin-input"
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          placeholder="2 Line shot content"
        />

        <label className="admin-label">
          Full Content * (Har paragraph new line par)
        </label>
        <textarea
          className="admin-input"
          rows="6"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          placeholder="write content here & press enter to start new paragraph"
        ></textarea>

        <button
          className="admin-btn"
          type="submit"
          style={{ width: "100%", fontSize: "1rem" }}
        >
          Publish News
        </button>
      </form>

      <h3 style={{ fontFamily: "Oswald", margin: "2rem 0 1rem" }}>
        Aapki Upload ki hui News ({newsList.length})
      </h3>
      {newsList.map((n) => (
        <div
          key={n.id}
          style={{
            display: "flex",
            gap: "1rem",
            background: "#fff",
            border: "1px solid #eee",
            padding: ".7rem",
            marginBottom: ".6rem",
            alignItems: "center",
          }}
        >
          <img
            src={n.image}
            style={{
              width: 70,
              height: 70,
              objectFit: "cover",
              borderRadius: 4,
            }}
            alt=""
          />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: ".9rem" }}>{n.title}</div>
            <div style={{ fontSize: ".75rem", color: "#888" }}>
              {n.category} · {n.date}
            </div>
          </div>
          <button
            onClick={() => del(n.id)}
            style={{
              background: "#c0392b",
              color: "#fff",
              border: "none",
              padding: ".4rem .7rem",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [newsList, setNewsList] = useState(() => {
    const saved = localStorage.getItem("sk_news_v2");
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });
  useEffect(() => {
    localStorage.setItem("sk_news_v2", JSON.stringify(newsList));
  }, [newsList]);

  return (
    <BrowserRouter>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="sk-portal">
        <TopBar />
        <Header />
        <Nav />
        <div style={{ background: "#fff", borderBottom: "1px solid #eee" }}>
          <div className="main-wrap" style={{ padding: "0 1rem" }}>
            <div className="breaking-inner" style={{ padding: ".6rem 0" }}>
              <span
                style={{
                  background: "#c0392b",
                  color: "#fff",
                  padding: ".2rem .5rem",
                  fontSize: ".7rem",
                  fontWeight: 700,
                }}
              >
                BREAKING
              </span>
              <marquee style={{ fontSize: ".82rem", marginLeft: ".8rem" }}>
                {newsList.map((n) => n.title).join("  •  ")}
              </marquee>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<HomePage newsList={newsList} />} />
          <Route
            path="/news/:id"
            element={<NewsDetail newsList={newsList} />}
          />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <AdminDashboard newsList={newsList} setNewsList={setNewsList} />
            }
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
