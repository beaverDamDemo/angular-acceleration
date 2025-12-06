import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ChartModule } from 'angular-highcharts';
import { Chart } from 'angular-highcharts';
import { AccelerationFunctionsService } from '../../shared/services/acceleration-functions.service';
@Component({
  selector: 'app-form-main',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatRadioModule, FormsModule, MatCardModule, ChartModule],
  templateUrl: './form-main.component.html',
  styleUrl: './form-main.component.scss'
})
export class FormMainComponent implements OnInit {
  finalGearMin = 200;
  finalGearMax = 400;
  calculate_interval_ms: number = 50;
  splits = 5;
  initialSpeedKmh = 20;
  divRpm = 50;
  myForm_0_isShown = true;
  formfixShow = false;
  finalDrive: number = 3.94;
  gearRatios: any[] = [];
  tanja: any[] = [];
  love: any[] = [];
  engines: any[] = [
    {
      label: 'Viper "700ps"',
      effectiveMaxHp: '-',
      maxRpm: 6000,
      shiftRpm: 5700,
      torqueData: [621, 675, 721, 768, 804, 842, 875, 911, 934, 957, 978, 998, 1003, 1017, 1039, 1023, 1005, 988, 978, 966, 944, 867, 789, 710],
      torqueLookupTable: [],
      powerLookupTable: [],
    },
    {
      label: 'Fat torque "675ps"',
      effectiveMaxHp: '-',
      maxRpm: 6000,
      shiftRpm: 5450,
      torqueData: [
        731, 779, 816, 854, 888, 924, 948, 971, 992, 1012, 1018, 1032, 1054, 1053, 1038, 1020, 1002, 992, 980, 958, 890, 830, 760, 680,
      ],
      torqueLookupTable: [],
      powerLookupTable: [],
    },
    {
      label: 'Flat torque "747ps"',
      effectiveMaxHp: '-',
      maxRpm: 6000,
      shiftRpm: 6000,
      torqueData: [875, 875, 875, 875, 875, 875, 875],
      torqueLookupTable: [],
      powerLookupTable: [],
    },
    {
      label: 'Peaky torque "737ps"',
      effectiveMaxHp: '-',
      maxRpm: 6000,
      shiftRpm: 6000,
      torqueData: [495, 551, 602, 654, 698, 745, 780, 816, 848, 883, 906, 928, 948, 967, 972, 986, 1007, 992, 957, 948, 937, 926, 906, 782],
      torqueLookupTable: [],
      powerLookupTable: [],
    },
    {
      label: 'Peaky torque "748ps"',
      effectiveMaxHp: '-',
      maxRpm: 6000,
      shiftRpm: 6000,
      torqueData: [503, 559, 611, 664, 709, 756, 792, 828, 861, 896, 920, 942, 962, 982, 987, 1001, 1022, 1007, 972, 962, 951, 940, 920, 794],
      torqueLookupTable: [],
      powerLookupTable: [],
    },
    {
      label: 'Stock GTS from real-world dyno "450ps"',
      effectiveMaxHp: '-',
      maxRpm: 5750,
      shiftRpm: 5600,
      torqueData: [280, 330, 290, 300, 308, 315, 322, 338, 345, 354, 433, 544, 544, 561, 584, 591, 612, 626, 618, 622, 612, 591, 578, 561, 527, 496],
      torqueLookupTable: [],
      powerLookupTable: [],
    },
    {
      label: 'Bmw N47 135kW',
      effectiveMaxHp: '-',
      maxRpm: 5500,
      shiftRpm: 4400,
      rpmDataWIP: [],
      torqueData: [100, 100, 150, 270, 380, 370, 370, 350, 320, 270, 230, 200],
      psDataWIP: [],
    },
    {
      label: 'Porsche GT3 Cup 2009',
      effectiveMaxHp: '-',
      maxRpm: 8250,
      shiftRpm: 8250,
      rpmDataWIP: [2008, 2502, 3001, 3508, 4004, 4520, 5021, 5525, 6015, 6525, 7015, 7524, 8011, 8263],
      torqueData: [222.6, 232.8, 249.6, 262.9, 262.4, 312.3, 342.2, 355.4, 382.5, 386.4, 385.2, 382.9, 351.8, 340.7],
      psDataWIP: [63.7, 82.9, 106.6, 131.3, 149.6, 201.0, 244.6, 279.6, 327.6, 359.0, 384.7, 410.2, 401.3, 400.9],
    },
    {
      label: 'Aprilia RS125',
      effectiveMaxHp: '-',
      maxRpm: 11250,
      shiftRpm: 10750,
      torqueData: [
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4.5, 5, 6.75, 7, 7, 6.75, 7, 7, 7.5, 6.75, 7, 7.75, 8.5, 10.75, 11, 11.25, 11.5, 13,
        13.25, 13.5, 13.75, 13.25, 13, 14.25, 14.5, 14.5, 14.25, 12.5, 7, 4,
      ],
    },
    {
      label: 'Aprilia RS125 multiplied x10',
      effectiveMaxHp: '-',
      maxRpm: 11250,
      shiftRpm: 10750,
      torqueData: [
        30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 45, 50, 67.5, 70, 70, 67.5, 70, 70, 75, 67.5, 70, 77.5, 85, 107.5, 110,
        112.5, 115, 130, 132.5, 135, 137.5, 132.5, 130, 142.5, 145, 145, 142.5, 125, 70, 40,
      ],
    },
  ];
  carPresets: any[] = [
    {
      label: 'Viper fully-upgraded',
      weightKg: 1184,
      aeroCx: 0.35,
      rollingRes: 0.015,
      maximumAccG: 0.95,
    },
    {
      label: 'Viper base',
      weightKg: 1628,
      aeroCx: 0.35,
      rollingRes: 0.0125,
      maximumAccG: 0.775,
    },
    {
      label: 'Fiat OM 50',
      weightKg: 4900,
      aeroCx: 1.5,
      rollingRes: 0.03,
      maximumAccG: 0.6,
    },
    {
      label: 'Porsche GT3 cup 2009',
      weightKg: 1265,
      aeroCx: 2.04 * 0.4,
      rollingRes: 0.015,
      maximumAccG: 0.975,
    },
    {
      label: 'Bmw F31 320d',
      weightKg: 1500,
      aeroCx: 0.31,
      rollingRes: 0.013,
      maximumAccG: 0.9,
    },
  ];
  gearingPresets: any[] = [
    {
      name: 'Default',
      gearRatios: [2.66, 1.78, 1.3, 1.0, 0.74, 0.5],
      finalDrive: 3.07,
    },
    {
      name: 'VR 700 Dayton',
      gearRatios: [2.08, 1.48, 1.14, 0.92, 0.78, 0.72],
      finalDrive: 2.64,
    },
    {
      name: 'VR 700 Sunset Mesa',
      gearRatios: [1.88, 1.4, 1.1, 0.96, 0.86, 0.78],
      finalDrive: 3.1,
    },
    {
      name: 'Ibiza 1.6 75hp',
      gearRatios: [3.455, 1.955, 1.25, 0.891, 0.74, 0.5],
      finalDrive: 4,
    },
    {
      name: 'Rover 200vi',
      gearRatios: [3.167, 1.842, 1.308, 1.033, 0.765, 0.5],
      finalDrive: 4.2,
    },
    {
      name: 'Opel Astra 1.6',
      gearRatios: [3.4, 1.9, 1.2, 0.89, 0.7, 0.5],
      finalDrive: 3.74,
    },
    {
      name: 'Ibiza Cupra',
      gearRatios: [3.3, 1.944, 1.308, 1.029, 0.837, 0.5],
      finalDrive: 4,
    },
    {
      name: 'Fiat Croma jtd',
      gearRatios: [3.82, 2.05, 1.3, 0.96, 0.74, 0.61],
      finalDrive: 3.65,
    },
    {
      name: 'BMW 318d f31',
      gearRatios: [4.002, 2.109, 1.380, 1.000, 0.781, 0.645],
      finalDrive: 3.231,
    },
    {
      name: '911 GT3 2009',
      gearRatios: [3.16, 2.13, 1.72, 1.4, 1.13, 0.93],
      finalDrive: 4.0,
    },
  ];
  transmissionConstant: number = 0.1258;
  selectedEngineIndex: number = 0;
  selectedEngine: any = undefined;
  selectedBodyPresetIndex: number = 0;
  selectedBodyPreset: any = undefined;
  carSettingsWeightKg: number = -999;
  carSettingsAeroCx: number = -999;
  carSettingsRollingRes: number = -999;
  carSettingsMaximumAccelerationG: number = -999;
  optionsTestMode = [
    'oneGearRollingStart',
    'topspeedRun',
    'fixedMultipleGears',
    'allPossibleGears',
  ];
  selectedTestMode: any = this.optionsTestMode[0];
  selectedGearingPreset: any;
  selectedGearingPresetIndex: number = -999;
  buttonRunDisabled: boolean = false;
  powerChart = new Chart({
    title: {
      text: 'power curve'
    },
    series: [{
      type: 'area',
      name: 'power ps',
      data: []
    }]
  });
  torqueChart = new Chart({
    title: {
      text: 'torque curve'
    },
    series: [{
      type: 'area',
      name: 'torque Nm',
      data: []
    }]
  });

