import React, { ReactElement, useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import SelectQuizComponent from "./components/SelectQuizComponent";

import "./assets/Quiz.css";
import SelectableQuizComponent from "./components/SelectableQuizComponent";

function Quiz(): ReactElement {
  const [selectedComponent, setSelectedComponent] = useState<number>(0);

  useEffect(() => {
    const savedSelectedQuizType = localStorage.getItem("quiz_selectedQuizType");
    if (savedSelectedQuizType) {
      console.log("savedSelectedQuizType", savedSelectedQuizType);
      setSelectedComponent(parseInt(savedSelectedQuizType));
    }
  });
  
  const handleQuizTypeComponentSelection = (selectedQuizType: number) => {
    localStorage.setItem("quiz_selectedQuizType", selectedQuizType.toString());
    setSelectedComponent(selectedQuizType);
  };
  
  const handelQuizReset = () => {
    localStorage.removeItem("quiz_selectedQuizType");
    setSelectedComponent(0);
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

  if (selectedComponent === 0) {
    return defaultComponent();
  }

  if (selectedComponent === 1) {
    return (
      <SelectableQuizComponent 
        onQuizReset={handelQuizReset} 
      />
    );
  }

  return defaultComponent();
}

export default Quiz;
