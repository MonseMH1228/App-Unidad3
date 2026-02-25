import React from 'react';
import {isCourseSelected, hasScheduleConflict, toggle} from '../utilities/courseUtils';
import { getCourseTerm, getCourseNumber } from '../utilities/courseUtils';

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

export default Course;