  constructor(private accelerationFunctionsService: AccelerationFunctionsService) {

  }
  ngOnInit(): void {
    this.selectedEngine = this.engines[0];
    this.selectedBodyPreset = this.carPresets[0];
    this.updateCarSettings();
  }

  onEngineClick(e: Event, index: number): void {
    this.selectedEngine = this.engines[index];
    this.selectedEngineIndex = index;
    this.fillTorqueLookupTable();
    // this.powerChart.removeSeries(0);
    // this.powerChart.addSeries([], false, false);
    // this.torqueChart.removeSeries(0);
    // this.torqueChart.addSeries([], false, false);

    let i = 0;
    const split = this.selectedEngine.maxRpm / (this.selectedEngine.powerLookupTable.length - 1);

    let append = () => {
      this.powerChart.addPoint([i * (split), this.selectedEngine.powerLookupTable[i]]);
      this.torqueChart.addPoint([i * (split), this.selectedEngine.torqueLookupTable[i]]);

      if (i <= this.selectedEngine.powerLookupTable.length) {
        i++;
        setTimeout(append, 50);
      }
    };
    append();
  };
  onCarBodyClick(e: Event, index: number): void {
    this.selectedBodyPreset = this.carPresets[index];
    this.selectedBodyPresetIndex = index;
    this.updateCarSettings();
  }

