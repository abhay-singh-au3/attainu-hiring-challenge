import { fetchLead } from '../api/randomuser';


function studentReducer(students = [], action) {
    if (action.type === "GET_LEAD") {
        fetchLead();
    }
    if (action.type === "LEAD_LOADED") {
        students = [...students, action.data]
        console.log(students);
    }
    if(action.type === "CONVERTED") {
        console.log(students);
        const newData = students.map(obj => {
            if(obj[0].email === action.email) {
                obj[1].converted = true;
            }
            return obj
        })
        students = newData;
    }
    return students;
}

export default studentReducer;