import React, { useState } from 'react';
import { isCourseSelected, hasScheduleConflict, toggle } from '../utilities/courseUtils';
import { getCourseTerm, getCourseNumber } from '../utilities/courseUtils';
import { useUserState } from '../utilities/firebase';
import EditCourseModal from './EditCourseModal';

const Course = ({ course, selected, setSelected }) => {

  const [user] = useUserState();
  const [editingCourse, setEditingCourse] = useState(null);

  const isSelected = isCourseSelected(course, selected);
  const hasConflictWithOthers = hasScheduleConflict(course, selected);
  const isDisabled = !isSelected && hasConflictWithOthers;

  const style = {
    backgroundColor: isDisabled
      ? 'lightgrey'
      : isSelected
      ? 'lightgreen'
      : 'white'
  };

  return (
    <>
      <div
        className="card m-2 p-2"
        style={style}
        onClick={
          isDisabled
            ? null
            : () => setSelected(toggle(course, selected))
        }
        onDoubleClick={() => {
          if (!user) return;
          setEditingCourse(course);
        }}
      >
        <div className="card-body">
          <div className="card-title">
            {getCourseTerm(course)} CS {getCourseNumber(course)}
          </div>
          <div className="card-text">{course.title}</div>
          <div className="card-text">{course.meets}</div>
        </div>
      </div>

      {editingCourse && (
        <EditCourseModal
          course={editingCourse}
          onClose={() => setEditingCourse(null)}
          onSave={(updatedCourse) => {
            console.log("Curso actualizado:", updatedCourse);
          }}
        />
      )}
    </>
  );
};

export default Course;