  onGearingPresetClick(index: number): void {
    this.selectedGearingPreset = this.gearingPresets[index];
    this.selectedGearingPresetIndex = index;
  }

  updateCarSettings() {
    this.carSettingsWeightKg = this.selectedBodyPreset.weightKg;
    this.carSettingsAeroCx = this.selectedBodyPreset.aeroCx;
    this.carSettingsRollingRes = this.selectedBodyPreset.rollingRes;
    this.carSettingsMaximumAccelerationG = this.selectedBodyPreset.maximumAccG;
  }

  calculatePower(speedMs: number, executionTime: number, _that: { divRpm: number; }, gearLength: number) {
    var currentRpm = null;
    var IDs: any = new Object();
    const clutchSlipStartTimeMs = 1299;

    if ((executionTime < clutchSlipStartTimeMs) && speedMs < 10) {
      IDs[0] = this.selectedEngine.powerLookupTable[Math.floor((this.selectedEngine.powerLookupTable.length * 1) / 2)];
      IDs[1] = (this.selectedEngine.maxRpm * 2) / 3;
      return IDs;
    } else {
      currentRpm = (speedMs / gearLength) * 3.6 * this.selectedEngine.maxRpm;
      // console.log(' current rpm: ', Math.round(currentRpm/50)*50, ' power: ', Math.round(_that.powerLookupTable[Math.floor(currentRpm / _that.divRpm)]), ' kW');
      /* HARDCODED */
      var res = this.selectedEngine.powerLookupTable[Math.floor(currentRpm / _that.divRpm)];
      IDs[0] = res;
      IDs[1] = Math.round(currentRpm / 50) * 50;
      if (isNaN(res)) {
        res = 0;
        IDs[0] = 0;
        /* hitting rev limiter */
      }
      return IDs;
    }
  };

