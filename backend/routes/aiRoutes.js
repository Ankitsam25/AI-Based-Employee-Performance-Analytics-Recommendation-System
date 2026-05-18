const express = require('express');
const router = express.Router();
const { getRecommendation, getRankings } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/recommend', getRecommendation);     // POST /api/ai/recommend
router.get('/rankings', getRankings);             // GET /api/ai/rankings

module.exports = router;
