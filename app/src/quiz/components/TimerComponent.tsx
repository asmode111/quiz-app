import React, { ReactElement } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function TimerComponent(props: any): ReactElement {
  const [time, setTime] = React.useState<ITimer>(props.timer);

  const tick = () => {
    console.log(time);
    const expireIn = new Date();
    expireIn.setHours(time.hours);
    expireIn.setMinutes(time.minutes);
    expireIn.setSeconds(time.seconds);
    console.log(expireIn);
    
    console.log("distance", distance);
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const newTime = {hours: hours, minutes: minutes, seconds: seconds};
    setTime(newTime);
    // props.onUpdateTimer(newTime);
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

  if (!props.isResetClicked) {
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

  return (<Col>not defined</Col>);
}

export default TimerComponent;