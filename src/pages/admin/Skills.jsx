import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import SearchInput from "../../components/ui/SearchInput";
import DataTable from "../../components/ui/DataTable";
import Pagination from "../../components/ui/Pagination";
import DeleteModal from "../../components/ui/DeleteModal";

import SkillRow from "../../components/skills/table/SkillRow";
import SkillModal from "../../components/skills/modal/SkillModal";

import skillService from "../../services/skillService";

const columns = [
  {
    key: "icon",
    title: "Icon",
    className: "col-span-1",
  },
  {
    key: "name",
    title: "Skill",
    className: "col-span-3",
  },
  {
    key: "category",
    title: "Category",
    className: "col-span-3",
  },
  {
    key: "proficiency",
    title: "Proficiency",
    className: "col-span-3",
  },
  {
    key: "actions",
    title: "Actions",
    className: "col-span-2 text-right",
  },
];

const ITEMS_PER_PAGE = 8;

const Skills = () => {
  const [skills, setSkills] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedSkill, setSelectedSkill] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [deleteSkill, setDeleteSkill] = useState(null);

  const loadSkills = async () => {
    try {
      setLoading(true);

      const res = await skillService.getSkills();

      setSkills(res.skills || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) =>
      skill.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [skills, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSkills.length / ITEMS_PER_PAGE)
  );

  const paginatedSkills = filteredSkills.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleAdd = () => {
    setSelectedSkill(null);
    setModalOpen(true);
  };

  const handleEdit = (skill) => {
    setSelectedSkill(skill);
    setModalOpen(true);
  };

  const handleDelete = (skill) => {
    setDeleteSkill(skill);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await skillService.deleteSkill(deleteSkill._id);

      setDeleteOpen(false);

      loadSkills();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">

      <PageHeader
        title="Skills"
        subtitle="Manage your technical skills."
        buttonText="Add Skill"
        buttonIcon={Plus}
        onButtonClick={handleAdd}
      />

      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClear={() => setSearch("")}
        placeholder="Search skills..."
      />

      <DataTable
        loading={loading}
        columns={columns}
        data={paginatedSkills}
        emptyTitle="No Skills"
        emptyDescription="Start by adding your first skill."
        renderRow={(skill) => (
          <SkillRow
            key={skill._id}
            skill={skill}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPrevious={() =>
          setPage((prev) => Math.max(prev - 1, 1))
        }
        onNext={() =>
          setPage((prev) =>
            Math.min(prev + 1, totalPages)
          )
        }
      />

      <SkillModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedSkill(null);
        }}
        refresh={loadSkills}
        skill={selectedSkill}
      />

      <DeleteModal
        open={deleteOpen}
        title="Delete Skill"
        message={`Delete "${deleteSkill?.name}"?`}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
      />

    </div>
  );
};

export default Skills;