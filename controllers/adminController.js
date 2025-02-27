const User = require("../models/User");
const HealthData = require("../models/HealthData");

const getDashboardAnalytics = async (req, res) => {
  try {
    
    const totalUsers = await User.countDocuments();
    const totalHealthSubmissions = await HealthData.countDocuments();

   
    const riskCategories = ["high", "medium", "low"];
    const riskDistribution = {};
    for (const i of riskCategories) {
      riskDistribution[i] = await HealthData.countDocuments({ risk: i });

    }

    const healthTrends = await HealthData.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      totalUsers,
      totalHealthSubmissions,
      riskDistribution,
      healthTrends,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { getDashboardAnalytics };
