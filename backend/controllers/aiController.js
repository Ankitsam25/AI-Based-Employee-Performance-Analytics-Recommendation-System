const fetch = require('node-fetch');
const Employee = require('../models/Employee');

// @desc    Get AI recommendation for one employee
// @route   POST /api/ai/recommend
// @access  Private
const getRecommendation = async (req, res) => {
  try {
    const { employeeId } = req.body;

    let employee;
    if (employeeId) {
      employee = await Employee.findById(employeeId);
      if (!employee) return res.status(404).json({ message: 'Employee not found' });
    } else {
      // Use body data directly if no employeeId
      employee = req.body;
    }

    const prompt = `
You are an expert HR analytics AI. Analyze the following employee data and provide:
1. Promotion recommendation (Yes/No with reason)
2. Training suggestions (list 2-3 specific courses/skills)
3. Overall performance feedback
4. Ranking category (Top Performer / Average / Needs Improvement)

Employee Data:
- Name: ${employee.name}
- Department: ${employee.department}
- Skills: ${Array.isArray(employee.skills) ? employee.skills.join(', ') : employee.skills}
- Performance Score: ${employee.performanceScore}/100
- Years of Experience: ${employee.experience}

Provide a concise, professional response in JSON format with keys: promotion, trainingsuggestions, feedback, ranking.
    `;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Employee Analytics App',
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ message: 'AI API error', details: data });
    }

    let aiContent = data.choices[0].message.content;

    // Try to parse JSON from AI response
    try {
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        aiContent = JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      // Keep as string if not parseable
    }

    res.json({ employee: employee.name || 'Employee', recommendation: aiContent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get AI rankings for all employees
// @route   GET /api/ai/rankings
// @access  Private
const getRankings = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ performanceScore: -1 });

    const prompt = `
Rank the following employees and provide brief recommendation for each:
${employees.map((e, i) => `${i + 1}. ${e.name} | Dept: ${e.department} | Score: ${e.performanceScore} | Exp: ${e.experience}yrs | Skills: ${e.skills.join(', ')}`).join('\n')}

Return JSON array with objects: { name, rank, category, recommendation }
    `;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Employee Analytics App',
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 800,
      }),
    });

    const data = await response.json();
    let aiContent = data.choices[0].message.content;

    try {
      const jsonMatch = aiContent.match(/\[[\s\S]*\]/);
      if (jsonMatch) aiContent = JSON.parse(jsonMatch[0]);
    } catch (e) {}

    res.json({ rankings: aiContent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getRecommendation, getRankings };
