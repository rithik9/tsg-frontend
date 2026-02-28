import { useEffect, useState } from 'react'
import DataTable from './DataTable'
import { MOCK_DATA } from '../data'
import SearchBar from './SearchBar'
import { useDebounce } from './CommonFunctions'
import type { Campaign } from '..'

const CampaignDetails = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [isDirty, setIsDirty] = useState(false)
    const [db, setDb] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // 1. Debounce the search term by 500ms
    const debouncedSearch = useDebounce(searchQuery, 500);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            // const data = await fetchCampaigns();
            const data = MOCK_DATA
            setDb(data);
            setLoading(false);
        };
        loadData();
    }, []);

    // 2. Filter logic now reacts to the DEBOUNCED value
    const filteredData = db.filter((c) =>
        c.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    return (
        <div className="page-container">
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem', color: '#646cff' }}>Campaign Details</h1>
                {/* <p style={{ color: '#888' }}>Viewing performance metrics for Q1 2026</p> */}
            </header>

            {loading ? (
                <div className="loading-state">
                    <div className="spinner"></div>
                </div>
            ) : (<>
                <div style={{ padding: '20px', width: '100%' }}>
                    <h1 style={{ marginBottom: '20px' }}>Campaigns</h1>
                    <SearchBar value={searchQuery} onChange={setSearchQuery} />

                    {filteredData.length !== 0 && <DataTable data={filteredData} itemsPerPage={5} />}
                </div>

                {filteredData.length === 0 &&
                    <p className="no-results">No campaigns found matching "{searchQuery}"</p>
                }
            </>

            )}


        </div>
    )
}

export default CampaignDetails;