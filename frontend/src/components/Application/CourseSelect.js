import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const CourseSelect = ({mergedCourses, equivalent, handleCourseEquivalentChange, courseIndex, index, handleCourseChange, hostCourses, approvedCourses}) => {
    const handleChange = e => {
        if(equivalent) {
            handleCourseEquivalentChange(e, index);
        } else {
            handleCourseChange(e, courseIndex, index);
        }
    };
    let value = '';
    if (mergedCourses) {
        if (mergedCourses[index]?.courses) {
            if(equivalent) {
                value = mergedCourses[index].equivalentCourse;
            } else {
                value = mergedCourses[index].courses[courseIndex];
            }
        } 
    } 
    let courses = [];
    if (equivalent) {
        courses = hostCourses;
    } else {
        courses = approvedCourses; 
    }

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{equivalent ? "Equivalent Course" : "Course"}</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value ? value : ''}
            label={equivalent ? "Equivalent Course" : "Course"}
            onChange={handleChange}
            >
                {courses.map(course => (<MenuItem key={course.id} value={course.id}>{course.courseName}</MenuItem>))}
            </Select>
        </FormControl>
    );
}; 

CourseSelect.propTypes = {
    mergedCourses: PropTypes.array,
    index: PropTypes.number,
    courseIndex: PropTypes.number,
    equivalent: PropTypes.bool,
    handleCourseChange: PropTypes.func,
    handleCourseEquivalentChange: PropTypes.func,
    hostCourses: PropTypes.array,
    approvedCourses: PropTypes.array,
};

export default CourseSelect;