import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RelayControlPanel() {
  const [panels, setPanels] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const navigate = useNavigate();

  const [newPanel, setNewPanel] = useState({
    name: '',
    relayIp: '',
    rpiId: '',
    location: '',
    type: 'RELAY',
    status: 'online',
    voltage: '230V',
    frequency: '50Hz',
    tags: [],
    lastSeen: new Date().toISOString(),
    description: ''
  });

  // Load data on component mount - only once
  useEffect(() => {
    const savedTheme = localStorage.getItem('relay-panel-theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
    }

    try {
      const savedPanels = localStorage.getItem('relay-control-panels');
      if (savedPanels) {
        const parsedPanels = JSON.parse(savedPanels);
        if (Array.isArray(parsedPanels)) {
          setPanels(parsedPanels);
        }
      }
    } catch (e) {
      console.error('Error loading panels from localStorage:', e);
      // Clear corrupted data
      localStorage.removeItem('relay-control-panels');
    }
    
    setIsInitialized(true);
  }, []);

  // Save panels to localStorage whenever they change, but only after initialization
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('relay-control-panels', JSON.stringify(panels));
      } catch (e) {
        console.error('Error saving panels to localStorage:', e);
      }
    }
  }, [panels, isInitialized]);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('relay-panel-theme', newMode ? 'dark' : 'light');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPanel(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagInput = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = e.target.value.trim();
      if (tag && !newPanel.tags.includes(tag)) {
        setNewPanel(prev => ({
          ...prev,
          tags: [...prev.tags, tag]
        }));
        e.target.value = '';
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setNewPanel(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validateForm = () => {
    if (!newPanel.name.trim()) return 'Name is required';
    if (!newPanel.relayIp.trim()) return 'Relay IP is required';
    if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(newPanel.relayIp)) return 'Invalid IP address';
    if (!newPanel.rpiId.trim()) return 'RPi ID is required';
    if (!newPanel.location.trim()) return 'Location is required';
    return null;
  };

  const handleAddPanel = () => {
    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }

    if (editMode) {
      setPanels(prev => prev.map(panel => 
        panel.id === editId ? { ...newPanel, id: editId } : panel
      ));
      setEditMode(false);
      setEditId(null);
    } else {
      const id = `panel-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const panelToAdd = { 
        ...newPanel, 
        id,
        lastSeen: new Date().toISOString() // Ensure fresh timestamp
      };
      setPanels(prev => [...prev, panelToAdd]);
    }

    // Reset form
    setNewPanel({
      name: '',
      relayIp: '',
      rpiId: '',
      location: '',
      type: 'RELAY',
      status: 'online',
      voltage: '230V',
      frequency: '50Hz',
      tags: [],
      lastSeen: new Date().toISOString(),
      description: ''
    });
    setShowAddModal(false);
  };

  const handleEditPanel = (panel) => {
    setNewPanel(panel);
    setEditMode(true);
    setEditId(panel.id);
    setShowAddModal(true);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDeletePanel = () => {
    const updatedPanels = panels.filter(panel => panel.id !== deleteId);
    setPanels(updatedPanels);
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleNavigateToPanel = (panel) => {
    navigate(`/relay-control/${panel.id}`, { 
      state: { 
        relayIp: panel.relayIp,
        rpiId: panel.rpiId,
        panelData: panel
      }
    });
  };

  const handleTestConnection = async (panel) => {
    const updatedPanels = panels.map(p => {
      if (p.id === panel.id) {
        return {
          ...p,
          status: 'testing',
          lastSeen: new Date().toISOString()
        };
      }
      return p;
    });
    setPanels(updatedPanels);

    setTimeout(() => {
      const result = Math.random() > 0.2 ? 'online' : 'offline';
      const finalPanels = updatedPanels.map(p => {
        if (p.id === panel.id) {
          return {
            ...p,
            status: result,
            lastSeen: new Date().toISOString()
          };
        }
        return p;
      });
      setPanels(finalPanels);
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return isDarkMode ? 'bg-emerald-900/30 text-emerald-300 border-emerald-700' : 'bg-emerald-100 text-emerald-700 border-emerald-300';
      case 'offline': return isDarkMode ? 'bg-red-900/30 text-red-300 border-red-700' : 'bg-red-100 text-red-700 border-red-300';
      case 'testing': return isDarkMode ? 'bg-amber-900/30 text-amber-300 border-amber-700' : 'bg-amber-100 text-amber-700 border-amber-300';
      default: return isDarkMode ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const filteredPanels = panels.filter(panel => {
    const matchesSearch = 
      panel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      panel.relayIp.includes(searchTerm) ||
      panel.rpiId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      panel.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || panel.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Theme classes
  const bgClass = isDarkMode ? "bg-slate-950" : "bg-slate-100";
  const textClass = isDarkMode ? "text-slate-200" : "text-slate-900";
  const cardBg = isDarkMode ? "bg-slate-900" : "bg-white";
  const cardBorder = isDarkMode ? "border-slate-800" : "border-slate-300";
  const cardShadow = isDarkMode ? "shadow-lg shadow-black/20" : "shadow-md shadow-slate-300/40";
  const modalBg = isDarkMode ? "bg-slate-900" : "bg-white";
  const modalBorder = isDarkMode ? "border-slate-800" : "border-slate-300";
  const inputBg = isDarkMode ? "bg-slate-900 border-slate-700 focus:border-amber-500 focus:ring-amber-500/20" : "bg-white border-slate-300 focus:border-amber-600 focus:ring-amber-600/20";
  const buttonPrimary = isDarkMode ? "bg-amber-500 hover:bg-amber-400" : "bg-amber-500 hover:bg-amber-400";
  const buttonDanger = "bg-red-600 hover:bg-red-500";
  const buttonSecondary = isDarkMode ? "bg-slate-800 hover:bg-slate-700 border-slate-700" : "bg-slate-200 hover:bg-slate-300 border-slate-300";

  return (
    <div className={`min-h-screen p-2 sm:p-4 md:p-6 ${bgClass} ${textClass} transition-colors duration-300`}>
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Relay Control Panels</h1>
            <p className="text-sm sm:text-base text-slate-400">Manage and monitor industrial relay control systems</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-md border transition-colors ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 border-slate-700' : 'bg-white hover:bg-slate-100 border-slate-300'}`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? '🌙' : '☀️'}
            </button>
            
            <button
              onClick={() => {
                setEditMode(false);
                setNewPanel({
                  name: '',
                  relayIp: '',
                  rpiId: '',
                  location: '',
                  type: 'RELAY',
                  status: 'online',
                  voltage: '230V',
                  frequency: '50Hz',
                  tags: [],
                  lastSeen: new Date().toISOString(),
                  description: ''
                });
                setShowAddModal(true);
              }}
              className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-md ${buttonPrimary} text-slate-950 font-bold uppercase tracking-wide text-sm sm:text-base flex items-center space-x-2 transition-colors`}
            >
              <span>+</span>
              <span>Add Panel</span>
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className={`${cardBg} ${cardBorder} p-3 sm:p-4 rounded-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-slate-400">Total Panels</p>
                <p className="text-lg sm:text-2xl font-bold">{panels.length}</p>
              </div>
            </div>
          </div>
          
          <div className={`${cardBg} ${cardBorder} p-3 sm:p-4 rounded-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-slate-400">Online</p>
                <p className="text-lg sm:text-2xl font-bold text-emerald-500">
                  {panels.filter(p => p.status === 'online').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className={`${cardBg} ${cardBorder} p-3 sm:p-4 rounded-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-slate-400">Offline</p>
                <p className="text-lg sm:text-2xl font-bold text-red-500">
                  {panels.filter(p => p.status === 'offline').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className={`${cardBg} ${cardBorder} p-3 sm:p-4 rounded-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-slate-400">Last Updated</p>
                <p className="text-xs sm:text-sm font-medium">
                  {panels.length > 0 ? new Date(Math.max(...panels.map(p => new Date(p.lastSeen)))).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className={`${cardBg} ${cardBorder} p-3 sm:p-4 rounded-lg mb-6`}>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-slate-400">🔍</span>
                </div>
                <input
                  type="text"
                  placeholder="Search panels..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:outline-none`}
                />
              </div>
            </div>
            
            <div className="flex space-x-2 sm:space-x-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:outline-none`}
              >
                <option value="all">All Status</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="testing">Testing</option>
              </select>
              
              <button
                onClick={() => setSearchTerm('')}
                className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg ${buttonSecondary} border font-medium`}
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Panels Grid */}
        <div className="mb-6">
          {filteredPanels.length === 0 && panels.length > 0 ? (
            <div className={`${cardBg} ${cardBorder} p-8 sm:p-12 rounded-lg text-center`}>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">No Matching Panels Found</h3>
              <p className="text-slate-400 mb-4 sm:mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
                className={`px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg ${buttonSecondary} font-medium flex items-center space-x-2 mx-auto`}
              >
                <span>Clear Filters</span>
              </button>
            </div>
          ) : filteredPanels.length === 0 ? (
            <div className={`${cardBg} ${cardBorder} p-8 sm:p-12 rounded-lg text-center`}>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">No Control Panels Found</h3>
              <p className="text-slate-400 mb-4 sm:mb-6">Add your first relay control panel to get started</p>
              <button
                onClick={() => setShowAddModal(true)}
                className={`px-4 py-2.5 sm:px-6 sm:py-3 rounded-md ${buttonPrimary} text-slate-950 font-bold uppercase tracking-wide flex items-center space-x-2 mx-auto transition-colors`}
              >
                <span>+</span>
                <span>Add First Panel</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredPanels.map((panel) => (
                <div
                  key={panel.id}
                  className={`${cardBg} ${cardBorder} ${cardShadow} rounded-lg overflow-hidden transition-all duration-300`}
                >
                  {/* Panel Header */}
                  <div className="p-4 sm:p-5 border-b border-slate-700/30">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-amber-500/10' : 'bg-amber-100'}`}>
                            <span className="text-amber-500">⚡</span>
                          </div>
                          <h3 className="font-bold text-base sm:text-lg truncate" title={panel.name}>
                            {panel.name}
                          </h3>
                        </div>
                        <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} truncate`}>
                          {panel.description || 'Industrial Relay Control Panel'}
                        </p>
                      </div>
                      
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleEditPanel(panel)}
                          className={`p-1.5 sm:p-2 rounded-lg ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
                          title="Edit"
                        >
                          <span className="text-sm">✏️</span>
                        </button>
                        <button
                          onClick={() => confirmDelete(panel.id)}
                          className={`p-1.5 sm:p-2 rounded-lg ${isDarkMode ? 'hover:bg-red-900/30' : 'hover:bg-red-50'}`}
                          title="Delete"
                        >
                          <span className="text-sm">🗑️</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide border ${getStatusColor(panel.status)}`}>
                        <span>{panel.status === 'online' ? '🟢' : panel.status === 'offline' ? '🔴' : '🟡'}</span>
                        <span>{panel.status.toUpperCase()}</span>
                      </span>
                      <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {new Date(panel.lastSeen).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                  
                  {/* Panel Details */}
                  <div className="p-4 sm:p-5">
                    <div className="space-y-3 sm:space-y-4">
                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <p className="text-xs text-slate-400 mb-1">Relay IP</p>
                          <p className="font-mono text-sm sm:text-base font-medium">{panel.relayIp}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 mb-1">RPi ID</p>
                          <p className="font-mono text-sm sm:text-base font-medium">{panel.rpiId}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Location</p>
                        <p className="font-medium text-sm sm:text-base flex items-center">
                          <span className="mr-2">📍</span>
                          {panel.location}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <p className="text-xs text-slate-400 mb-1">Voltage</p>
                          <p className="font-medium text-sm sm:text-base">{panel.voltage}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 mb-1">Frequency</p>
                          <p className="font-medium text-sm sm:text-base">{panel.frequency}</p>
                        </div>
                      </div>
                      
                      {/* Tags */}
                      {panel.tags.length > 0 && (
                        <div>
                          <p className="text-xs text-slate-400 mb-2">Tags</p>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {panel.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className={`px-2 py-1 text-xs rounded ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'}`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="p-4 sm:p-5 pt-0 border-t border-slate-700/30">
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                      <button
                        onClick={() => handleTestConnection(panel)}
                        disabled={panel.status === 'testing'}
                        className={`py-2.5 px-4 rounded-md ${panel.status === 'testing' ? 'bg-slate-800 cursor-not-allowed' : 'bg-slate-800 hover:bg-slate-700'} text-white font-semibold uppercase tracking-wide text-sm flex items-center justify-center space-x-2 transition-colors`}
                      >
                        {panel.status === 'testing' ? (
                          <>
                            <span className="animate-spin">⟳</span>
                            <span>Testing...</span>
                          </>
                        ) : (
                          <>
                            <span>🔗</span>
                            <span>Test Connection</span>
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={() => handleNavigateToPanel(panel)}
                        className={`py-2.5 px-4 rounded-md ${buttonPrimary} text-slate-950 font-bold uppercase tracking-wide text-sm flex items-center justify-center space-x-2 transition-colors`}
                      >
                        <span>→</span>
                        <span>Control Panel</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add/Edit Panel Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
            <div className={`${modalBg} ${modalBorder} rounded-lg w-full max-w-md shadow-2xl border max-h-[90vh] overflow-y-auto`}>
              <div className="p-4 sm:p-6 border-b border-slate-700/30">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg sm:text-xl font-bold">
                    {editMode ? 'Edit Control Panel' : 'Add New Control Panel'}
                  </h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className={`p-1.5 sm:p-2 rounded-lg ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
                  >
                    <span>✕</span>
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">Configure your relay control panel settings</p>
              </div>
              
              <div className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Panel Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={newPanel.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:outline-none`}
                      placeholder="Main Power Relay"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Relay IP *</label>
                      <input
                        type="text"
                        name="relayIp"
                        value={newPanel.relayIp}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:outline-none`}
                        placeholder="192.168.1.100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">RPi ID *</label>
                      <input
                        type="text"
                        name="rpiId"
                        value={newPanel.rpiId}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:outline-none`}
                        placeholder="RPI-001"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={newPanel.location}
                      onChange={handleInputChange}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:outline-none`}
                      placeholder="Building A, Room 101"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Description</label>
                    <textarea
                      name="description"
                      value={newPanel.description}
                      onChange={handleInputChange}
                      rows="2"
                      className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:outline-none resize-none`}
                      placeholder="Brief description..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Type</label>
                      <select
                        name="type"
                        value={newPanel.type}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:outline-none`}
                      >
                        <option value="RELAY">Relay Control</option>
                        <option value="BTS">BTS System</option>
                        <option value="POWER">Power Management</option>
                        <option value="AUTOMATION">Automation</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Status</label>
                      <select
                        name="status"
                        value={newPanel.status}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:outline-none`}
                      >
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                        <option value="testing">Testing</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Voltage</label>
                      <select
                        name="voltage"
                        value={newPanel.voltage}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:outline-none`}
                      >
                        <option value="110V">110V</option>
                        <option value="230V">230V</option>
                        <option value="400V">400V</option>
                        <option value="480V">480V</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Frequency</label>
                      <select
                        name="frequency"
                        value={newPanel.frequency}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:outline-none`}
                      >
                        <option value="50Hz">50Hz</option>
                        <option value="60Hz">60Hz</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Tags (Press Enter or comma)</label>
                    <input
                      type="text"
                      onKeyDown={handleTagInput}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:outline-none`}
                      placeholder="Add tags"
                    />
                    {newPanel.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
                        {newPanel.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className={`px-2.5 py-1 text-sm rounded-md flex items-center space-x-1 ${isDarkMode ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-100 text-amber-700'}`}
                          >
                            <span>{tag}</span>
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-1 hover:opacity-70"
                            >
                              <span className="text-xs">✕</span>
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-4 sm:p-6 border-t border-slate-700/30">
                <div className="flex justify-end space-x-2 sm:space-x-3">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg ${buttonSecondary} border font-medium`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddPanel}
                    className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-md ${buttonPrimary} text-slate-950 font-bold uppercase tracking-wide transition-colors`}
                  >
                    {editMode ? 'Update' : 'Add Panel'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
            <div className={`${modalBg} ${modalBorder} rounded-lg w-full max-w-md shadow-2xl border`}>
              <div className="p-4 sm:p-6">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-md ${isDarkMode ? 'bg-red-900/30' : 'bg-red-100'} flex items-center justify-center`}>
                  <span className="text-red-500 text-xl sm:text-2xl">⚠️</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-center mb-2">Delete Panel?</h3>
                <p className="text-slate-400 text-center mb-4 sm:mb-6 text-sm sm:text-base">
                  This action cannot be undone.
                </p>
                <div className="flex justify-center space-x-2 sm:space-x-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg ${buttonSecondary} border font-medium`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeletePanel}
                    className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-md ${buttonDanger} text-white font-bold uppercase tracking-wide transition-colors`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}