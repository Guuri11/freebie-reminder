import moment from "moment";
import { Freebie } from "../db/repository/freebies";

export const calculateProgress = (subscription: Freebie) => {
  const startDate = moment(subscription.start_date, "DD-MM-YYYY");
  const endDate = moment(subscription.end_date, "DD-MM-YYYY");
  const currentDate = moment();

  const totalDays = endDate.diff(startDate, "days");

  const currentDays = currentDate.diff(startDate, "days");

  const progress = (currentDays / totalDays) * 100;

  return Math.round(progress);
};

export const timeLeft = (subscription: Freebie) => {
  const startDate = moment(subscription.start_date, "DD-MM-YYYY");
  const endDate = moment(subscription.remember_at, "DD-MM-YYYY");
  const currentDate = moment();

  const totalDays = endDate.diff(startDate, "days");

  const currentDays = currentDate.diff(startDate, "days");

  return (totalDays - currentDays) * 24 * 60 * 60;
};
