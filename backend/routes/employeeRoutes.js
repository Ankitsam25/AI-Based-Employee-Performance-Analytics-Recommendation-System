const express = require('express');
const router = express.Router();
const {
  addEmployee,
  getAllEmployees,
  getEmployeeById,
  searchEmployees,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

router.get('/search', searchEmployees);           // GET /api/employees/search?department=Development
router.get('/', getAllEmployees);                  // GET /api/employees
router.post('/', addEmployee);                     // POST /api/employees
router.get('/:id', getEmployeeById);              // GET /api/employees/:id
router.put('/:id', updateEmployee);               // PUT /api/employees/:id
router.delete('/:id', deleteEmployee);            // DELETE /api/employees/:id

module.exports = router;
