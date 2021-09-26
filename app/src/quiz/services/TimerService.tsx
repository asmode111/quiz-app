import { Service } from "typedi";

@Service()
class TimerService {

  private defaultTimerHours = 1;
  private defaultTimerMinutes = 30;
  private defaultTimerSeconds = 0;

  public getDefaultTimerHours(): number {
    return this.defaultTimerHours;
  }
  
  public getDefaultTimerMinutes(): number {
    return this.defaultTimerMinutes;
  }
  
  public getDefaultTimerSeconds(): number {
    return this.defaultTimerSeconds;
  }

  public getTimerHours(): number {
    const timerHours = localStorage.getItem("quiz_timerHours");
    if (!timerHours) {
      return this.getDefaultTimerHours();
    }

    return parseInt(timerHours);
  }

  public getTimerMinutes(): number {
    const timerMinutes = localStorage.getItem("quiz_timerMinutes");
    console.log("timerMinutes", timerMinutes);
    if (!timerMinutes) {
      return this.getDefaultTimerMinutes();
    }

    return parseInt(timerMinutes);
  }
  
  public getTimerSeconds(): number {
    const timerSeconds = localStorage.getItem("quiz_timerSeconds");
    if (!timerSeconds) {
      return this.getDefaultTimerSeconds();
    }

    return parseInt(timerSeconds);
  }
  
  public updateTimer(time: ITimer): void {
    localStorage.setItem("quiz_timerHours", time.hours.toString());
    localStorage.setItem("quiz_timerMinutes", time.minutes.toString());
    localStorage.setItem("quiz_timerSeconds", time.seconds.toString());
  }
  
  public resetData(): void {
    localStorage.removeItem("quiz_timerHours");
    localStorage.removeItem("quiz_timerMinutes");
    localStorage.removeItem("quiz_timerSeconds");
  }
}

export { TimerService };