  fillTorqueLookupTable() {
    const en = this.selectedEngine.torqueData;
    const difference = this.selectedEngine.maxRpm / (en.length - 1);

    let torStep = [],
      torqueLookupTable = [],
      rpmLookupTable = [],
      tmpPowerLookupTable = [],
      maxKw = 0,
      maxKwAtRpm = 0;

    for (let i = 0; i <= en.length; i++) {
      torStep.push(i * this.selectedEngine.maxRpm / (en.length - 1));
    }
    for (let currentRpm = 0; currentRpm <= this.selectedEngine.maxRpm; currentRpm += this.divRpm) {
      let i = 0,
        exitN = 83;
      while (currentRpm > torStep[i] && i < exitN) {
        i++;
      }
      let result = ((torStep[i] - currentRpm) / difference) * en[i - 1];
      result += ((currentRpm - torStep[i - 1]) / difference) * en[i];
      torqueLookupTable.push(result);
      let tmp = (result) * currentRpm / 7030;
      tmpPowerLookupTable.push(tmp);
      if (tmp > maxKw) {
        maxKw = tmp;
        maxKwAtRpm = currentRpm;
      }
      rpmLookupTable.push(currentRpm);
    }
    this.selectedEngine.torqueLookupTable = torqueLookupTable;
    this.selectedEngine.powerLookupTable = tmpPowerLookupTable;
    this.selectedEngine.effectiveMaxHp = '(' + Math.round(maxKw) + "hp@" + maxKwAtRpm + "rpm)";
  }

