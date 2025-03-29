import { useState } from "react";

export default function Generator() {
  const masalalar = {
    matematika: [
      { savol: "(5.2 * 3.1) / 2 = ?", javob: "8.06" },
      { savol: "√(144) + 5^2 = ?", javob: "37" },
    ],
    kimyo: [
      { savol: "1 mol H2 gazining massasi qancha? (g)", javob: "2.016" },
      { savol: "2 mol O2 gazining umumiy atom soni qancha?", javob: "1.204e24" },
      { savol: "√(18) + 2.5 * 4 = ?", javob: "16.24" },
      { savol: "6.02e23 * 2.5 = ?", javob: "1.505e24" },
    ],
    biologiya: [
      { savol: "Organizmdagi suv miqdori taxminan nechcha foiz?", javob: "60" },
      { savol: "Inson tanasida nechta xromosoma bor?", javob: "46" },
    ],
  };

  const [fan, setFan] = useState("matematika");
  const [masala, setMasala] = useState(null);
  const [javob, setJavob] = useState("");
  const [natija, setNatija] = useState("");

  const yangiMasala = () => {
    const tanlanganMasalalar = masalalar[fan];
    const tasodifiyMasala = tanlanganMasalalar[Math.floor(Math.random() * tanlanganMasalalar.length)];
    setMasala({ ...tasodifiyMasala, id: Math.random() });
    setJavob("");
    setNatija("");
  };

  const tekshirish = () => {
    if (masala && javob.toLowerCase() === masala.javob.toLowerCase()) {
      setNatija("✅ To‘g‘ri!");
    } else {
      setNatija("❌ Noto‘g‘ri! To‘g‘ri javob: " + masala.javob);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-gradient-to-br from-indigo-500 to-purple-600 min-h-screen text-white font-sans">
      <h1 className="text-3xl font-extrabold">📚 Question Generator</h1>
      <div className="flex gap-4">
        {Object.keys(masalalar).map((key) => (
          <button key={key} className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${fan === key ? "bg-yellow-400 text-gray-900" : "bg-white text-gray-900 hover:bg-yellow-300"}`} onClick={() => setFan(key)}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>
      <button className="px-8 py-4 bg-green-500 text-white font-bold rounded-xl shadow-xl hover:bg-green-600 transform hover:scale-105 transition-all duration-300" onClick={yangiMasala}>
        🎲 Yangi Masala
      </button>
      {masala && (
        <div className="text-xl font-semibold bg-white text-gray-900 p-6 rounded-2xl shadow-2xl w-96 text-center border border-gray-200">
          {masala.savol}
        </div>
      )}
      {masala && (
        <input
          type="text"
          value={javob}
          onChange={(e) => setJavob(e.target.value)}
          className="border p-4 rounded-xl shadow-md w-96 text-center text-lg text-gray-900 focus:ring-4 focus:ring-yellow-400 focus:outline-none"
          placeholder="Javobingizni kiriting"
        />
      )}
      {masala && (
        <button className="px-8 py-4 bg-blue-500 text-white font-bold rounded-xl shadow-xl hover:bg-blue-600 transform hover:scale-105 transition-all duration-300" onClick={tekshirish}>
          ✅ Tekshirish
        </button>
      )}
      {natija && <div className={`text-xl font-bold p-4 rounded-xl shadow-lg w-96 text-center ${natija.includes("✅") ? "bg-green-300 text-green-900" : "bg-red-300 text-red-900"}`}>{natija}</div>}
    </div>
  );
}