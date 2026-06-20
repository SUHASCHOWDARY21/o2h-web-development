import React from 'react';
import { ListTodo, Clock, Play, CheckCircle2 } from 'lucide-react';

const StatsCard = ({ title, count, icon: Icon, colorClass }) => (
  <div className={`card stats-card border-start border-4 border-${colorClass} shadow-sm h-100`}>
    <div className="card-body d-flex justify-content-between align-items-center">
      <div>
        <div className="text-muted-custom small text-uppercase fw-bold tracking-wider mb-1">
          {title}
        </div>
        <h2 className="display-6 fw-bold mb-0 text-color-custom">{count}</h2>
      </div>
      <div className={`stats-icon-bg bg-${colorClass}-subtle text-${colorClass} p-3 rounded-circle`}>
        <Icon size={24} />
      </div>
    </div>
  </div>
);

const StatsSection = ({ stats }) => {
  return (
    <div className="row g-3 mb-4 animate-fade-in">
      <div className="col-6 col-lg-3">
        <StatsCard title="Total Tasks" count={stats.total} icon={ListTodo} colorClass="primary" />
      </div>
      <div className="col-6 col-lg-3">
        <StatsCard title="Pending" count={stats.Pending} icon={Clock} colorClass="warning" />
      </div>
      <div className="col-6 col-lg-3">
        <StatsCard title="In Progress" count={stats['In Progress']} icon={Play} colorClass="info" />
      </div>
      <div className="col-6 col-lg-3">
        <StatsCard title="Completed" count={stats.Completed} icon={CheckCircle2} colorClass="success" />
      </div>
    </div>
  );
};

export default StatsSection;