  onRun(): Promise<string> {
    return new Promise((resolve) => {
      this.buttonRunDisabled = true;

      if (this.selectedTestMode === 'oneGearRollingStart') {
        for (let i = 0; i < this.splits; i++) {
          const currentGearLength = this.finalGearMin + (i / (this.splits - 1)) * (this.finalGearMax - this.finalGearMin);
          this.runTestModeOneGearRolling(currentGearLength, false);
        }
      }
      if (this.selectedTestMode === 'topspeedRun') {
        for (let i = 0; i < this.splits; i++) {
          const currentGearLength = this.finalGearMin + (i / (this.splits - 1)) * (this.finalGearMax - this.finalGearMin);
          this.runTestModeOneGearRolling(currentGearLength, true);
        }
      }
      if (this.selectedTestMode === 'fixedMultipleGears') {

      }
      if (this.selectedTestMode === 'allPossibleGears') {
        // const gear_0 = [3.6, 3.2, 2.8, 2.6, 2.4, 2.2];
        // const gear_1 = [2.8, 2.6, 2.4, 2.2, 2.0, 1.8, 1.7];
        // const gear_2 = [2.2, 1.9, 1.8, 1.7, 1.6, 1.5, 1.4];
        // const gear_3 = [1.6, 1.5, 1.4, 1.3, 1.2, 1.1];
        // const gear_4 = [1.1, 1.0, 0.9, 0.8, 0.72, 0.64, 0.56];
        // const gear_5 = [0.8, 0.72, 0.65, 0.58, 0.52];
        // const gear_0 = [4.0, 3.6, 3.2, 2.8, 2.4, 2.0];
        // const gear_1 = [2.8, 2.6, 2.4, 2.2, 2.0, 1.8, 1.7];
        // const gear_2 = [2.2, 1.9, 1.8, 1.7, 1.6, 1.5, 1.4];
        // const gear_3 = [1.6, 1.5, 1.4, 1.3, 1.2, 1.1];
        // const gear_4 = [1.1, 1.0, 0.9, 0.8, 0.72, 0.64, 0.56];
        // const gear_5 = [0.8, 0.72, 0.65, 0.58, 0.54, 0.50];
        // const gear_0 = [3.8, 3.7, 3.6, 3.5, 3.4];
        // const gear_1 = [2.8, 2.7, 2.6, 2.5, 2.4];
        // const gear_2 = [1.86, 1.78, 1.7, 1.62, 1.54];
        // const gear_3 = [1.36, 1.28, 1.2, 1.12, 1.04];
        // const gear_4 = [0.98, 0.94, 0.9, 0.86, 0.82];
        // const gear_5 = [0.76, 0.74, 0.72, 0.70, 0.68];

        // rough estimate
        const gear_0 = [4, 3.3, 2.6, 2.3];
        const gear_1 = [2.8, 2.5, 2.2, 2.0, 1.7, 1.5, 1.3];
        const gear_2 = [2.2, 1.8, 1.5, 1.3];
        const gear_3 = [1.6, 1.4, 1.2, 1.04];
        const gear_4 = [1.3, 1.1, 0.9, 0.74, 0.68];
        const gear_5 = [0.8, 0.66, 0.56, 0.52, 0.50, 0.48];
        // 20.000 runs, 17 sekund za 10 ms, 9 MB
        // 20.000 runs, 3 sekunde za 50 ms

        let total = 0;
        let results: any[] = [];

        for (let i = 0; i < gear_0.length; i++) {
          for (let j = 0; j < gear_1.length; j++) {
            if (gear_0[i] <= gear_1[j]) continue;
            for (let k = 0; k < gear_2.length; k++) {
              if (gear_1[j] <= gear_2[k]) continue;
              for (let l = 0; l < gear_3.length; l++) {
                if (gear_2[k] <= gear_3[l]) continue;
                for (let m = 0; m < gear_4.length; m++) {
                  if (gear_3[l] <= gear_4[m]) continue;
                  for (let n = 0; n < gear_5.length; n++) {
                    if (gear_4[m] <= gear_5[n]) continue;

                    total++;
                    const tmp = [gear_0[i], gear_1[j], gear_2[k], gear_3[l], gear_4[m], gear_5[n]];
                    const res = (this.runWithGearShifting(tmp, 3.94));
                    results.push(res);
                  }
                }
              }
            }
          }
        }
        results.sort((a, b) => {
          if (a.executionTime > b.executionTime) {
            return 1;
          } else if (a.executionTime < b.executionTime) {
            return -1;
          } else {
            if (a.speedKmh < b.speedKmh) {
              return 1;
            } else if (a.speedKmh > b.speedKmh) {
              return -1;
            } else {
              return (a.lastRpm < b.lastRpm ? 1 : -1);
            }
          }
        });
        console.table(results);
        console.log('best result: ', results[0]);
        console.log("total: ", total);
        this.buttonRunDisabled = false;
      }
    });
  }

