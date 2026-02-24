//import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import React, {useState} from 'react';


const Banner = props => (
  <h1>{props.title}</h1>
);

const isCourseSelected = (course, selected) => 
  selected.some(c => c.id === course.id);

const hasScheduleConflict = (course, selected) => 
  selected.some(selection => 
    selection.id !== course.id && courseConflict(course, selection)
  );



const Course = ({ course, selected, setSelected }) => {
//Revisa si se esta seleccionando un curso
const isSelected = isCourseSelected(course, selected);
const hasConflictWithOthers = hasScheduleConflict(course, selected);
const isDisabled = !isSelected && hasConflictWithOthers;

//inclucion de CSS, para modificaciones déspues de seleccionar
const style = {
  backgroundColor: isDisabled? 'lightgrey' 
  :isSelected ? 'lightgreen' : 'white'
};
  return(
  <div className="card m-2 p-2"
  //mandamos a llamar el estilo previamente declarado
  style={style}
  //mandamos a llamar el filtro al momento de dar un click
  onClick = {isDisabled ? null:()=> setSelected(toggle(course, selected))}>
    <div className="card-body">
      <div className="card-title">{ getCourseTerm(course) } CS { getCourseNumber(course) }</div>
      <div className="card-text">{ course.title }</div>
      <div className="card-text">{ course.meets }</div>
    </div>
  </div>
  );
};



const CourseList = ({ courses }) => {
  const [term, setTerm] = useState('Fall');
  const [selected, setSelected] = useState([]);
  //const termCourses = Object.values(courses).filter(course => term === getCourseTerm(course));
    const termCourses = Object.entries(courses)
    .map(([id, course]) => ({ ...course, id }))
    .filter(course => term === getCourseTerm(course));

  return (
    //Usada para no crear div's de más
    <>
      <TermSelector term={term} setTerm={setTerm}/>
      <div className="course-list">
      { termCourses.map(course => 
        <Course key={course.id} course={ course } 
        selected={selected} setSelected={ setSelected } />) }
      </div>
    </>
  );
};


//Creamos un filtro que nos de revise cuando se le da click a este elemento
// const toggle = (x, lst) => (
//   lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst]
// );



// const hasConflict = (course, selected) => (
//   selected.some(selection => courseConflict(course, selection))
// );
const toggle = (x, lst) => {
  const exists = lst.some(item => item.id === x.id);
  return exists 
    ? lst.filter(item => item.id !== x.id)
    : [x, ...lst];
};

const hasConflict = (course, selected) => (
  selected.some(selection => 
    selection.id !== course.id && courseConflict(course, selection)
  )
);


const days = ['M', 'Tu', 'W', 'Th', 'F'];

const daysOverlap = (days1, days2) => ( 
  days.some(day => days1.includes(day) && days2.includes(day))
);

const hoursOverlap = (hours1, hours2) => (
  Math.max(hours1.start, hours2.start) < Math.min(hours1.end, hours2.end)
);

const timeConflict = (course1, course2) => (
  daysOverlap(course1.days, course2.days) && hoursOverlap(course1.hours, course2.hours)
);

const courseConflict = (course1, course2) => (
  getCourseTerm(course1) === getCourseTerm(course2)
  && timeConflict(course1, course2)
);

//Expreciones regulares
const meetsPat = /^ *((?:M|Tu|W|Th|F)+) +(\d\d?):(\d\d) *[ -] *(\d\d?):(\d\d) *$/;

const timeParts = meets => {
  const [match, days, hh1, mm1, hh2, mm2] = meetsPat.exec(meets) || [];
  return !match ? {} : {
    days,
    hours: {
      start: hh1 * 60 + mm1 * 1,
      end: hh2 * 60 + mm2 * 1
    }
  };
};

//funciones que verifican el objeto
const mapValues = (fn, obj) => (
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, fn(value)]))
);

const addCourseTimes = course => ({
  ...course,
  ...timeParts(course.meets)
});

const addScheduleTimes = schedule => ({
  title: schedule.title,
  courses: mapValues(addCourseTimes, schedule.courses)
});

const terms = { F: 'Fall', W: 'Winter', S: 'Spring'};

const getCourseTerm = course => (
  terms[course.id.charAt(0)]
);

const getCourseNumber = course => (
  course.id.slice(1, 4)
);


const fetchSchedule = async () => {
  const url = '/data.json' ;
  const response = await fetch(url);
  if (!response.ok) throw response;
  return addScheduleTimes(await response.json());;
};



const TermButton = ({term, checked, setTerm}) => (
  <>
    <input type="radio" 
      id={term} 
      className="btn-check" 
      autoComplete="off"
      checked={checked} 
      onChange={() => setTerm(term)} />
    <label className="btn btn-success m-1 p-2" htmlFor={term}>
    { term }
    </label>
  </>
);

const TermSelector = ({term, setTerm}) => (
  <div className="btn-group">
  { 
    Object.values(terms).map(value => (
      <TermButton key={value} 
      term={value} 
      checked={value === term} 
      setTerm={setTerm}
      />
    ))
  }
  </div>
);
const Main = () =>  {
  const { data, isLoading, error } = useQuery({
    queryKey: ['schedule'],
    queryFn: fetchSchedule
  });

  if (isLoading) return <h1>Loading the schedule...</h1>;
  if (error) return <h1>Error loading schedule</h1>;
  if (!data) return null;

  return (
    <div className="container">
      <Banner title={data.title} />
      <CourseList courses={data.courses} />
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
);

export default App;

