


import { useState } from "react";
import { useSelector } from "react-redux";
import { getSmartWishlist } from "../../services/wishlistService";

const SmartWishlist = () => {
  const { token } = useSelector((state) => state.auth);

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSmartWishlist = async () => {
    try {
      setLoading(true);

      const data = await getSmartWishlist(token);

      console.log("AI Smart Wishlist:", data);

      // IMPORTANT
      setAnalysis(data.analysis);

    } catch (error) {
      console.error("Smart Wishlist Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleSmartWishlist}>
        ✨ Smart Wishlist
      </button>

      {loading && <p>Analyzing your wishlist...</p>}

      {analysis && (
        <div className="smart-wishlist">

          <h2>✨ AI Smart Wishlist</h2>

          {/* Summary */}
          <div>
            <h3>📝 Summary</h3>
            <p>{analysis.summary}</p>
          </div>

          {/* Price Insights */}
          <div>
            <h3>💰 Price Insights</h3>
            <p>{analysis.priceInsights}</p>
          </div>

          {/* Shopping Style */}
          <div>
            <h3>🛍️ Shopping Style</h3>
            <p>{analysis.shoppingStyle}</p>
          </div>

          {/* Top Pick */}
          {analysis.topPick && (
            <div>
              <h3>⭐ Top Pick</h3>
              <p>{analysis.topPick.reason}</p>
            </div>
          )}

          {/* Recommendations */}
          {analysis.recommendations?.length > 0 && (
            <div>
              <h3>💡 Recommendations</h3>

              {analysis.recommendations.map((item, index) => (
                <div key={index}>
                  <p>{item.reason}</p>
                </div>
              ))}
            </div>
          )}

          {/* Stock Alerts */}
          {analysis.stockAlerts?.length > 0 && (
            <div>
              <h3>⚠️ Stock Alerts</h3>

              {analysis.stockAlerts.map((item, index) => (
                <div key={index}>
                  <p>{item.message || item.reason}</p>
                </div>
              ))}
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default SmartWishlist;