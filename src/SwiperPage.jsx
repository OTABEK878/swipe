import React, { useState, useEffect } from "react";
import { Edit2, Trash2 } from "lucide-react";

const API_URL = "https://gf-server-backend-production.up.railway.app/api";

export default function SwiperPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editUrl, setEditUrl] = useState("");

  // Fetch sliders on mount
  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/swiper`);
      const data = await response.json();
      setSliders(data);
    } catch (error) {
      console.error("Error fetching sliders:", error);
    } finally {
      setLoading(false);
    }
  };

  const addSlide = async () => {
    if (!imageUrl.trim()) {
      alert("URL kiriting!");
      return;
    }

    setAdding(true);
    try {
      const response = await fetch(`${API_URL}/swiper`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ img: imageUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        setImageUrl("");
        await fetchSliders();
        alert("Slayd qo'shildi!");
      } else {
        alert("Xato: " + (data.message || "Slaydni qo'shib bo'lmadi"));
        console.error("API Error:", data);
      }
    } catch (error) {
      console.error("Error adding slider:", error);
      alert("Ulanish xatosi: " + error.message);
    } finally {
      setAdding(false);
    }
  };

  const deleteSlider = async (id) => {
    if (window.confirm("Siz aniq o'chirmoqchisiz?")) {
      try {
        await fetch(`${API_URL}/swiper/${id}`, { method: "DELETE" });
        fetchSliders();
      } catch (error) {
        console.error("Error deleting slider:", error);
      }
    }
  };

  const updateSlider = async (id) => {
    if (!editUrl.trim()) return;

    try {
      const response = await fetch(`${API_URL}/swiper/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ img: editUrl }),
      });
      
      if (response.ok) {
        setEditingId(null);
        setEditUrl("");
        await fetchSliders();
        alert("Slayd tahrirlandi!");
      } else {
        alert("Xato: Slayidni tahrirlash muvaffaq bo'lmadi");
      }
    } catch (error) {
      console.error("Error updating slider:", error);
      alert("Ulanish xatosi: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-4">
      {/* Add New Slider Section */}
      <div className="w-full max-w-md bg-[#1c1c1c] rounded-2xl p-8 shadow-2xl mb-10 border border-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-orange-500 flex items-center gap-2">
          <span>+</span> YANGI ELEMENT QO'SHISH
        </h2>

        <input
          type="text"
          placeholder="Slayder Rasm URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addSlide()}
          className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white placeholder-gray-500 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-800"
        />

        <button
          onClick={addSlide}
          disabled={adding}
          className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white font-bold text-lg transition duration-200 flex items-center justify-center gap-2"
        >
          {adding ? "⏳ QO'SHILMOQDA..." : "🔗 YARATISH"}
        </button>
      </div>

      {/* Sliders List Section */}
      <div className="w-full max-w-2xl">
        <h3 className="text-lg font-semibold mb-6 text-gray-400 uppercase tracking-wider">
          MAVJUD MA'LUMOTLAR - {sliders.length} ta element
        </h3>

        {loading ? (
          <p className="text-center text-gray-400">Yuklanmoqda...</p>
        ) : sliders.length === 0 ? (
          <div className="bg-[#1c1c1c] rounded-lg p-8 text-center border border-gray-800">
            <p className="text-gray-400 text-lg">Hozircha ma'lumot yo'q</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sliders.map((slider) => (
              <div
                key={slider.id}
                className="flex items-center justify-between bg-[#1c1c1c] p-4 rounded-lg shadow-lg border border-gray-800 hover:border-orange-500 transition"
              >
                {/* Image */}
                <div className="flex-shrink-0 mr-4">
                  <img
                    src={slider.img}
                    alt={`Slider ${slider.id}`}
                    className="w-20 h-20 rounded-lg object-cover border border-gray-700"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/80?text=Error";
                    }}
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  {editingId === slider.id ? (
                    <input
                      type="text"
                      value={editUrl}
                      onChange={(e) => setEditUrl(e.target.value)}
                      className="w-full px-2 py-1 bg-gray-900 text-white rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  ) : (
                    <>
                      <p className="font-bold text-white italic text-sm">SLAYD</p>
                      <p className="text-xs text-gray-400">BANNER</p>
                    </>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 ml-4">
                  {editingId === slider.id ? (
                    <>
                      <button
                        onClick={() => updateSlider(slider.id)}
                        className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition"
                        title="Saqlash"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition"
                        title="Bekor qilish"
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingId(slider.id);
                          setEditUrl(slider.img);
                        }}
                        className="p-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition"
                        title="Tahrirlash"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteSlider(slider.id)}
                        className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                        title="O'chirish"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
