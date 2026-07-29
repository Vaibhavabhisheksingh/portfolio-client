import api from "../api/axios";


const projectService = {


    getProjects: async()=>{

        const res =
            await api.get("/projects");

        return res.data;

    },


    createProject: async(data)=>{

        const res =
            await api.post(
                "/projects",
                data,
                {
                    headers:{
                        "Content-Type":
                        "multipart/form-data",
                    },
                }
            );

        return res.data;

    },


    updateProject: async(id,data)=>{

        const res =
            await api.put(
                `/projects/${id}`,
                data,
                {
                    headers:{
                        "Content-Type":
                        "multipart/form-data",
                    },
                }
            );

        return res.data;

    },


    deleteProject: async(id)=>{

        const res =
            await api.delete(
                `/projects/${id}`
            );

        return res.data;

    },


};


export default projectService;