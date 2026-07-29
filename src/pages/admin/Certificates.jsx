import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import SearchInput from "../../components/ui/SearchInput";
import DataTable from "../../components/ui/DataTable";
import Pagination from "../../components/ui/Pagination";

import CertificateRow from "../../components/certificate/table/CertificateRow";
import CertificateModal from "../../components/certificate/modal/CertificateModal";

import certificateService from "../../services/certificateService";
import DeleteModal from "../../components/ui/DeleteModal";

const columns = [
  {
    key: "image",
    title: "Certificate",
    className: "col-span-2",
  },
  {
    key: "title",
    title: "Title",
    className: "col-span-3",
  },
  {
    key: "issuer",
    title: "Issuer",
    className: "col-span-2",
  },
  {
    key: "issueDate",
    title: "Issue Date",
    className: "col-span-2",
  },
  {
    key: "featured",
    title: "Featured",
    className: "col-span-1",
  },
  {
    key: "actions",
    title: "Actions",
    className: "col-span-2 text-right",
  },
];

const ITEMS_PER_PAGE = 8;

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadCertificates = async () => {
    try {
      setLoading(true);

      const res = await certificateService.getCertificates();

      setCertificates(res.certificates || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  const filteredCertificates = useMemo(() => {
    const keyword = search.toLowerCase();

    return certificates.filter(
      (certificate) =>
        certificate.title?.toLowerCase().includes(keyword) ||
        certificate.issuer?.toLowerCase().includes(keyword) ||
        certificate.credentialId?.toLowerCase().includes(keyword),
    );
  }, [certificates, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCertificates.length / ITEMS_PER_PAGE),
  );

  const paginatedCertificates = filteredCertificates.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    setPage(1);
  }, [search]);

  const handleAdd = () => {
    setSelectedCertificate(null);
    setModalOpen(true);
  };

  const handleEdit = (certificate) => {
    setSelectedCertificate(certificate);
    setModalOpen(true);
  };

  const handleDelete = (certificate) => {
    setSelectedCertificate(certificate);
    setDeleteOpen(true);
  };
  const confirmDelete = async () => {
    try {
      setDeleting(true);

      await certificateService.deleteCertificate(selectedCertificate._id);

      await loadCertificates();

      setDeleteOpen(false);
      setSelectedCertificate(null);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Certificates"
        subtitle="Manage certificates and achievements."
        buttonText="Add Certificate"
        buttonIcon={Plus}
        onButtonClick={handleAdd}
      />

      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClear={() => setSearch("")}
        placeholder="Search certificates..."
      />

      <DataTable
        columns={columns}
        data={paginatedCertificates}
        loading={loading}
        emptyTitle="No Certificates Found"
        emptyDescription="Create your first certificate."
        renderRow={(certificate) => (
          <CertificateRow
            key={certificate._id}
            certificate={certificate}
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

      <CertificateModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedCertificate(null);
        }}
        refresh={loadCertificates}
        certificate={selectedCertificate}
      />

      <DeleteModal
        open={deleteOpen}
        loading={deleting}
        title="Delete Certificate"
        message={`Delete "${selectedCertificate?.title}"?`}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedCertificate(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Certificates;
