import { daysOverlap, hoursOverlap } from "./timeUtils";

export const terms = { F: 'Fall', W: 'Winter', S: 'Spring'};

export const getCourseTerm = course => (
  terms[course.id.charAt(0)]
);

export const getCourseNumber = course => (
  course.id.slice(1, 4)
);

export const timeConflict = (course1, course2) => (
  daysOverlap(course1.days, course2.days) && hoursOverlap(course1.hours, course2.hours)
);


export const courseConflict = (course1, course2) => (
  getCourseTerm(course1) === getCourseTerm(course2)
  && timeConflict(course1, course2)
);

export const isCourseSelected = (course, selected) => 
  selected.some(c => c.id === course.id);


export const hasScheduleConflict = (course, selected) => 
  selected.some(selection => 
    selection.id !== course.id && courseConflict(course, selection)
  );

export const toggle = (x, lst) => {
  const exists = lst.some(item => item.id === x.id);
  return exists 
    ? lst.filter(item => item.id !== x.id)
    : [x, ...lst];
};


export const hasConflict = (course, selected) => (
  selected.some(selection => 
    selection.id !== course.id && courseConflict(course, selection)
  )
);