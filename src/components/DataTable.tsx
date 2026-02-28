import { useState, useMemo } from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import ProgressBar from './Progressbar';
import type { Campaign } from '..'; 
import CampaignDialog from './CampaignDialog';
import './DataTable.css';

interface DataTableProps {
  data: Campaign[];
  itemsPerPage: number;
}

const DataTable = ({ data, itemsPerPage }: DataTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Campaign | ''; direction: 'asc' | 'desc' | null }>({
    key: '',
    direction: null,
  });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig.key && sortConfig.direction) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof Campaign];
        const bValue = b[sortConfig.key as keyof Campaign];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const currentItems = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const requestSort = (key: keyof Campaign) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  // --- Checkbox Logic ---
  const toggleRow = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    const visibleIds = currentItems.map(item => item.id);
    const allVisibleSelected = visibleIds.every(id => selectedIds.includes(id));

    if (allVisibleSelected) {
      setSelectedIds(prev => prev.filter(id => !visibleIds.includes(id)));
    } else {
      setSelectedIds(prev => Array.from(new Set([...prev, ...visibleIds])));
    }
  };

  return (
    <div className="table-wrapper">
      <table className="campaign-table">
        <thead>
          <tr>
            <th className="check-col">
                <input 
                  type="checkbox" 
                  onChange={toggleAll}
                  checked={currentItems.length > 0 && currentItems.every(i => selectedIds.includes(i.id))}
                />
              </th>
            <th onClick={() => requestSort('title')}>
              Title {sortConfig.key === 'title' ? (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort className="sort-off" />}
            </th>
            <th onClick={() => requestSort('status')}>Status</th>
            <th onClick={() => requestSort('budget')}>Budget</th>
            <th onClick={() => requestSort('startDate')}>Date</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id} className={selectedIds.includes(item.id) ? 'row-active' : ''}>
              <td className="check-col">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.includes(item.id)}
                    onChange={() => toggleRow(item.id)}
                  />
                </td>
              <td className="cell-title-link" onClick={() => setSelectedCampaign(item)}>
                {item.title}
              </td>
              <td><span className={`status-pill ${item.status.toLowerCase()}`}>{item.status}</span></td>
              <td>${item.budget.toLocaleString()}</td>
              <td>{item.startDate}</td>
              <td className="cell-progress"><ProgressBar value={item.progress} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Clean Implementation of the Dialog */}
      <CampaignDialog
        campaign={selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
      />

      <div className="pagination-bar">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
        <span>{currentPage} / {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
};

export default DataTable;