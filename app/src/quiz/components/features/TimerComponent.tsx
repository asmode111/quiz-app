import React, { ReactElement } from "react";
import { Container as ServiceContainer } from "typedi";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { TimerService } from "../../services/TimerService";
const timerService = ServiceContainer.get(TimerService);

function TimerComponent(props: ITimerComponentProps): ReactElement {
  const [time, setTime]: [ITimer, (timer: ITimer) => void] = React.useState<ITimer>(timerService.getTimer());

  const tick = () => {
    const timeDiffInMiliseconds = timerService.getTimeDiff(time);
    const newTime = timerService.getTimeUnits(timeDiffInMiliseconds);
    timerService.updateTimer(newTime);
    setTime(newTime);
  };

  React.useEffect(() => {
    if (props.isResetClicked) {
      props.onTimerReset();
      timerService.resetTimer();
      setTime(timerService.getTimer());
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