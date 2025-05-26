import { useState, useEffect } from "react";
import axios from "axios";

type CVMeta = {
  cv_id: string;
  filename: string;
  candidate_name?: string | null;
  email?: string | null;
  phone?: string | null;
  country?: string | null;
  birth_date?: string | null;
  position_applied?: string | null;
  uploaded_at: string;
  status: string;
};

const API_URL = import.meta.env.VITE_API_URL as string;

export function useMetaTableData() {
  const [meta, setMeta] = useState<CVMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);

  async function fetchData() {
    setLoading(true);
    const token = localStorage.getItem('access_token');
    try {
      const res = await axios.get(`${API_URL}cvs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMeta(res.data);
    } catch (err) {
      // handle error
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  function handleSelectAll(e: React.ChangeEvent<HTMLInputElement>) {
    setSelected(e.target.checked ? meta.map(row => row.cv_id) : []);
  }

  function handleSelect(cv_id: string) {
    setSelected(prev =>
      prev.includes(cv_id)
        ? prev.filter(id => id !== cv_id)
        : [...prev, cv_id]
    );
  }

  async function handleDeleteSelected() {
    const token = localStorage.getItem('access_token');
    await axios.post(
      `${API_URL}cv/batch-delete`,
      { ids: selected },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setSelected([]);
    fetchData();
  }

  async function handleDeleteOne(cv_id: string) {
    const token = localStorage.getItem('access_token');
    try {
      await axios.delete(`${API_URL}cv/${cv_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelected(selected.filter(id => id !== cv_id));
      fetchData();
    } catch (err) {
      // handle error
    }
  }

  const handleUploadCV = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const files = Array.from(event.target.files);
    const token = localStorage.getItem('access_token');

    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    try {
      await axios.post(`${API_URL}upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData();
    } catch (error) {
      // handle error
    } finally {
      event.target.value = "";
    }
  };

  return {
    meta,
    loading,
    selected,
    handleSelectAll,
    handleSelect,
    handleDeleteSelected,
    handleDeleteOne,
    handleUploadCV,
    fetchData,
  };
}