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

  public getTimeUnits( ms: number ): ITimer {
    const allocate = (msUnit: number) => {
      const units = Math.trunc(ms / msUnit);
      ms -= units * msUnit;
      return units;
    };

    return {
      // days: allocate(86400000),
      hours: allocate(3600000),
      minutes: allocate(60000),
      seconds: allocate(1000),
      // ms: ms
    };
  }

  public getTimeDiff(time: ITimer): number {
    let diffInMiliseconds = (time.hours * 60 * 60 * 1000) + (time.minutes * 60 * 1000) + (time.seconds * 1000);
    diffInMiliseconds--;

    return diffInMiliseconds;
  }
}

export { TimerService };