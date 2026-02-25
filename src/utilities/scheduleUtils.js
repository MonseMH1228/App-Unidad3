import {timeParts} from './timeUtils';

//funciones que verifican el objeto
export const mapValues = (fn, obj) => (
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, fn(value)]))
);


export const addCourseTimes = course => ({
  ...course,
  ...timeParts(course.meets)
});

export const addScheduleTimes = schedule => ({
  title: schedule.title,
  courses: mapValues(addCourseTimes, schedule.courses)
});


export const fetchSchedule = async () => {
  const url = '/data.json' ;
  const response = await fetch(url);
  if (!response.ok) throw response;
  return addScheduleTimes(await response.json());;
};
