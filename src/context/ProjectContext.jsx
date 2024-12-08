import React, { createContext, useContext, useState } from "react";
import api from "../services/apiservice";  // Make sure the API service is correctly set up

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch projects
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await api.get("admin/projects");
      setProjects(response.projects);  // Assuming response contains a 'projects' field
    } catch (err) {
      console.error("Error fetching projects:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new project
  const addProject = async (projectData) => {
    try {
      const response = await api.post("admin/add-project", projectData);
      setProjects((prevProjects) => [...prevProjects, response.project]);  // Add new project to state
    } catch (err) {
      console.error("Error adding project:", err.message);
      setError(err.message);
      throw err;
    }
  };

  // Update an existing project
  const updateProject = async (projectId, updatedData) => {
    try {
      const response = await api.put(`admin/update-project/${projectId}`, updatedData);
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === projectId ? response.project : project
        )
      );  // Replace updated project in state
    } catch (err) {
      console.error("Error updating project:", err.message);
      setError(err.message);
      throw err;
    }
  };

  // Delete a project
  const deleteProject = async (projectId) => {
    try {
      await api.remove(`admin/delete-project/${projectId}`);
      setProjects((prevProjects) => prevProjects.filter((project) => project._id !== projectId));  // Remove project from state
    } catch (err) {
      console.error("Error deleting project:", err.message);
      setError(err.message);
      throw err;
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        error,
        fetchProjects,
        addProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  return useContext(ProjectContext);
};
