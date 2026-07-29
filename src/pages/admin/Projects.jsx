import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import SearchInput from "../../components/ui/SearchInput";
import DataTable from "../../components/ui/DataTable";
import Pagination from "../../components/ui/Pagination";
import DeleteModal from "../../components/ui/DeleteModal";

import ProjectRow from "../../components/projects/table/ProjectRow";
import ProjectModal from "../../components/projects/modal/ProjectModal";

import projectService from "../../services/projectService";

const columns = [
  {
    key: "image",
    title: "Image",
    className: "col-span-2",
  },
  {
    key: "title",
    title: "Title",
    className: "col-span-3",
  },
  {
    key: "stack",
    title: "Tech Stack",
    className: "col-span-3",
  },
  {
    key: "status",
    title: "Status",
    className: "col-span-2",
  },
  {
    key: "actions",
    title: "Actions",
    className: "col-span-2 text-right",
  },
];

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [projectToDelete, setProjectToDelete] = useState(null);

  const [deleting, setDeleting] = useState(false);

  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);

      const res = await projectService.getProjects();

      setProjects(res.projects || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) =>
      project.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [projects, search]);

  const handleAdd = () => {
    setSelectedProject(null);
    setModalOpen(true);
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  const handleDelete = (project) => {
    setProjectToDelete(project);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;

    try {
      setDeleting(true);

      await projectService.deleteProject(projectToDelete._id);

      await loadProjects();

      setDeleteOpen(false);
      setProjectToDelete(null);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-8">

      <PageHeader
        title="Projects"
        subtitle="Manage all portfolio projects."
        buttonText="Add Project"
        buttonIcon={Plus}
        onButtonClick={handleAdd}
      />

      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClear={() => setSearch("")}
        placeholder="Search projects..."
      />

      <DataTable
        loading={loading}
        columns={columns}
        data={filteredProjects}
        emptyMessage="No projects found."
        renderRow={(project) => (
          <ProjectRow
            key={project._id}
            project={project}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      />

      <Pagination
        page={page}
        totalPages={1}
        onPrevious={() => {}}
        onNext={() => {}}
      />

      <ProjectModal
        open={modalOpen}
        onClose={handleCloseModal}
        refresh={loadProjects}
        project={selectedProject}
      />

      <DeleteModal
        open={deleteOpen}
        loading={deleting}
        title="Delete Project"
        description={`Are you sure you want to delete "${projectToDelete?.title}"?`}
        onClose={() => {
          setDeleteOpen(false);
          setProjectToDelete(null);
        }}
        onConfirm={confirmDelete}
      />

    </div>
  );
};

export default Projects;