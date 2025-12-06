import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccelerationFunctionsService {
  air_density = 1.22;
  sx = 1.71;

  constructor() { }

  getAccelerationCalc(speed: number, power: number, weight: number, cx: number, rollingResistance: number, maximumAccG: number) {
    var res = this.getPushForce(speed, power) - this.getAeroDrag(speed, cx) - this.getRollingDrag(speed, rollingResistance, weight);
    res = res / weight / 1000;
    if (res > maximumAccG / 100) {
      //to je ta max G pospešek na začetku
      res = maximumAccG / 100;
    }
    return res;
  }

  getAeroDrag(speed: number, cx: number) {
    return this.air_density * speed * speed * cx * this.sx / 2;
  }

  getRollingDrag(speed: number, rollingResistance: number, weight: number) {
    /**
     * *
     * TODO: Why arent we taking into account speed here?
     */
    return rollingResistance * weight * 9.81;
  };

  getPushForce(speed: number, power: number) {
    return power * 0.95 * 525 / speed;//0.95 je transmission efficency  525 je hp -> kW * 1000 zaradi kilo
  };
}
