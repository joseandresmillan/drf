import {
  BLOG_LOADING, BLOG_LIST_SUCCESS, BLOG_DETAIL_SUCCESS,
  BLOG_CREATE_SUCCESS, BLOG_UPDATE_SUCCESS, BLOG_DELETE_SUCCESS, BLOG_ERROR,
} from './types';
import { apiGet, apiPost, apiPut, apiDelete } from '../../utils/api';

export const fetchBlogs = () => async (dispatch) => {
  dispatch({ type: BLOG_LOADING });
  try {
    const res = await apiGet('/api/blog/');
    const data = await res.json();
    dispatch({ type: BLOG_LIST_SUCCESS, payload: data });
  } catch {
    dispatch({ type: BLOG_ERROR });
  }
};

export const fetchBlogDetail = (id) => async (dispatch) => {
  dispatch({ type: BLOG_LOADING });
  try {
    const res = await apiGet(`/api/blog/${id}/`);
    const data = await res.json();
    dispatch({ type: BLOG_DETAIL_SUCCESS, payload: data });
  } catch {
    dispatch({ type: BLOG_ERROR });
  }
};

export const createBlog = (blogData) => async (dispatch) => {
  dispatch({ type: BLOG_LOADING });
  try {
    const res = await apiPost('/api/blog/', blogData);
    const data = await res.json();
    if (res.ok) {
      dispatch({ type: BLOG_CREATE_SUCCESS, payload: data });
      return { success: true, data };
    }
    dispatch({ type: BLOG_ERROR, payload: data });
    return { success: false, errors: data };
  } catch {
    dispatch({ type: BLOG_ERROR });
    return { success: false };
  }
};

export const updateBlog = (id, blogData) => async (dispatch) => {
  dispatch({ type: BLOG_LOADING });
  try {
    const res = await apiPut(`/api/blog/${id}/`, blogData);
    const data = await res.json();
    if (res.ok) {
      dispatch({ type: BLOG_UPDATE_SUCCESS, payload: data });
      return { success: true, data };
    }
    dispatch({ type: BLOG_ERROR, payload: data });
    return { success: false, errors: data };
  } catch {
    dispatch({ type: BLOG_ERROR });
    return { success: false };
  }
};

export const deleteBlog = (id) => async (dispatch) => {
  try {
    const res = await apiDelete(`/api/blog/${id}/`);
    if (res.ok) {
      dispatch({ type: BLOG_DELETE_SUCCESS, payload: id });
      return { success: true };
    }
    return { success: false };
  } catch {
    dispatch({ type: BLOG_ERROR });
    return { success: false };
  }
};
