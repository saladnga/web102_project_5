import { Link } from "react-router-dom";

function BreweryCard({ brewery }) {
  const formatPhone = (phone) => {
    if (!phone) return "N/A";
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
        6
      )}`;
    }
    return phone;
  };

  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        padding: "1.5rem",
        borderRadius: "12px",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = "translateY(-2px)";
        e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "translateY(0)";
        e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
      }}
    >
      <div style={{ marginBottom: "1rem" }}>
        <h3
          style={{
            margin: "0 0 0.5rem 0",
            color: "#2d3748",
            fontSize: "1.2rem",
          }}
        >
          🍺 {brewery.name}
        </h3>
        <span
          style={{
            backgroundColor: "#bee3f8",
            color: "#2b6cb0",
            padding: "0.25rem 0.5rem",
            borderRadius: "4px",
            fontSize: "0.8rem",
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          {brewery.brewery_type}
        </span>
      </div>

      <div style={{ marginBottom: "0.5rem" }}>
        <strong>📍 Location:</strong> {brewery.city}
        {brewery.state && `, ${brewery.state}`}
        {brewery.country && ` (${brewery.country})`}
      </div>

      {brewery.street && (
        <div
          style={{ marginBottom: "0.5rem", fontSize: "0.9rem", color: "#666" }}
        >
          <strong>🏠 Address:</strong> {brewery.street}
          {brewery.postal_code && ` ${brewery.postal_code}`}
        </div>
      )}

      {brewery.phone && (
        <div style={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}>
          <strong>📞 Phone:</strong> {formatPhone(brewery.phone)}
        </div>
      )}

      {brewery.website_url && (
        <div style={{ marginTop: "1rem" }}>
          <a
            href={brewery.website_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#3182ce",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: "bold",
            }}
          >
            🌐 Visit Website
          </a>
        </div>
      )}

      {/* Detail View Link */}
      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <Link
          to={`/brewery/${brewery.id}`}
          style={{
            display: "inline-block",
            backgroundColor: "#3182ce",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            textDecoration: "none",
            fontSize: "0.9rem",
            fontWeight: "bold",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#2c5282";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#3182ce";
          }}
        >
          📝 View Details →
        </Link>
      </div>
    </div>
  );
}

export default BreweryCard;
