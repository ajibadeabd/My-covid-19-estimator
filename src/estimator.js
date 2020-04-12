const covid19ImpactEstimator = () => {
  const input = {
    region: {
      name: 'africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 4,
      avgDailyIncomepopulation: 0.73,
    },
    periodType: 'days',
    timeToElapse: 38,
    reportedCases: 2747,
    population: 92931687,
    totalHospitalBeds: 678874,
  };

  const estimator = {
    impact: {},
    severeImpact: {},
  };
  const date = (periodType, timeToElapse) => {
    let answer = periodType;
    if (periodType === 'days') {
      answer = timeToElapse;
    }
    if (periodType === 'weeks') {
      answer = timeToElapse * 7;
    }
    if (periodType === 'months') {
      answer = timeToElapse * 7 * 30;
    }
    return answer;
  };
  // challenge one
  estimator.impact.currentlyInfected = input.reportedCases * 10;
  estimator.severeImpact.currentlyInfected = input.reportedCases * 50;
  estimator.impact.infectionByRequestedTime = estimator.impact.currentlyInfected
   * (2 ** date(input.periodType, Math.trunc(input.timeToElapse / 3)));
  estimator.severeImpact.infectionByRequestedTime = estimator.severeImpact.currentlyInfected
   * (2 ** date(input.periodType, Math.trunc(input.timeToElapse / 3)));
  // // challenge two
  estimator.impact.severeCasesByRequestedTime = Math.trunc(estimator.impact.infectionByRequestedTime
     * (15 / 100));
  estimator.severeImpact.severeCasesByRequestedTime = Math.trunc(estimator
    .severeImpact.infectionByRequestedTime * (15 / 100));
  estimator.impact.hospitalBedsByReqquestedTime = Math.trunc((input.totalHospitalBeds
     * (35 / 100)) - estimator.impact.severeCasesByRequestedTime);
  estimator.severeImpact.hospitalBedsByReqquestedTime = Math.trunc((input.totalHospitalBeds
     * (35 / 100)) - estimator.severeImpact.severeCasesByRequestedTime);
  // challenge three
  estimator.impact.casesForICUByRequestedTime = Math.trunc(estimator.impact.infectionByRequestedTime
     * (5 / 100));
  estimator.severeImpact.casesForICUByRequestedTime = Math.trunc(estimator.severeImpact
    .infectionByRequestedTime * (5 / 100));
  estimator.impact.casesForVentilatorsByRequestedTime = Math.trunc(estimator
    .impact.infectionByRequestedTime * (2 / 100));
  estimator.severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(estimator
    .severeImpact.infectionByRequestedTime * (2 / 100));
  estimator.impact.dollarInFlight = Math.trunc((estimator.impact.infectionByRequestedTime
     * input.region.avgDailyIncomeInUSD * input.region.avgDailyIncomepopulation)
      / date(input.periodType, input.timeToElapse));
  estimator.severeImpact.dollarInFlight = Math.trunc((estimator
    .severeImpact.infectionByRequestedTime
     * input.region.avgDailyIncomeInUSD * input.region.avgDailyIncomepopulation)
      / date(input.periodType, input.timeToElapse));

  return {
    data: { ...input },
    impact: estimator.impact,
    SevereImpact: estimator.severeImpact,
  };
};

export default covid19ImpactEstimator;
