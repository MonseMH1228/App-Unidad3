import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Banner from './Banner';
import CourseList from './CourseList';
import {fetchSchedule} from '../utilities/scheduleUtils';

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

export default Main;