export interface Question {
  id: string;
  type: 'multiple-choice' | 'code-input' | 'puzzle';
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  testCases?: Array<{ input: string; expectedOutput: string }>;
  codeTemplate?: string;
}

export const questions: Question[] = [
  // Multiple Choice Programming Questions
  {
    id: '1',
    type: 'multiple-choice',
    category: 'JavaScript',
    difficulty: 'easy',
    question: 'What is the output of: console.log(typeof null)?',
    options: ['null', 'object', 'undefined', 'string'],
    correctAnswer: 'object',
    explanation: 'In JavaScript, typeof null returns "object" due to a legacy bug that has been preserved for compatibility.'
  },
  {
    id: '2',
    type: 'multiple-choice',
    category: 'Python',
    difficulty: 'medium',
    question: 'What does the following Python code output?\n\nprint([1, 2, 3] + [4, 5])',
    options: ['[1, 2, 3, 4, 5]', 'Error', '[5, 7, 3]', '[1, 2, 7, 9]'],
    correctAnswer: '[1, 2, 3, 4, 5]',
    explanation: 'The + operator concatenates lists in Python, joining all elements from both lists.'
  },
  {
    id: '3',
    type: 'multiple-choice',
    category: 'Algorithms',
    difficulty: 'hard',
    question: 'What is the time complexity of finding an element in a balanced binary search tree?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctAnswer: 'O(log n)',
    explanation: 'In a balanced BST, the height is log n, so searching takes O(log n) time in the average and worst case.'
  },
  {
    id: '4',
    type: 'multiple-choice',
    category: 'CSS',
    difficulty: 'easy',
    question: 'Which CSS property is used to change the text color?',
    options: ['text-color', 'color', 'font-color', 'text-style'],
    correctAnswer: 'color',
    explanation: 'The color property in CSS is used to set the foreground color of text content.'
  },
  {
    id: '5',
    type: 'multiple-choice',
    category: 'React',
    difficulty: 'medium',
    question: 'What hook is used to manage side effects in React functional components?',
    options: ['useState', 'useEffect', 'useContext', 'useReducer'],
    correctAnswer: 'useEffect',
    explanation: 'useEffect is used to perform side effects like API calls, subscriptions, and DOM manipulation.'
  },

  // Code Input Questions
  {
    id: '6',
    type: 'code-input',
    category: 'JavaScript',
    difficulty: 'easy',
    question: 'Write a function that returns the sum of two numbers.',
    codeTemplate: 'function sum(a, b) {\n  // Your code here\n}',
    correctAnswer: 'function sum(a, b) {\n  return a + b;\n}',
    explanation: 'A simple function that adds two parameters and returns the result.',
    testCases: [
      { input: 'sum(2, 3)', expectedOutput: '5' },
      { input: 'sum(-1, 1)', expectedOutput: '0' },
      { input: 'sum(0, 0)', expectedOutput: '0' }
    ]
  },
  {
    id: '7',
    type: 'code-input',
    category: 'Python',
    difficulty: 'medium',
    question: 'Write a function to check if a string is a palindrome (case-insensitive).',
    codeTemplate: 'def is_palindrome(s):\n    # Your code here\n    pass',
    correctAnswer: 'def is_palindrome(s):\n    s = s.lower()\n    return s == s[::-1]',
    explanation: 'Convert to lowercase and compare the string with its reverse.',
    testCases: [
      { input: 'is_palindrome("racecar")', expectedOutput: 'True' },
      { input: 'is_palindrome("hello")', expectedOutput: 'False' },
      { input: 'is_palindrome("A")', expectedOutput: 'True' }
    ]
  },
  {
    id: '8',
    type: 'code-input',
    category: 'Algorithms',
    difficulty: 'hard',
    question: 'Implement binary search to find an element in a sorted array.',
    codeTemplate: 'function binarySearch(arr, target) {\n  // Your code here\n}',
    correctAnswer: 'function binarySearch(arr, target) {\n  let left = 0, right = arr.length - 1;\n  while (left <= right) {\n    let mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}',
    explanation: 'Binary search divides the search space in half each iteration, achieving O(log n) time complexity.',
    testCases: [
      { input: 'binarySearch([1,2,3,4,5], 3)', expectedOutput: '2' },
      { input: 'binarySearch([1,2,3,4,5], 6)', expectedOutput: '-1' },
      { input: 'binarySearch([1], 1)', expectedOutput: '0' }
    ]
  },

  // Puzzle Questions
  {
    id: '9',
    type: 'puzzle',
    category: 'Logic',
    difficulty: 'easy',
    question: 'Memory Pattern: Remember this sequence and type it back: 1, 4, 2, 8, 5',
    options: ['1, 4, 2, 8, 5', '1, 2, 4, 5, 8', '4, 1, 8, 2, 5', '5, 8, 2, 4, 1'],
    correctAnswer: '1, 4, 2, 8, 5',
    explanation: 'This tests short-term memory and attention to detail.'
  },
  {
    id: '10',
    type: 'puzzle',
    category: 'Math',
    difficulty: 'medium',
    question: 'What comes next in this sequence? 2, 6, 12, 20, 30, ?',
    options: ['42', '40', '38', '44'],
    correctAnswer: '42',
    explanation: 'Pattern: n(n+1) where n starts from 2. Next is 6×7 = 42.'
  },
  {
    id: '11',
    type: 'puzzle',
    category: 'Logic',
    difficulty: 'hard',
    question: 'Tower of Hanoi: What is the minimum number of moves to solve with 4 discs?',
    options: ['7', '15', '8', '16'],
    correctAnswer: '15',
    explanation: 'For n discs, minimum moves = 2^n - 1. For 4 discs: 2^4 - 1 = 15.'
  },
  {
    id: '12',
    type: 'multiple-choice',
    category: 'Database',
    difficulty: 'medium',
    question: 'Which SQL clause is used to filter rows after grouping?',
    options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'],
    correctAnswer: 'HAVING',
    explanation: 'HAVING is used to filter groups after GROUP BY, while WHERE filters rows before grouping.'
  },
  {
    id: '13',
    type: 'code-input',
    category: 'JavaScript',
    difficulty: 'medium',
    question: 'Write a function to reverse an array without using built-in methods.',
    codeTemplate: 'function reverseArray(arr) {\n  // Your code here\n}',
    correctAnswer: 'function reverseArray(arr) {\n  let result = [];\n  for (let i = arr.length - 1; i >= 0; i--) {\n    result.push(arr[i]);\n  }\n  return result;\n}',
    explanation: 'Iterate through the array backwards and build a new array.',
    testCases: [
      { input: 'reverseArray([1,2,3])', expectedOutput: '[3,2,1]' },
      { input: 'reverseArray(["a","b"])', expectedOutput: '["b","a"]' },
      { input: 'reverseArray([])', expectedOutput: '[]' }
    ]
  },
  {
    id: '14',
    type: 'puzzle',
    category: 'Logic',
    difficulty: 'medium',
    question: 'If it takes 5 machines 5 minutes to make 5 widgets, how long does it take 100 machines to make 100 widgets?',
    options: ['5 minutes', '100 minutes', '20 minutes', '1 minute'],
    correctAnswer: '5 minutes',
    explanation: 'Each machine takes 5 minutes to make 1 widget, regardless of how many machines are working.'
  },
  {
    id: '15',
    type: 'multiple-choice',
    category: 'Data Structures',
    difficulty: 'hard',
    question: 'Which data structure is best for implementing undo functionality?',
    options: ['Queue', 'Stack', 'Tree', 'Graph'],
    correctAnswer: 'Stack',
    explanation: 'Stack follows LIFO (Last In, First Out) principle, perfect for undo operations where you reverse the most recent action first.'
  }
];

export const getRandomQuestions = (count: number = 10): Question[] => {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const getQuestionsByCategory = (category: string): Question[] => {
  return questions.filter(q => q.category.toLowerCase() === category.toLowerCase());
};

export const getQuestionsByDifficulty = (difficulty: string): Question[] => {
  return questions.filter(q => q.difficulty === difficulty);
};