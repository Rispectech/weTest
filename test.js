// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';
import Login from './components/Login';
import Quiz from './components/Quiz';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <QuizProvider>
          <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute path="/quiz" component={Quiz} />
          </Switch>
        </QuizProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

// src/context/AuthContext.js
import React, { createContext, useReducer } from 'react';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const AuthContext = createContext(initialState);

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

// src/context/QuizContext.js
import React, { createContext, useReducer } from 'react';

const initialState = {
  questions: [],
  answers: {},
  score: null,
};

const QuizContext = createContext(initialState);

function quizReducer(state, action) {
  switch (action.type) {
    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload };
    case 'SET_ANSWER':
      return { ...state, answers: { ...state.answers, [action.payload.id]: action.payload.answer } };
    case 'SET_SCORE':
      return { ...state, score: action.payload };
    default:
      return state;
  }
}

function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

export { QuizContext, QuizProvider };

// src/components/Login.js
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? '/api/login' : '/api/signup';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.token) {
        dispatch({ type: 'LOGIN', payload: { user: data.user, token: data.token } });
        history.push('/quiz');
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Need to sign up?' : 'Already have an account?'}
      </button>
    </div>
  );
}

export default Login;

// src/components/Quiz.js
import React, { useContext, useEffect, useState } from 'react';
import { QuizContext } from '../context/QuizContext';
import { AuthContext } from '../context/AuthContext';

function Quiz() {
  const { state, dispatch } = useContext(QuizContext);
  const { state: authState } = useContext(AuthContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('/api/questions', {
        headers: { Authorization: `Bearer ${authState.token}` },
      });
      const data = await response.json();
      dispatch({ type: 'SET_QUESTIONS', payload: data });
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleAnswer = (answer) => {
    dispatch({
      type: 'SET_ANSWER',
      payload: { id: state.questions[currentQuestion].id, answer },
    });
    if (currentQuestion < state.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/grade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify({ answers: state.answers }),
      });
      const data = await response.json();
      dispatch({ type: 'SET_SCORE', payload: data.score });
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  if (state.questions.length === 0) return <div>Loading...</div>;
  if (state.score !== null) return <div>Your score: {state.score}</div>;

  const question = state.questions[currentQuestion];

  return (
    <div>
      <h2>Question {currentQuestion + 1}</h2>
      <p>{question.text}</p>
      {question.type === 'mcq' && (
        <div>
          {question.options.map((option, index) => (
            <button key={index} onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
        </div>
      )}
      {question.type === 'fill-in-the-blank' && (
        <input
          type="text"
          onChange={(e) => handleAnswer(e.target.value)}
        />
      )}
      {question.type === 'descriptive' && (
        <textarea
          onChange={(e) => handleAnswer(e.target.value)}
          maxLength={50}
        />
      )}
      {currentQuestion === state.questions.length - 1 && (
        <button onClick={handleSubmit}>Submit</button>
      )}
    </div>
  );
}

export default Quiz;

// src/components/PrivateRoute.js
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function PrivateRoute({ component: Component, ...rest }) {
  const { state } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        state.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

export default PrivateRoute;
