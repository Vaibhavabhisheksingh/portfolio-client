import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import SearchInput from "../../components/ui/SearchInput";
import DataTable from "../../components/ui/DataTable";
import Pagination from "../../components/ui/Pagination";

import EducationRow from "../../components/education/table/EducationRow";
import EducationModal from "../../components/education/modal/EducationModal";

import educationService from "../../services/educationService";
import DeleteModal from "../../components/ui/DeleteModal";

const columns = [
  {
    key: "logo",
    title: "Logo",
    className: "col-span-2",
  },
  {
    key: "institution",
    title: "Institution",
    className: "col-span-3",
  },
  {
    key: "degree",
    title: "Degree",
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

const Education = () => {

  const [educations, setEducations] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  const [modalOpen, setModalOpen] =
    useState(false);
const [deleteOpen, setDeleteOpen] = useState(false);


  const [deleting, setDeleting] = useState(false);
  const [
    selectedEducation,
    setSelectedEducation,
  ] = useState(null);

  const loadEducations = async () => {

    try {

      setLoading(true);

      const res =
        await educationService.getEducations();

      setEducations(
        res.educations || []
      );

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadEducations();

  }, []);

  const filteredEducations =
    useMemo(() => {

      const keyword =
        search.toLowerCase();

      return educations.filter(
        (education) =>
          education.institution
            ?.toLowerCase()
            .includes(keyword) ||

          education.degree
            ?.toLowerCase()
            .includes(keyword) ||

          education.fieldOfStudy
            ?.toLowerCase()
            .includes(keyword)
      );

    }, [educations, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredEducations.length /
        ITEMS_PER_PAGE
    )
  );

  const paginatedData =
    filteredEducations.slice(
      (page - 1) *
        ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE
    );

  useEffect(() => {

    setPage(1);

  }, [search]);

  const handleAdd = () => {

    setSelectedEducation(null);

    setModalOpen(true);

  };

  const handleEdit = (
    education
  ) => {

    setSelectedEducation(
      education
    );

    setModalOpen(true);

  };

  const handleDelete = (
    education
  ) => {

    setSelectedEducation(
      education
    );

    setDeleteOpen(true);

  };
  const confirmDelete = async () => {
    try {
      setDeleting(true);

      await educationService.deleteEducation(selectedEducation._id);

      await loadEducations();

      setDeleteOpen(false);
      setSelectedEducation(null);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  return (

    <div className="space-y-8">

      <PageHeader
        title="Education"
        subtitle="Manage your education history."
        buttonText="Add Education"
        buttonIcon={Plus}
        onButtonClick={handleAdd}
      />

      <SearchInput
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        onClear={() =>
          setSearch("")
        }
        placeholder="Search institution, degree or field..."
      />

      <DataTable
        columns={columns}
        data={paginatedData}
        loading={loading}
        emptyTitle="No Education Found"
        emptyDescription="Create your first education record."
        renderRow={(
          education
        ) => (
          <EducationRow
            key={education._id}
            education={
              education
            }
            onEdit={
              handleEdit
            }
            onDelete={
              handleDelete
            }
          />
        )}
      />

      <Pagination
        page={page}
        totalPages={
          totalPages
        }
        onPrevious={() =>
          setPage((prev) =>
            Math.max(
              prev - 1,
              1
            )
          )
        }
        onNext={() =>
          setPage((prev) =>
            Math.min(
              prev + 1,
              totalPages
            )
          )
        }
      />

      <EducationModal
        open={modalOpen}
        onClose={() => {

          setModalOpen(
            false
          );

          setSelectedEducation(
            null
          );

        }}
        refresh={
          loadEducations
        }
        education={
          selectedEducation
        }
      />
      <DeleteModal
        open={deleteOpen}
        loading={deleting}
        title="Delete Education"
        message={`Delete "${selectedEducation?.institution}"?`}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedEducation(null);
        }}
        onConfirm={confirmDelete}
      />

    </div>

  );

};

export default Education;