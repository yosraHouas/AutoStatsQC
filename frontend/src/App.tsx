import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  importData,
  getStats,
  getVehicleTypes,
  getChartData,
  type VehicleStat,
  type ChartItem,
} from "./api/statsApi";
import { useStatsFiltersStore } from "./stores/statsFiltersStore";
import "./index.css";

function App() {
  const [message, setMessage] = useState("");
  const [stats, setStats] = useState<VehicleStat[]>([]);
  const [vehicleTypes, setVehicleTypes] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState<ChartItem[]>([]);
  

  const {
    year,
    vehicleType,
    page,
    pageSize,
    setYear,
    setVehicleType,
    setPage,
  } = useStatsFiltersStore();

async function handleImport() {
  setLoading(true);

  try {
    const msg = await importData();
    setMessage(msg);
    alert(message);
    await loadStats();
  } finally {
    setLoading(false);
  }
}

  async function loadStats() {
    setLoading(true);

    try {
      const [result, chart] = await Promise.all([
  getStats({
    year,
    vehicleType,
    page,
    pageSize,
  }),
  getChartData({
    year,
    vehicleType,
  }),
]);

setStats(result.data);
setTotal(result.total);
setChartData(chart);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function loadVehicleTypes() {
      const types = await getVehicleTypes();
      setVehicleTypes(types);
    }

    loadVehicleTypes();
  }, []);

  useEffect(() => {
    loadStats();
  }, [page]);



  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6">AutoStats QC</h1>

        <div className="flex gap-4 items-center justify-center mb-6">
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border rounded px-3 py-2"
          />

          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">Tous les types</option>
            {vehicleTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <button
            onClick={handleImport}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Importer données
          </button>
          <button
            onClick={loadStats}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Charger
          </button>

        </div>

        {message && (
        <p className="text-green-600 text-center mt-4">{message}</p>
        )}

        {loading && <p className="text-center text-gray-500">Chargement...</p>}

        <p className="text-center mb-4">
          Total trouvé : <strong>{total}</strong> | Page :{" "}
          <strong>{page}</strong> / <strong>{totalPages || 1}</strong>
        </p>

       <div className="mt-8 mb-8">
  <h2 className="text-xl font-bold text-center mb-4">
    Répartition par carburant
  </h2>

  <ResponsiveContainer width="100%" height={320}>
    <BarChart data={chartData}>
      <XAxis dataKey="fuelType" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="total" fill="#2563eb" />
    </BarChart>
  </ResponsiveContainer>
</div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Année</th>
              <th className="p-2">Province</th>
              <th className="p-2">Type</th>
              <th className="p-2">Carburant</th>
              <th className="p-2">Valeur</th>
            </tr>
          </thead>

          <tbody>
            {stats.map((item) => (
              <tr key={item.id} className="border-t text-center hover:bg-gray-50">
                <td className="p-2">{item.year}</td>
                <td className="p-2">{item.province.name}</td>
                <td className="p-2">{item.vehicleType}</td>
                <td className="p-2">{item.fuelType}</td>
                <td className="p-2 font-semibold">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center gap-4 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Précédent
          </button>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
