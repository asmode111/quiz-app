import { ReactElement, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import SelectQuizComponent from "./components/SelectQuizComponent";
import SelectableQuizComponent from "./components/SelectableQuizComponent";
import EssayQuizComponent from "./components/EssayQuizComponent";

import "./assets/Quiz.css";

import { selectSelectedComponent } from "./store";
import { 
  setSelectedComponent,
  resetSelectedComponent,
  SELECT_QUIZ_COMPONENT,
  SELECTABLE_RANDOM_QUIZ_COMPONENT,
  SELECTABLE_ALL_QUIZ_COMPONENT,
  ESSAY_QUIZ_COMPONENT 
} from "./slices/selectedComponentSlice";

function Quiz(): ReactElement {
  const dispatch = useDispatch();
  const selectedComponent = useSelector(selectSelectedComponent);

  useEffect(() => {
    const savedSelectedQuizType = localStorage.getItem("quiz_selectedQuizType");
    if (savedSelectedQuizType) {
      dispatch(setSelectedComponent(parseInt(savedSelectedQuizType)));
    }
  });
  
  const handleQuizTypeComponentSelection = (selectedQuizType: number) => {
    dispatch(setSelectedComponent(selectedQuizType));
    localStorage.setItem("quiz_selectedQuizType", selectedQuizType.toString());
  };
  
  const handelQuizReset = () => {
    localStorage.removeItem("quiz_selectedQuizType");
    dispatch(resetSelectedComponent());
  };

  const defaultComponent = (): ReactElement => {
    return (
      <Container fluid className="container mt-5">
        <Row>
          <SelectQuizComponent 
            onQuizTypeClicked={handleQuizTypeComponentSelection} />
        </Row>
      </Container >
    );
  };

  if (selectedComponent === SELECT_QUIZ_COMPONENT) {
    return defaultComponent();
  }

  if (selectedComponent === SELECTABLE_RANDOM_QUIZ_COMPONENT 
    || selectedComponent === SELECTABLE_ALL_QUIZ_COMPONENT
  ) {
    return (
      <SelectableQuizComponent 
        onQuizReset={handelQuizReset}
        isRandomQuiz={selectedComponent === SELECTABLE_RANDOM_QUIZ_COMPONENT}
      />
    );
  }
  
  if (selectedComponent === ESSAY_QUIZ_COMPONENT) {
    return (
      <EssayQuizComponent onQuizReset={handelQuizReset} />
    );
  }

  return defaultComponent();
}

export default Quiz;
