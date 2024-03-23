export const statusReducer = (state, action) => {
    switch (action.type) {
        case 'All':
            return { state: state = 'All' };
        case 'Completed':
            return { state: state = 'Completed' };
        case 'Overdue':
            return { state: state = 'Overdue' };
        case 'Upcoming':
            return { state: state = 'Upcoming' };
        default:
            return { state: state = 'All' };
    }
}

export const priorityReducer = (state, action) => {
    switch (action.type) {
        case 'All':
            return { state: state = 'All' };
        case 'High':
            return { state: state = 'High' };
        case 'Medium':
            return { state: state = 'Medium' };
        case 'Low':
            return { state: state = 'Low' };
        default:
            return { state: state = 'All' };
    }
}