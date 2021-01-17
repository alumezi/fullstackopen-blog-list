import { create, getAll, update, removeBlog } from "../../services/blogs";

export const blogs = (state = [], action) => {
    switch(action.type){
        case "SET_BLOGS":
            return action.data;
        case "SET_BLOG":
            return state.concat(action.data);
        case "UPDATE_BLOG":
            return state.map(item => item.id === action.data.id ? action.data : item ) 
        case "DELETE_BLOG":
            return state.filter(item => item.id !== action.data)
        default:
            return state;
    }
}

export const setBlogs = () => {
    return async (dispatch, getState) => {
        const token = getState().userData.user.token;
        const data = await getAll(token);
        dispatch({
            type: "SET_BLOGS",
            data
        })
    }
}

export const createBlog = blog => {
    return async (dispatch, getState) => {
        const token = getState().userData.user.token;
        const data = await create(blog, token);
        dispatch({
            type: "SET_BLOG",
            data
        })
    }
}

export const updateBlog = newBlog => {
    return async (dispatch, getState) => {
        const token = getState().userData.user.token;
        const data = await update(newBlog, token);

        dispatch({
            type: "UPDATE_BLOG",
            data
        })
    }
}

export const deleteBlog = data => {
    return async (dispatch, getState) => {
        const token = getState().userData.user.token;
        await removeBlog(data, token);

        dispatch({
            type: "DELETE_BLOG",
            data
        })
    }
}