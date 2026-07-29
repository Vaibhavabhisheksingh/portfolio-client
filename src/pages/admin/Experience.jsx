import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import SearchInput from "../../components/ui/SearchInput";
import DataTable from "../../components/ui/DataTable";
import Pagination from "../../components/ui/Pagination";

import ExperienceRow from "../../components/experience/table/ExperienceRow";
import ExperienceModal from "../../components/experience/modal/ExperienceModal";

import experienceService from "../../services/experienceService";
import DeleteModal from "../../components/ui/DeleteModal";

const columns = [
  {
    key: "logo",
    title: "Logo",
    className: "col-span-2",
  },
  {
    key: "company",
    title: "Company",
    className: "col-span-3",
  },
  {
    key: "role",
    title: "Role",
    className: "col-span-3",
  },
  {
    key: "duration",
    title: "Duration",
    className: "col-span-2",
  },
  {
    key: "actions",
    title: "Actions",
    className: "col-span-2 text-right",
  },
];

const ITEMS_PER_PAGE = 8;

const Experience = () => {
  const [experiences, setExperiences] = useState([]);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);

  //const [selectedExperience, setSelectedExperience] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedExperience, setSelectedExperience] = useState(null);

  const [deleting, setDeleting] = useState(false);

  const loadExperiences = async () => {
    try {
      setLoading(true);

      const res = await experienceService.getExperiences();

      setExperiences(res.experiences || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const filteredExperiences = useMemo(() => {
    return experiences.filter((experience) => {
      const keyword = search.toLowerCase();

      return (
        experience.company?.toLowerCase().includes(keyword) ||
        experience.jobTitle?.toLowerCase().includes(keyword) ||
        experience.location?.toLowerCase().includes(keyword)
      );
    });
  }, [experiences, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredExperiences.length / ITEMS_PER_PAGE),
  );

  const paginatedData = filteredExperiences.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    setPage(1);
  }, [search]);

  const handleAdd = () => {
    setSelectedExperience(null);
    setModalOpen(true);
  };

  const handleEdit = (experience) => {
    setSelectedExperience(experience);
    setModalOpen(true);
  };

  const handleDelete = (experience) => {
    setSelectedExperience(experience);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleting(true);

      await experienceService.deleteExperience(selectedExperience._id);

      await loadExperiences();

      setDeleteOpen(false);
      setSelectedExperience(null);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Experience"
        subtitle="Manage your professional experience."
        buttonText="Add Experience"
        buttonIcon={Plus}
        onButtonClick={handleAdd}
      />

      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClear={() => setSearch("")}
        placeholder="Search company, role or location..."
      />

      <DataTable
        columns={columns}
        data={paginatedData}
        loading={loading}
        emptyTitle="No Experience Found"
        emptyDescription="Create your first work experience."
        renderRow={(experience) => (
          <ExperienceRow
            key={experience._id}
            experience={experience}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPrevious={() => setPage((prev) => Math.max(prev - 1, 1))}
        onNext={() => setPage((prev) => Math.min(prev + 1, totalPages))}
      />

      <ExperienceModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedExperience(null);
        }}
        refresh={loadExperiences}
        experience={selectedExperience}
      />
      <DeleteModal
        open={deleteOpen}
        loading={deleting}
        title="Delete Experience"
        message={`Delete "${selectedExperience?.company}"?`}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedExperience(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Experience;
