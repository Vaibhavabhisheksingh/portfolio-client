import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import SearchInput from "../../components/ui/SearchInput";
import DataTable from "../../components/ui/DataTable";
import Pagination from "../../components/ui/Pagination";

import SocialRow from "../../components/social/table/SocialRow";
import SocialModal from "../../components/social/modal/SocialModal";

import socialService from "../../services/socialService";
import DeleteModal from "../../components/ui/DeleteModal";

const columns = [
  {
    key: "platform",
    title: "Platform",
    className: "col-span-2",
  },
  {
    key: "username",
    title: "Username",
    className: "col-span-3",
  },
  {
    key: "url",
    title: "URL",
    className: "col-span-3",
  },
  {
    key: "featured",
    title: "Featured",
    className: "col-span-2",
  },
  {
    key: "actions",
    title: "Actions",
    className: "col-span-2 text-right",
  },
];

const Socials = () => {
  const [socials, setSocials] = useState([]);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
   const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedSocial, setSelectedSocial] = useState(null);
  const [deleting, setDeleting] = useState(false);


  const loadSocials = async () => {
    try {
      const res = await socialService.getSocials();

      setSocials(res.socials || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadSocials();
  }, []);

  const filteredSocials = socials.filter((social) => {
    const keyword = search.toLowerCase();

    return (
      social.platform?.toLowerCase().includes(keyword) ||
      social.username?.toLowerCase().includes(keyword) ||
      social.url?.toLowerCase().includes(keyword)
    );
  });

  const handleAdd = () => {
    setSelectedSocial(null);
    setModalOpen(true);
  };

  const handleEdit = (social) => {
    setSelectedSocial(social);
    setModalOpen(true);
  };

  const handleDelete = (social) => {
      setSelectedSocial(social);
      setDeleteOpen(true);
    };
    const confirmDelete = async () => {
      try {
        setDeleting(true);
  
        await socialService.deleteSocial(selectedSocial._id);
  
        await loadSocials();
  
        setDeleteOpen(false);
        setSelectedSocial(null);
      } catch (err) {
        console.error(err);
      } finally {
        setDeleting(false);
      }
    };

  return (
    <div className="space-y-8">

      <PageHeader
        title="Social Links"
        subtitle="Manage all your social profiles."
        buttonText="Add Social"
        buttonIcon={Plus}
        onButtonClick={handleAdd}
      />

      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClear={() => setSearch("")}
        placeholder="Search social links..."
      />

      <DataTable
        columns={columns}
        data={filteredSocials}
        renderRow={(social) => (
          <SocialRow
            key={social._id}
            social={social}
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

      <SocialModal
        open={modalOpen}
        social={selectedSocial}
        refresh={loadSocials}
        onClose={() => {
          setModalOpen(false);
          setSelectedSocial(null);
        }}
      />

        <DeleteModal
        open={deleteOpen}
        loading={deleting}
        title="Delete Social"
        message={`Delete "${selectedSocial?.platform}"?`}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedSocial(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Socials;