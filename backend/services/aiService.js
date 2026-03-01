const OpenAI = require('openai');

// Initialize OpenAI client
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

/**
 * Generate an AI explanation for the current algorithm step
 * @param {Object} context - Current visualization context
 * @param {string} context.algorithmName - Name of the algorithm
 * @param {string} context.category - Algorithm category (Sorting, Searching, etc.)
 * @param {number} context.currentStep - Current step number
 * @param {number} context.totalSteps - Total steps in the algorithm
 * @param {string} context.operation - Current operation being performed
 * @param {string} context.explanation - Current explanation text
 * @param {Object} context.variables - Current state of variables
 * @param {Array} context.array - Current array state
 * @param {string} userQuestion - Optional specific question from user
 * @returns {Promise<string>} AI-generated explanation
 */
const generateExplanation = async (context, userQuestion = null) => {
  if (!openai) {
    // Fallback to rule-based explanations if no API key
    return generateFallbackExplanation(context, userQuestion);
  }

  const { algorithmName, category, currentStep, totalSteps, operation, explanation, variables, array } = context;

  // Build the prompt
  let prompt = `You are an Algorithm Tutor helping students understand algorithms through visualization.
  
Current Visualization Context:
- Algorithm: ${algorithmName}
- Category: ${category}
- Progress: Step ${currentStep} of ${totalSteps}
- Current Operation: ${operation}
- Current Explanation: ${explanation || 'N/A'}
- Variables State: ${JSON.stringify(variables)}
- Array State: [${array.map(item => item.value).join(', ')}]`;

  if (userQuestion) {
    prompt += `\n\nStudent's Question: ${userQuestion}\n\nPlease provide a clear, educational answer.`;
  } else {
    prompt += `\n\nPlease explain what's happening at this step in simple terms. Focus on:
1. What operation is being performed
2. Why it's being done this way
3. What changes are happening to the data`;
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a patient, knowledgeable algorithm tutor. Explain concepts clearly with analogies when helpful. Use simple language suitable for beginners.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    return generateFallbackExplanation(context, userQuestion);
  }
};

/**
 * Generate personalized suggestions based on current state
 * @param {Object} context - Current visualization context
 * @returns {Promise<Array<string>>} Array of suggestions
 */
const generateSuggestions = async (context) => {
  if (!openai) {
    return generateFallbackSuggestions(context);
  }

  const { algorithmName, currentStep, totalSteps, array } = context;

  const prompt = `Based on the algorithm "${algorithmName}" at step ${currentStep} of ${totalSteps} with array [${array.map(item => item.value).join(', ')}],

Provide 3-4 helpful suggestions for what the student could try next or questions they might have. Keep suggestions brief and practical.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful algorithm tutor. Provide brief, actionable suggestions.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 200,
      temperature: 0.7
    });

    // Parse suggestions from response
    const text = response.choices[0].message.content;
    return text.split('\n').filter(s => s.trim().length > 0).slice(0, 4);
  } catch (error) {
    console.error('OpenAI API error:', error);
    return generateFallbackSuggestions(context);
  }
};

/**
 * Fallback explanation when AI is not available
 */
const generateFallbackExplanation = (context, userQuestion) => {
  const { algorithmName, operation, variables, array, currentStep, totalSteps } = context;

  if (userQuestion) {
    // Common Q&A patterns
    const lowerQuestion = userQuestion.toLowerCase();
    
    if (lowerQuestion.includes('why')) {
      return `Great question! The "${operation}" step is crucial because it helps us achieve the algorithm's goal efficiently. In ${algorithmName}, each step is designed to progressively organize the data.`;
    }
    
    if (lowerQuestion.includes('time complexity') || lowerQuestion.includes('big o')) {
      return `${algorithmName} has different time complexities: Best case is O(n), Average is O(n²), and Worst case is O(n²) for Bubble Sort. This refers to how the number of operations grows with input size.`;
    }
    
    if (lowerQuestion.includes('what')) {
      return `At step ${currentStep}, we're performing "${operation}". The current array state is: [${array.slice(0, 5).map(i => i.value).join(', ')}${array.length > 5 ? '...' : ''}]. This is helping us sort/search the data.`;
    }
    
    return `That's a great question to ask! "${userQuestion}" relates to understanding how ${algorithmName} works step by step. Keep exploring and asking questions - that's the best way to learn!`;
  }

  // Default step explanation
  let explanation = `At step ${currentStep} of ${totalSteps}, we're currently: ${operation || 'processing the data'}. `;
  
  if (variables && Object.keys(variables).length > 0) {
    explanation += 'Current variable values: ';
    explanation += Object.entries(variables)
      .map(([k, v]) => `${k}=${Array.isArray(v) ? '[' + v.slice(0, 5).join(',') + '...]' : v}`)
      .join(', ');
  }
  
  explanation += '. This is part of the ' + algorithmName + ' algorithm which helps organize data efficiently.';
  
  return explanation;
};

/**
 * Fallback suggestions when AI is not available
 */
const generateFallbackSuggestions = (context) => {
  const { algorithmName, currentStep, totalSteps } = context;
  const progress = (currentStep / totalSteps) * 100;
  
  const baseSuggestions = [
    `Try explaining what happens at step ${Math.max(1, currentStep - 1)} to test your understanding`,
    `What would happen if we skipped this step?`,
    `Can you trace through this algorithm with a smaller array?`,
    'Try using Step-by-Step mode to see each operation clearly'
  ];
  
  if (progress < 25) {
    return [
      'Watch the first few steps carefully to understand the pattern',
      'Try to predict what will happen at the next step',
      ...baseSuggestions.slice(0, 2)
    ];
  } else if (progress > 75) {
    return [
      'We\'re almost done! Notice how the array is almost sorted now',
      'Think about why this algorithm guarantees a sorted result',
      ...baseSuggestions.slice(0, 2)
    ];
  }
  
  return baseSuggestions;
};

/**
 * Chat session management
 */
const chatSessions = new Map();

const createSession = (sessionId) => {
  chatSessions.set(sessionId, {
    messages: [],
    createdAt: new Date()
  });
};

const addMessage = (sessionId, role, content) => {
  if (!chatSessions.has(sessionId)) {
    createSession(sessionId);
  }
  chatSessions.get(sessionId).messages.push({ role, content, timestamp: new Date() });
  
  // Keep only last 20 messages
  const session = chatSessions.get(sessionId);
  if (session.messages.length > 20) {
    session.messages = session.messages.slice(-20);
  }
};

const getSessionHistory = (sessionId) => {
  return chatSessions.has(sessionId) 
    ? chatSessions.get(sessionId).messages 
    : [];
};

const clearSession = (sessionId) => {
  chatSessions.delete(sessionId);
};

module.exports = {
  generateExplanation,
  generateSuggestions,
  createSession,
  addMessage,
  getSessionHistory,
  clearSession
};
