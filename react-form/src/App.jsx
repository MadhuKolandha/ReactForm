import './App.css';
import DynamicForm from './components/DynamicForm';
import schema from './json/schema.json';
function App() {
  return (
    <>
      <DynamicForm schema={schema} />
    </>
  );
}

export default App;
