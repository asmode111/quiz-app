import { Service } from "typedi";
import { getTextOfJSDocComment } from "typescript";

@Service()
class TimerService {

  private defaultTimerHours = 1;
  private defaultTimerMinutes = 30;
  private defaultTimerSeconds = 0;
  
  public getDefaultTimer(): ITimer {
    return {
      "hours": this.defaultTimerHours,
      "minutes": this.defaultTimerMinutes,
      "seconds": this.defaultTimerSeconds,
    };
  }

  public getTimer(): ITimer {
    const timer = localStorage.getItem("quiz_timer");
    if (!timer) {
      const defaultTimer = this.getDefaultTimer();
      this.updateTimer(defaultTimer);

      return defaultTimer;
    }

    return JSON.parse(timer);
  }
  
  public updateTimer(timer: ITimer): void {
    localStorage.setItem("quiz_timer", JSON.stringify(timer));
  }
  
  public resetTimer(): void {
    localStorage.removeItem("quiz_timer");
  }
}

export { TimerService };