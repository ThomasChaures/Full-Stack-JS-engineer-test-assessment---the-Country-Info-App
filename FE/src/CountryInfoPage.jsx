import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const CountryInfoPage = () => {
  const navigate = useNavigate();
  const { countryCode } = useParams();
  const [countryInfo, setCountryInfo] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
        const response = await fetch(`http://localhost:3333/api/country-info/${countryCode}`);
        
        if (!response.ok) throw new Error('Failed to fetch country information');

        const data = await response.json();

        if (data && data.snap) {
          setCountryInfo(data.snap);

          if (data.snap.pob && Array.isArray(data.snap.pob)) {
            const populationYears = data.snap.pob.map((entry) => entry.year);
            const populationCounts = data.snap.pob.map((entry) => entry.value);

            setChartData({
              labels: populationYears,
              datasets: [{
                label: "Population Over Time",
                data: populationCounts,
                borderColor: "rgb(59 130 246)",
                backgroundColor: "rgba(59 130 246, 0.2)",
                tension: 0.4,
              }],
            });
          }
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching country info:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCountryInfo();
  }, [countryCode]);

  if (loading) return <div className="flex justify-center items-center h-screen text-gray-500">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  if (!countryInfo) return <div className="flex justify-center items-center h-screen">No data available</div>;

  return (
    <div className="flex justify-center w-full min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-6 space-y-6 mx-auto">
        <button 
          onClick={() => navigate('/')} 
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Back to Countries
        </button>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{countryInfo.name}</h1>
          <img
            src={countryInfo.flag}
            alt={`Flag of ${countryInfo.name}`}
            className="mx-auto w-48 h-auto rounded-lg shadow-md"
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Border Countries</h2>
          <ul className="space-y-2">
            {countryInfo.borders.map((border) => (
              <li key={border.countryCode} className="border-b last:border-b-0 pb-2 last:pb-0">
                <Link 
                  to={`/country/${border.countryCode}`} 
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {border.commonName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Population Over Time</h2>
          {chartData ? (
            <div className="h-72">
              <Line 
                data={chartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: { color: 'rgba(0,0,0,0.7)' }
                    },
                    x: {
                      ticks: { color: 'rgba(0,0,0,0.7)' }
                    }
                  }
                }} 
              />
            </div>
          ) : (
            <p className="text-gray-500 text-center">No population data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryInfoPage;
