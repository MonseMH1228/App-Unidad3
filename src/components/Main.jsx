import Banner from './Banner.jsx';
import CourseList from './CourseList.jsx';
import { useData } from '../utilities/useData.js';
import { addScheduleTimes } from '../utilities/scheduleUtils.js';

const Main = () => {
  const { data, loading, error } = useData('/', addScheduleTimes);

  if (loading) return <h1>Loading the schedule...</h1>;
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