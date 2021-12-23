import axios from "../utils/axios";

const getProjects = () => axios.get(`/projects`);
const createProject = (data) => axios.post(`/project`, data);
const deleteProject = (id) => axios.delete(`/project/${id}`);

export const projectService = {
    getProjects,
    createProject,
    deleteProject
}
