const Revenue = require('../models/revenueModel');
const Sales = require('../models/salesModel');
const Opportunity = require('../models/opportunityModel');
const Company = require('../models/companyModel');

// GET totale entrate, vendite e numero opportunità
exports.getDashboardData = async (req, res) => {
  try {
    const revenueData = await Revenue.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const salesData = await Sales.aggregate([
      { $group: { _id: null, totalSales: { $sum: "$amount" } } }
    ]);
    const opportunities = await Opportunity.countDocuments();

    res.status(200).json({
      revenue: revenueData[0]?.total || 0,
      sales: salesData[0]?.totalSales || 0,
      opportunities
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET riassunto delle entrate totali e media mensile
exports.getRevenueSummary = async (req, res) => {
  try {
    const totalRevenue = await Revenue.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$amount" } } }
    ]);

    const monthlyAverage = await Revenue.aggregate([
      { 
        $group: { 
          _id: { year: { $year: "$date" }, month: { $month: "$date" } }, 
          total: { $sum: "$amount" } 
        }
      },
      { 
        $group: { 
          _id: null, 
          avgMonthlyRevenue: { $avg: "$total" } 
        }
      }
    ]);

    res.status(200).json({
      totalRevenue: totalRevenue[0]?.totalRevenue || 0,
      avgMonthlyRevenue: monthlyAverage[0]?.avgMonthlyRevenue || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET vendite mensili per l'anno in corso
exports.getMonthlySales = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const monthlySales = await Sales.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`)
          }
        }
      },
      {
        $group: {
          _id: { month: { $month: "$date" } },
          totalSales: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.month": 1 } }
    ]);

    res.status(200).json(monthlySales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET nuove opportunità create mensilmente
exports.getMonthlyOpportunities = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const monthlyOpportunities = await Opportunity.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`)
          }
        }
      },
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          totalOpportunities: { $sum: 1 }
        }
      },
      { $sort: { "_id.month": 1 } }
    ]);

    res.status(200).json(monthlyOpportunities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET top clienti per entrate
exports.getTopCustomers = async (req, res) => {
  try {
    const topCustomers = await Revenue.aggregate([
      {
        $group: {
          _id: "$companyId",
          totalRevenue: { $sum: "$amount" }
        }
      },
      { $sort: { totalRevenue: -1 } },
      { $limit: 5 },
      { $lookup: { from: "companies", localField: "_id", foreignField: "_id", as: "company" } },
      { $unwind: "$company" }
    ]);

    res.status(200).json(topCustomers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET opportunità per stato (stage)
exports.getOpportunitiesByStatus = async (req, res) => {
  try {
    const opportunityStatus = await Opportunity.aggregate([
      {
        $group: {
          _id: "$stage",
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json(opportunityStatus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
