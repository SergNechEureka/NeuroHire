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

const API_URL = process.env.REACT_APP_API_URL as string;

export function useMetaTableData() {
  const [meta, setMeta] = useState<CVMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  function fetchData() {
    setLoading(true);
    axios.get(`${API_URL}cvs`)
      .then(res => setMeta(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }

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
    await axios.post(`${API_URL}cv/batch-delete`, { ids: selected });
    setSelected([]);
    fetchData();
  }

  async function handleDeleteOne(cv_id: string) {
    await axios.delete(`${API_URL}cv/${cv_id}`);
    setSelected(selected.filter(id => id !== cv_id));
    fetchData();
  }

  const handleUploadCV = async (event: React.ChangeEvent<HTMLInputElement>) => {
  if (!event.target.files) return;
  const files = Array.from(event.target.files);

  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file);
  });

  try {
    await axios.post(`${API_URL}upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    fetchData();
  } catch (error) {
    console.error("Ошибка загрузки CV:", error);
  } finally {
    // Очищаем input чтобы можно было повторно выбрать тот же файл
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
    fetchData
  };
}
