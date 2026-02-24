//import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import React, {useState} from 'react';


const Banner = props => (
  <h1>{props.title}</h1>
);


const Course = ({ course }) => (
  <div className="card m-2 p-2">
    <div className="card-body">
      <div className="card-title">{ getCourseTerm(course) } CS { getCourseNumber(course) }</div>
      <div className="card-text">{ course.title }</div>
    </div>
  </div>
);

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
  return await response.json();
};


// const CourseList = ({ courses }) => (
//   <div className="course-list">
//   { Object.values(courses).map(course => <Course key={course.id} course={ course } />) }
//   </div>
// );
const CourseList = ({ courses }) => {
  const [term, setTerm] = useState('Fall');
  //const termCourses = Object.values(courses).filter(course => term === getCourseTerm(course));
    const termCourses = Object.entries(courses)
    .map(([id, course]) => ({ ...course, id }))
    .filter(course => term === getCourseTerm(course));
    
  return (
    //Usada para no crear div's de más
    <>
      <TermSelector term={term} setTerm={setTerm}/>
      <div className="course-list">
      { termCourses.map(course => <Course key={course.id} course={ course } />) }
      </div>
    </>
  );
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

