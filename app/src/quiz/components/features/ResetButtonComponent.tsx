import { ReactElement } from "react";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

function ResetButtonComponent(props: IResetButtonComponentProps): ReactElement {
  return (
    <Row className="mt-2 p-2">
      <Button
        onClick={props.onResetClick}
        className="btn-block"
        variant="danger">
        Reset
      </Button>
    </Row>
  );
}

export default ResetButtonComponent;