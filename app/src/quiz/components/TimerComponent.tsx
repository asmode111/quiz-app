import React, { ReactElement } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function TimerComponent(props: any): ReactElement {
  const [time, setTime] = React.useState<ITimer>({hours: props.hours, minutes: props.minutes, seconds: props.seconds});

  const tick = () => {
    if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
      reset();
    } else if (time.hours === 0 && time.seconds === 0) {
      setTime({hours: time.hours - 1, minutes: 59, seconds: 59});
    } else if (time.seconds === 0) {
      setTime({hours: time.hours, minutes: time.minutes - 1, seconds: 59});
    } else {
      setTime({hours: time.hours, minutes: time.minutes, seconds: time.seconds - 1});
    }

    props.onUpdateTimer(time);
  };

  const reset = () => setTime({hours: time.hours, minutes: time.minutes, seconds: time.seconds});

  React.useEffect(() => {
    if (props.isResetClicked) {
      return () => {
        setTime({hours: props.hours, minutes: props.minutes, seconds: props.seconds});
        props.onTimerReset(true);
      };
    }

    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  return (
    <Col>
      <Row className="pt-2">
        <p>{`${time.hours.toString().padStart(2, "0")}:${time.minutes
            .toString()
            .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`}</p>
      </Row>
    </Col>
  );
}

export default TimerComponent;