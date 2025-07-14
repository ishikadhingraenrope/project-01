import React, { useState, useEffect } from "react";
import imageLogo from "../../image/1.png"
const defaultTestimonials = [
  {
    name: "Alice Smith",
    text: "This service is fantastic! It exceeded all my expectations.",
    role: "Product Manager",
    image: "../image/1.png",
    alt: "Alice",

  },
  {
    name: "Bob Johnson",
    text: "A wonderful experience from start to finish. Highly recommended!",
    role: "Developer"
  },
  {
    name: "Carol Lee",
    text: "Professional, efficient, and friendly. Will use again!",
    role: "Designer"
  }
];

function Testimonial() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [form, setForm] = useState({ name: '', text: '', role: '', image: '', alt:'' });
  const [editIndex, setEditIndex] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [image,setImage] = useState(0);
  // Load testimonials and admin status
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("testimonials"));
    setTestimonials(stored && Array.isArray(stored) ? stored : defaultTestimonials);
    const user = JSON.parse(localStorage.getItem("userdata"));
    setIsAdmin(user?.isAdmin === true);
    setIsLoggedIn(!!user && user.loggedOut !== true); // true only if user exists and is not logged out
    console.log("setTestimonials", defaultTestimonials[currentIndex]?.image)
  }, []);

  // Auto-advance slider for non-admins
  useEffect(() => {
    if (!isAdmin && testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [testimonials, isAdmin]);

  const goTo = (idx) => setCurrentIndex(idx);

  // Admin: Add or Edit testimonial
  const handleSubmit = (e) => {
    e.preventDefault();
    let updated;
    if (editIndex !== null) {
      updated = testimonials.map((t, i) => i === editIndex ? form : t);
    } else {
      updated = [...testimonials, form];
    }
    setTestimonials(updated);
    localStorage.setItem("testimonials", JSON.stringify(updated));
    setForm({ name: '', text: '', role: '',image:'' });
    setEditIndex(null);
  };

  // Admin: Delete testimonial
  const handleDelete = (idx) => {
    const updated = testimonials.filter((_, i) => i !== idx);
    setTestimonials(updated);
    localStorage.setItem("testimonials", JSON.stringify(updated));
    if (currentIndex >= updated.length) setCurrentIndex(0);
  };

  // Admin: Start editing
  const handleEdit = (idx) => {
    setForm(testimonials[idx]);
    setEditIndex(idx);
  };

  if (!isLoggedIn) {
    return (
      <div className="w-full max-w-xl mx-auto mt-8 p-6 bg-white rounded shadow text-center">
        <h2 className="text-xl font-bold mb-4">Testimonials</h2>
        <p>Please log in to view testimonials.</p>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div className="w-full max-w-xl mx-auto mt-8 p-6 bg-white rounded shadow text-center">
        <h2 className="text-xl font-bold mb-4">Manage Testimonials</h2>
        <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-2 items-center">
          <input
          type="text" className="border rounded px-2 py-1 w-full"
          placeholder="Enter image URL"
          value={form.image}
            onChange={e => setForm({ ...form, image: e.target.value })}
          />
          
          
          
          
          <input
            className="border rounded px-2 py-1 w-full"
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="border rounded px-2 py-1 w-full"
            placeholder="Role"
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
            required
          />
          <textarea
            className="border rounded px-2 py-1 w-full"
            placeholder="Testimonial"
            value={form.text}
            onChange={e => setForm({ ...form, text: e.target.value })}
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {editIndex !== null ? 'Update' : 'Add'} Testimonial
          </button>
          {editIndex !== null && (
            <button type="button" onClick={() => { setForm({ name: '', text: '', role: '', image: '', }); setEditIndex(null); }} className="text-xs text-gray-500 mt-1">Cancel Edit</button>
          )}
        </form>
        <div className="flex flex-col gap-4">
          {testimonials.map((t, idx) => (
            <div key={idx} className="border rounded p-4 relative text-left">
              <div className="italic mb-2">
                <img src={t.image} alt={t.alt}/>
              </div>
              <div className="italic mb-2">{t.text}</div>
              <div className="font-semibold"> {t.name}</div>
              <div className="text-sm text-gray-500">{t.role}</div>
              <div className="absolute top-2 right-2 flex gap-2">
                <button onClick={() => handleEdit(idx)} className="bg-yellow-500 text-white text-xs px-2 rounded">Edit</button>
                <button onClick={() => handleDelete(idx)} className="bg-red-600 text-white text-xs px-2 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Non-admin: just show the slider
  return (
    <div className="w-full max-w-xl mx-auto mt-8 p-6 bg-white rounded shadow text-center">
      <div className="min-h-[120px] flex flex-col justify-center items-center">
        <img src={testimonials[currentIndex]?.image} alt={testimonials.alt} className="testimonial-img"/>
        <p className="text-lg italic mb-4">"{testimonials[currentIndex]?.text}"</p>
        <div className="font-semibold">- {testimonials[currentIndex]?.name}</div>
        <div className="text-sm text-gray-500">{testimonials[currentIndex]?.role}</div>
      </div>
      <div className="flex justify-center mt-4 gap-2">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`h-2 w-6 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
            aria-label={`Go to testimonial ${idx + 1}`}
          />
        ))}
        <img src={imageLogo} alt="test"/>
      </div>
    </div>
  );
}

export default Testimonial; 