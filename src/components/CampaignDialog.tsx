import { FaTimes } from 'react-icons/fa';
import ProgressBar from './Progressbar';
import type { Campaign } from '..';
import './CampaignDialog.css';
import { useState } from 'react';
import TabBar from './tabBar/TabBar';

interface CampaignDialogProps {
    campaign: Campaign | null;
    onClose: () => void;
}

const CampaignDialog = ({ campaign, onClose }: CampaignDialogProps) => {
    if (!campaign) return null;

    const [activeTab, setActiveTab] = useState('All');
    const tabs = ['Overview', 'Files', 'Graph'];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <header className="modal-header">
                    <div className='modal-header-left'>
                        <h3>Campaign Details</h3>
                        <span className={`status-pill ${campaign.status.toLowerCase()}`}>
                            {campaign.status}
                        </span>
                    </div>
                    
                    <button className="modal-close" onClick={onClose}>
                        <FaTimes />
                    </button>
                </header>

                <TabBar
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />



                <div className="modal-grid">
                    <div className="info-group">
                        <label>Campaign ID</label>
                        <p>#{campaign.id}</p>
                    </div>
                    <div className="info-group">
                        <label>Start Date</label>
                        <p>{campaign.startDate}</p>
                    </div>
                    <div className="info-group">
                        <label>Budget</label>
                        <p>${campaign.budget.toLocaleString()}</p>
                    </div>
                    <div className="info-group">
                        <label>Job Status</label>
                        <p>{campaign.jobStatus}</p>
                    </div>

                    <div className="info-group full-width">
                        <label>Current Progress</label>
                        <ProgressBar value={campaign.progress} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignDialog;