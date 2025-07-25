import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

function Analytics() {
  const [breweries, setBreweries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentChart, setCurrentChart] = useState("type");

  useEffect(() => {
    const fetchAllBreweries = async () => {
      try {
        setLoading(true);
        // Fetch multiple pages to get more data for analytics
        const pages = [1, 2, 3, 4, 5];
        const promises = pages.map((page) =>
          fetch(
            `https://api.openbrewerydb.org/v1/breweries?per_page=50&page=${page}`
          ).then((res) => res.json())
        );

        const results = await Promise.all(promises);
        const allBreweries = results.flat();
        setBreweries(allBreweries);
      } catch (err) {
        console.error("Error fetching breweries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBreweries();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          fontSize: "1.2rem",
        }}
      >
        Loading analytics data...
      </div>
    );
  }

  // Data processing for charts
  const typeDistribution = breweries.reduce((acc, brewery) => {
    acc[brewery.brewery_type] = (acc[brewery.brewery_type] || 0) + 1;
    return acc;
  }, {});

  const stateDistribution = breweries.reduce((acc, brewery) => {
    if (brewery.state) {
      acc[brewery.state] = (acc[brewery.state] || 0) + 1;
    }
    return acc;
  }, {});

  // Convert to chart data format
  const typeChartData = Object.entries(typeDistribution)
    .map(([type, count]) => ({
      type: type.charAt(0).toUpperCase() + type.slice(1),
      count,
      percentage: ((count / breweries.length) * 100).toFixed(1),
    }))
    .sort((a, b) => b.count - a.count);

  const topStatesData = Object.entries(stateDistribution)
    .map(([state, count]) => ({ state, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Colors for charts
  const COLORS = [
    "#3182ce",
    "#48bb78",
    "#ed8936",
    "#9f7aea",
    "#38b2ac",
    "#f56565",
    "#fbb6ce",
    "#68d391",
  ];

  const chartToggleStyle = {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
    flexWrap: "wrap",
  };

  const buttonStyle = (isActive) => ({
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "0.9rem",
    backgroundColor: isActive ? "#3182ce" : "#f7fafc",
    color: isActive ? "white" : "#4a5568",
    transition: "all 0.2s",
  });

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            margin: "0 0 0.5rem 0",
            background: "linear-gradient(45deg, #f093fb 0%, #f5576c 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          📈 Brewery Analytics Dashboard
        </h1>
        <p style={{ color: "#666", fontSize: "1.1rem", margin: 0 }}>
          Interactive data visualizations from {breweries.length} breweries
        </p>
      </header>

      {/* Chart Toggle */}
      <div style={chartToggleStyle}>
        <button
          style={buttonStyle(currentChart === "type")}
          onClick={() => setCurrentChart("type")}
        >
          📊 Brewery Types
        </button>
        <button
          style={buttonStyle(currentChart === "states")}
          onClick={() => setCurrentChart("states")}
        >
          🗺️ Top States
        </button>
        <button
          style={buttonStyle(currentChart === "comparison")}
          onClick={() => setCurrentChart("comparison")}
        >
          📈 Type Comparison
        </button>
      </div>

      {/* Chart Container */}
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          marginBottom: "2rem",
        }}
      >
        {currentChart === "type" && (
          <div>
            <h3
              style={{
                margin: "0 0 1.5rem 0",
                color: "#2d3748",
                textAlign: "center",
              }}
            >
              🍺 Distribution of Brewery Types
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2rem",
                alignItems: "center",
              }}
            >
              {/* Bar Chart */}
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={typeChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="type"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [value, "Count"]}
                    labelFormatter={(label) => `Type: ${label}`}
                  />
                  <Bar dataKey="count" fill="#3182ce" />
                </BarChart>
              </ResponsiveContainer>

              {/* Pie Chart */}
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={typeChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ type, percentage }) => `${type}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {typeChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {currentChart === "states" && (
          <div>
            <h3
              style={{
                margin: "0 0 1.5rem 0",
                color: "#2d3748",
                textAlign: "center",
              }}
            >
              🗺️ Top 10 States by Number of Breweries
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={topStatesData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="state" type="category" width={60} />
                <Tooltip
                  formatter={(value) => [value, "Breweries"]}
                  labelFormatter={(label) => `State: ${label}`}
                />
                <Bar dataKey="count" fill="#48bb78" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {currentChart === "comparison" && (
          <div>
            <h3
              style={{
                margin: "0 0 1.5rem 0",
                color: "#2d3748",
                textAlign: "center",
              }}
            >
              📈 Brewery Type Comparison Line Chart
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={typeChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#ed8936"
                  strokeWidth={3}
                  dot={{ fill: "#ed8936", strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Insights Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            backgroundColor: "#f0fff4",
            padding: "1.5rem",
            borderRadius: "12px",
            border: "1px solid #9ae6b4",
          }}
        >
          <h4 style={{ margin: "0 0 1rem 0", color: "#22543d" }}>
            💡 Key Insights
          </h4>
          <ul style={{ margin: 0, color: "#2f855a", lineHeight: 1.6 }}>
            <li>
              Most common brewery type:{" "}
              <strong>{typeChartData[0]?.type}</strong> (
              {typeChartData[0]?.count} breweries)
            </li>
            <li>
              Total brewery types: <strong>{typeChartData.length}</strong>
            </li>
            <li>
              States represented:{" "}
              <strong>{Object.keys(stateDistribution).length}</strong>
            </li>
            <li>
              Top brewing state: <strong>{topStatesData[0]?.state}</strong> (
              {topStatesData[0]?.count} breweries)
            </li>
          </ul>
        </div>

        <div
          style={{
            backgroundColor: "#fff5f5",
            padding: "1.5rem",
            borderRadius: "12px",
            border: "1px solid #feb2b2",
          }}
        >
          <h4 style={{ margin: "0 0 1rem 0", color: "#742a2a" }}>
            📊 Data Summary
          </h4>
          <div style={{ color: "#c53030" }}>
            <p style={{ margin: "0 0 0.5rem 0" }}>
              <strong>Total Breweries Analyzed:</strong> {breweries.length}
            </p>
            <p style={{ margin: "0 0 0.5rem 0" }}>
              <strong>Coverage:</strong> Sample from Open Brewery DB
            </p>
            <p style={{ margin: 0 }}>
              <strong>Last Updated:</strong> Real-time data
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Features Note */}
      <div
        style={{
          backgroundColor: "#ebf8ff",
          padding: "1.5rem",
          borderRadius: "12px",
          border: "1px solid #90cdf4",
          textAlign: "center",
        }}
      >
        <h4 style={{ margin: "0 0 0.5rem 0", color: "#2a4365" }}>
          🎛️ Interactive Features
        </h4>
        <p style={{ margin: 0, color: "#2c5282" }}>
          Use the toggle buttons above to switch between different
          visualizations. Hover over chart elements for detailed information.
        </p>
      </div>
    </div>
  );
}

export default Analytics;