  runTestModeOneGearRolling(currentGearLength: number, isTopspeedRun: boolean) {
    var acceleration, power;
    var traveledDistance = 0;
    let maximumDistance = 1609;
    var executionTime = 0;
    var speedGain = 1.0;
    var step_count = 0;
    var interval = false;
    var currentRpm;
    let speedGainThreshold;
    isTopspeedRun == true ? (speedGainThreshold = 0.0005) : (speedGainThreshold = -1);
    isTopspeedRun == true ? maximumDistance = 9999 : 1609;
    var currentSpeedMs = this.initialSpeedKmh / 3.6;
    var arrResult = [];

    while (traveledDistance < maximumDistance && executionTime < 180000 && speedGain > speedGainThreshold) {
      if (maximumDistance - 30 < traveledDistance && traveledDistance < maximumDistance + 100 && interval == false) {
        interval = true;
      }

      step_count++;
      executionTime = executionTime + this.calculate_interval_ms;
      let cp = this.calculatePower(currentSpeedMs, executionTime, this, currentGearLength);
      power = cp[0];
      currentRpm = cp[1];

      acceleration = this.accelerationFunctionsService.getAccelerationCalc(
        currentSpeedMs,
        power,
        this.carSettingsWeightKg,
        this.carSettingsAeroCx,
        this.carSettingsRollingRes,
        this.carSettingsMaximumAccelerationG,
      );
      speedGain = acceleration * this.calculate_interval_ms;
      currentSpeedMs += speedGain;
      traveledDistance = traveledDistance + ((currentSpeedMs + speedGain / 2) * this.calculate_interval_ms) / 1000;
      arrResult.push([Math.round(currentSpeedMs * 3.6), Math.floor(traveledDistance), executionTime / 1000, power, currentRpm]);
    }
    console.log('final speed: ', Math.round(currentSpeedMs * 3.6), 'km/h distance: ', Math.floor(traveledDistance), "m, exetime: ", executionTime / 1000 + 's');
    console.table(arrResult);

    this.buttonRunDisabled = false;
  }

  runWithGearShifting(gearRatios: any, gearFinal: any) {
    var acceleration, brakeforce, pushforce, netforce, inertia, power;
    var distance = 0;
    var executionTime = 0;
    var speedGain = 1.0;
    var interval = false;
    var currentRpm;
    let threshold = -1;
    var currentSpeedMs = 0;
    var arrResult: never[] = [];
    let currentGearing: any[] = [];
    let gearLength: any[] = [];
    let lastRpm = 0;
    let currentGearIndex = 0;
    let step_count = 0;

    for (let i = 0; i < gearRatios.length; i++) {
      gearLength.push((this.transmissionConstant * this.selectedEngine.maxRpm) / gearRatios[i] / this.finalDrive);
      currentGearing.push(gearRatios[i]);
    }

    speedGain = this.carSettingsMaximumAccelerationG * 0.9; //wheelspin na začetku pospeševanja, prve 3 desetinke

    // while( distance < 1609 && executionTime < 60000 && speedGain > 0.0005)
    while (distance < 1609 && executionTime < 180000 && speedGain > threshold) {
      if (1609 - 30 < distance && distance < 1609 + 100 && interval == false) {
        //to pazi kako postaviš
        /* this is for slowing down calculation when it approaches 1600m mark */
        interval = true;
      }

      step_count++;
      executionTime = executionTime + this.calculate_interval_ms;

      let cp = this.calculatePower(currentSpeedMs, executionTime, this, gearLength[currentGearIndex]);
      power = cp[0];
      currentRpm = cp[1];
      lastRpm = currentRpm;

      if (currentRpm > this.selectedEngine.shiftRpm && currentGearIndex + 1 < gearLength.length)
        currentGearIndex++;

      acceleration = this.accelerationFunctionsService.getAccelerationCalc(
        currentSpeedMs,
        power,
        this.carSettingsWeightKg,
        this.carSettingsAeroCx,
        this.carSettingsRollingRes,
        this.carSettingsMaximumAccelerationG,
      );
      speedGain = acceleration * this.calculate_interval_ms;
      currentSpeedMs += speedGain;
      distance = distance + ((currentSpeedMs + speedGain / 2) * this.calculate_interval_ms) / 1000;
    }
    return {
      "executionTime": executionTime,
      "speedKmh": Math.round(currentSpeedMs * 3.6),
      "currentGearIndex + 1:": currentGearIndex + 1,
      "lastRpm": lastRpm,
      "currentGearing": currentGearing
    };
  }
}